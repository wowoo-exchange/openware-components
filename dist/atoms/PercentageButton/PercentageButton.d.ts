import * as React from 'react';
interface PercentageButtonProps {
    /**
     * String that will be displayed as the name on the button
     */
    label: string;
    /**
     * Additional class name for styling. By default element receives `cr-percentage-button` class
     * @default empty
     */
    className?: string;
    /**
     * Callback called on button click
     */
    onClick: () => void;
}
declare const PercentageButton: React.FunctionComponent<PercentageButtonProps>;
export { PercentageButton, PercentageButtonProps, };
