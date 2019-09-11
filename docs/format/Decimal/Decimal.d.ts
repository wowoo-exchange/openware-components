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
declare class Decimal extends React.Component<DecimalProps> {
    static format(value: DecimalProps['children'], fixed: number): string;
    static getNumberBeforeDot(value: DecimalProps['children'], fixed: number): number;
    static getNumberAfterDot(value: DecimalProps['children'], fixed: number): string | undefined;
    render(): JSX.Element;
    private highlightNumbers;
}
export { Decimal, DecimalProps, };
