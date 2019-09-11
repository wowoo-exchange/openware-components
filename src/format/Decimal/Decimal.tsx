import * as React from 'react';

interface DecimalProps {
    /**
     * Number of digits after dot
     */
    fixed: number;
    /**
     * Number to format
     */
    children?: string | number;
    /**
     * Number of highlighted digits (without opacity) starting from the end
     * By default only integer part of the number is highlighted
     */
    highlightedNumbersAmount?: number;
}

class Decimal extends React.Component<DecimalProps> {
    public static format(value: DecimalProps['children'], fixed: number) {
        const baseNumber = 10;
        let result = (typeof value === 'undefined') ? '0' :
            (Math.floor(+value * Math.pow(baseNumber, fixed)) / Math.pow(baseNumber, fixed)).toString();
        if (result.indexOf('.') === -1) {
            result += '.';
        }

        while (result.slice(result.indexOf('.')).length <= fixed) {
            result += '0';
        }

        return result;
    }

    public static getNumberBeforeDot(value: DecimalProps['children'], fixed: number) {
        const num = Decimal.format(value, fixed);

        return Math.floor(+num);
    }

    public static getNumberAfterDot(value: DecimalProps['children'], fixed: number) {
        if (fixed === 0) {
            return;
        }

        const str = Decimal.format(value, fixed);

        return str.slice(str.indexOf('.'));
    }

    public render() {
        const { children, fixed } = this.props;
        if (this.props.highlightedNumbersAmount) {
            return (this.highlightNumbers(Decimal.format(children, fixed), this.props.highlightedNumbersAmount));
        } else {
            return (
                <React.Fragment>
                    <span>{Decimal.getNumberBeforeDot(children, fixed)}</span>
                    <span className="cr-decimal__opacity">{Decimal.getNumberAfterDot(children, fixed)}</span>
                </React.Fragment>
            );
        }
    }

    private highlightNumbers = (value: string, amount: number) => {
        let highlighted = '';
        let i = value.length - 1;
        let highlightedAmount = value.length - amount;

        for (i; i >= highlightedAmount; i--) {
            if (value[i] === '.') {
                highlighted = `.${highlighted}`;
                i--;
                highlightedAmount--;
            }

            highlighted = value[i] + highlighted;
        }

        return (
            <React.Fragment>
                <span className="cr-decimal__opacity">{value.slice(0, value.length - highlighted.length)}</span>
                <span>{highlighted}</span>
            </React.Fragment>
        );
    };
}

export {
    Decimal,
    DecimalProps,
};
