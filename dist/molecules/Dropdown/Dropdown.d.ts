import * as React from 'react';
declare type DropdownElem = number | string | React.ReactNode;
interface DropdownProps {
    /**
     * List of options
     */
    list: DropdownElem[];
    /**
     * Selection callback function
     * @default empty
     */
    onSelect?: (index: number) => void;
    /**
     *  By default class name 'cr-dropwdown'
     *  This property gives an additional class name
     *  @default empty
     */
    className?: string;
    /**
     * Value for placeholder of Dropdown components
     * @default empty
     */
    placeholder?: string;
    /**
     * Value for height of Dropdown list elements
     * @default 30px
     */
    elemHeight?: number;
    /**
     * Value for height of Dropdown list
     * @default 90px
     */
    listHeight?: number;
}
interface DropdownState {
    isOpen: boolean;
    selected: string;
    searchValue: string;
    isTimerRunning: boolean;
    topElem: number;
    isFocused: boolean;
}
/**
 *  Cryptobase Dropdown that overrides default dropdown with list of options.
 */
declare class Dropdown extends React.Component<DropdownProps & {}, DropdownState> {
    constructor(props: DropdownProps);
    private myRef;
    render(): JSX.Element;
    /**
     * function that handles input value
     * @param e - KeyDown event
     */
    private handleKeyPress;
    /**
     * function that handles the selection
     * @param index - number of selected element
     */
    private handleSelect;
    private handleFocus;
    private handleBlur;
    /**
     * function that toggles dropdown list
     */
    private handleClick;
    private handleOutsideClick;
    /**
     * function that render one element of dropdown list
     * @param option - element
     * @param index - number of element
     */
    private renderOptions;
    /**
     * function that render all dropdown list
     * @param listIsOpen - true, if dropdown list is open
     * @param list - list of elements
     */
    private renderList;
    /**
     * function that find option in dropdown list
     * @param value - value for search in list
     * @param list - list of elements
     */
    private findOption;
    /**
     * function that convert element of dropdown list to string
     * @param elem - element
     */
    private convertToString;
    /**
     * function that start the timer for search value
     */
    private startTimer;
    /**
     * function that calculate shift for dropdown list
     * @param action - arrowUp or arrowDown keypress
     */
    private calculateListShift;
}
export { Dropdown, DropdownProps, };
