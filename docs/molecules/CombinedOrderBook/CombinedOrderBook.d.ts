import * as React from 'react';
import { CellData } from '../Table/Table';
interface CombinedOrderBookProps {
    /**
     * Data which is used to render Asks Table.
     */
    dataAsks: CellData[][];
    /**
     * Data which is used to render Bids Table.
     */
    dataBids: CellData[][];
    /**
     * Max value of volume which is used to calculate width of background row
     */
    maxVolume?: number;
    /**
     * Data which is used to calculate width of each Asks background row
     */
    orderBookEntryAsks: number[];
    /**
     * Data which is used to calculate width of each Bids background row
     */
    orderBookEntryBids: number[];
    /**
     * Renders table header
     */
    headers: string[];
    /**
     * Sets Asks row background color
     */
    rowBackgroundColorAsks?: string;
    /**
     * Sets Bids row background color
     */
    rowBackgroundColorBids?: string;
    /**
     * Callback that is called when a Asks market is selected
     */
    onSelectAsks: (orderIndex: string) => void;
    /**
     * Callback that is called when Bids a market is selected
     */
    onSelectBids: (orderIndex: string) => void;
    /**
     * Sets component breakpoint
     */
    isLarge: boolean;
    /**
     * Sets last price
     */
    lastPrice: React.ReactNode;
}
declare class CombinedOrderBook extends React.PureComponent<CombinedOrderBookProps> {
    componentDidMount(): void;
    componentWillReceiveProps(next: CombinedOrderBookProps): void;
    render(): JSX.Element;
    private orderBookLarge;
    private orderBookSmall;
}
export { CombinedOrderBook, CombinedOrderBookProps, };
