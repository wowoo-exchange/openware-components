import { shallow } from 'enzyme';
import * as React from 'react';
import { Decimal, DecimalProps } from './Decimal';

const defaultProps: DecimalProps = {
    fixed: 8,
};

// tslint:disable no-magic-numbers
const setup = (props: Partial<DecimalProps> = {}) =>
    shallow(<Decimal {...{ ...defaultProps, ...props }}>123.32030200230000</Decimal>);

describe('Decimal', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });

    it('should have className for number after dot', () => {
        const wrapper = setup();
        expect(wrapper.find('span').last().hasClass('cr-decimal__opacity')).toBeTruthy();
    });

    it('should handle string child', () => {
        const wrapper = setup({ children: '123.3203020023' });
        expect(wrapper).toMatchSnapshot();
    });

    it('should handle number child', () => {
        const wrapper = setup({ children: 123.3203020023 });
        expect(wrapper).toMatchSnapshot();
    });

    it('should handle undefined value', () => {
        const wrapper = shallow(<Decimal fixed={8}>{undefined}</Decimal>);
        expect(wrapper.find('span').first().props().children).toEqual(0);
        expect(Decimal.format(undefined, 3)).toEqual('0.000');
    });

    it('should handle format with function Decimal.format', () => {
        const formatWithFunc = Decimal.format(123.3203020023, 3);
        expect(formatWithFunc).toEqual('123.320');
    });

    it('should handle format with function Decimal.getNumberBeforeDot', () => {
        const formatWithFunc = Decimal.getNumberBeforeDot(123.3203020023, 3);
        expect(formatWithFunc).toEqual(123);
    });

    it('should handle format with function Decimal.getNumberAfterDot', () => {
        const formatWithFunc = Decimal.getNumberAfterDot(123.3203020023, 3);
        expect(formatWithFunc).toEqual('.320');
    });

    it('should handle zero fixed value', () => {
        const wrapper = setup({ fixed: 0 });
        expect(wrapper.find('span').first().props().children).toEqual(123);
    });

    it('should handle highlightedNumbersAmount prop', () => {
        const wrapper = setup({ fixed: 2, highlightedNumbersAmount: 3 });
        expect(wrapper.find('span').first().hasClass('cr-decimal__opacity')).toBeTruthy();
        expect(wrapper.find('span').first().props().children).toEqual('12');
        expect(wrapper.find('span').last().props().children).toEqual('3.32');
    });
});
