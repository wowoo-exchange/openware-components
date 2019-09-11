import * as React from 'react';
interface KeyValuePairMarketDepths {
    x: string | number;
    amt?: number;
    ask?: number;
    bid?: number;
    name?: string | number;
}
interface ChartStyles {
    fillAreaAsk: string;
    fillAreaBid: string;
    gridBackgroundStart: string;
    gridBackgroundEnd: string;
    strokeAreaAsk: string;
    strokeAreaBid: string;
    strokeGrid: string;
    strokeAxis: string;
}
interface TooltipColors {
    backgroundColor: string;
    color: string;
    border: string;
}
interface CustomActiveDotProps {
    stroke: string;
    strokeWidth: number;
    r: number;
    fill: string;
}
interface MarketDepthsProps {
    /**
     * Additional class name for styling. By default element receives `cr-market-depths`
     * class
     * @default empty
     */
    className?: string;
    /**
     * MarketDepths colors for chart
     */
    colors: ChartStyles;
    /**
     * MarketDepths details data for building the plot
     */
    data: KeyValuePairMarketDepths[];
    /**
     * Defines colors of tooltip
     */
    toolTipColors?: TooltipColors;
    /**
     * Settings to be applied to a chart
     */
    settings?: MarketDepthsSettings;
    /**
     * If true, grid will be hidden
     * @default false
     */
    hideCartesianGrid?: boolean;
    /**
     * Orientation for y-axis
     * @default 'left'
     */
    orientation?: 'left' | 'right';
    /**
     * Chart type
     * @default 'step'
     */
    chartType?: 'basis' | 'basisClosed' | 'basisOpen' | 'linear' | 'linearClosed' | 'natural' | 'monotoneX' | 'monotoneY' | 'monotone' | 'step' | 'stepBefore' | 'stepAfter';
    /**
     * Property for gradient of background of ask or bid
     * @default false
     */
    gradientHide?: boolean;
}
interface MarketDepthsSettings {
    /**
     * Defines what value should be displayed on x-axis
     */
    dataKeyX?: string;
    /**
     * Defines what value should be displayed on y-axis
     */
    dataKeyY?: string;
    /**
     * Defines whether tooltip is shown or nor
     * @default true
     */
    tooltip?: boolean;
    /**
     * Defines height of chart
     * @default 400
     */
    height?: number;
    /**
     * Defines properties for active dot
     */
    activeDot?: CustomActiveDotProps;
}
/**
 * Component to display MarketDepths component.
 * It gives a visualization of demand or supply of a particular stock or commodity or a cryptocurrency.
 */
declare class MarketDepths extends React.PureComponent<MarketDepthsProps> {
    defaultSettings: {
        dataKeyX: string;
        dataKeyY: string;
        tooltip: boolean;
        height: number;
        activeDot: {
            stroke: string;
            strokeWidth: number;
            r: number;
            fill: string;
        };
    };
    render(): JSX.Element;
    defineGradient: (value?: boolean | undefined) => JSX.Element;
}
export { MarketDepths, MarketDepthsProps, KeyValuePairMarketDepths, ChartStyles, TooltipColors, MarketDepthsSettings, };
