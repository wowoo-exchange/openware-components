import * as React from 'react';
interface InputProps {
    /**
     * Function for monitoring changes of input value
     * @default ''
     */
    onChangeValue: (text: string) => void;
    /**
     * Function for handling input focus
     */
    onFocus?: () => void;
    /**
     * Function for handling input blur
     */
    onBlur?: () => void;
    /**
     * The text string to use for the type of the input component.
     */
    value: string | number;
    /**
     * Additional class name for styling. By default element receives `cr-input` class
     * @default empty
     */
    className?: string;
    /**
     * The string to use for as a placeholder for the input
     * @default empty
     */
    placeholder?: string;
    /**
     * Sets type of the input
     * @default 'text'
     */
    type?: string;
    /**
     * Input field name
     */
    name?: string;
    /**
     * Set autofocus on field
     */
    autoFocus?: boolean;
    /**
     * Function for handling 'Enter' key
     */
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
/**
 * Cryptobase Input that overrides default input
 */
declare class Input extends React.PureComponent<InputProps> {
    private inputElem;
    render(): JSX.Element;
    private handleChange;
}
export { Input, InputProps, };
