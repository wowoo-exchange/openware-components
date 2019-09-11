import * as React from 'react';
import { ErrorIcon } from './ErrorIcon';
import { SuccessIcon } from './SuccessIcon';
interface AlertIconProps {
    /**
     * Type of icon
     */
    type: 'success' | 'error';
}
declare const AlertIcon: React.FunctionComponent<AlertIconProps>;
export { AlertIcon, AlertIconProps, ErrorIcon, SuccessIcon, };
