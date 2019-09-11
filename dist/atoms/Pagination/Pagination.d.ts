import * as React from 'react';
interface PaginationProps {
    /**
     * Number shows first element index in pagination
     */
    firstElemIndex: number;
    /**
     * Number shows last element index in pagination
     */
    lastElemIndex: number;
    /**
     * Number shows total amount of elements
     */
    total: number;
    /**
     * Previous page click handler
     */
    onClickPrevPage: () => void;
    /**
     * Next page click handler
     */
    onClickNextPage: () => void;
    /**
     * Number shows current page index
     */
    page: number;
    /**
     * Value for defining if next page exist or not
     */
    nextPageExists: boolean;
}
/**
 * Pagination component helper for tables
 */
declare class Pagination extends React.Component<PaginationProps> {
    render(): JSX.Element;
    private onClickPrevPage;
    private onClickNextPage;
}
export { Pagination, PaginationProps, };
