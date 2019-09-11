import * as React from 'react';
interface QRCodeProps {
    /**
     * Data which is used to generate QR code(e.g. wallet address).
     * @default Required
     */
    data: string;
    /**
     * Defines the size of QR code component.
     * @default 118x118
     */
    dimensions?: number;
}
/**
 * Component for displaying QR code.
 */
declare const QRCode: React.FunctionComponent<QRCodeProps>;
export { QRCode, QRCodeProps, };
