import * as React from 'react';
import { CellData } from '../Table/Table';
interface MarketsProps {
    /**
     * List of markets data
     */
    data: CellData[][];
    /**
     * Row's unique key, could be a number - element's index in data
     */
    rowKeyIndex?: number;
    /**
     * Key of selected row, could be a string
     */
    selectedKey?: string;
    /**
     * Callback that is called when a market is selected
     */
    onSelect: (marketKey: string) => void;
    /**
     * Defines whether to show filters or not
     * @default true
     */
    filters?: boolean;
    /**
     * List of headers for table
     */
    headers?: string[];
    /**
     * Title of widget
     */
    title?: string;
    /**
     * Value for FilterInput placeholder
     */
    filterPlaceholder?: string;
}
interface MarketsState {
    /**
     * Keeps filtered data
     */
    filteredData: CellData[][];
    /**
     * Keeps search key
     */
    searchKey: string;
}
declare class Markets extends React.Component<MarketsProps, MarketsState> {
    constructor(props: MarketsProps);
    private defaultHeaders;
    componentWillReceiveProps(nextProps: MarketsProps): void;
    render(): JSX.Element;
    searchFilter: (row: React.ReactNode[], searchKey: string) => boolean;
    handleFilter: (result: object[]) => void;
    private renderChange;
    private mapRows;
    private filterType;
    private readonly filters;
    private getMarketFromDataRow;
    private createUniqueCurrencies;
    private transformCurrencyToFilter;
}
export { Markets, MarketsProps, MarketsState, };
