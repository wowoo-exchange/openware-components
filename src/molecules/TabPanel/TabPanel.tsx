import classnames from 'classnames';
import * as React from 'react';

enum HideMode {
    hide = 'hide',
    unmount = 'unmount',
}

type OnTabChangeCallback = (index: number, label?: string) => void;

interface Tab {
    content: React.ReactNode;
    disabled?: boolean;
    hidden?: boolean;
    label: string;
}

interface TabPanelProps {
    /**
     * List of tabs to be rendered
     */
    panels: Tab[];
    /**
     * Determines whether tabs should be full container width
     * @default false
     */
    fixed?: boolean;
    /**
     * Tab change mode:
     * `hide` mode will mount but hide inactive tabs changing `display` css
     * property of tab content to `none`.
     * `unmount` mode will not mount the tab content of inactive tabs.
     * @default hide
     */
    hideMode?: HideMode;
    /**
     * Callback which is called when currently active tab is changed
     */
    onTabChange?: OnTabChangeCallback;
    /**
     * Index of tab to switch on
     */
    tabIndex?: number;
    /**
     * Optinal JSX element to head
     */
    optionalHead?: React.ReactNode;
}

interface TabPanelState {
    currentTabIndex: number;
}

/**
 * Component for switching between different tabs on one page.
 */
class TabPanel extends React.Component<TabPanelProps, TabPanelState> {
    public static defaultProps = {
        hideMode: HideMode.hide,
    };

    public state = {
        currentTabIndex: 0,
    };

    public render() {
        const { fixed, hideMode, panels, optionalHead } = this.props;
        const className: string = classnames('cr-tab-panel', {
            'cr-tab-panel__fixed': fixed,
        });

        const contents = hideMode === HideMode.hide
            ? panels.map(this.renderTabContent)
            : panels
                .filter((panel, index) => index === this.state.currentTabIndex)
                .map(this.renderTabContent);

        const navCx = 'cr-tab-panel__navigation-container-navigation';
        return (
            <div className={className}>
                <div className="cr-tab-panel__navigation-container draggable-container">
                    <div className={navCx} role="tablist">
                        {panels.map(this.renderTabPanel)}
                    </div>
                    { optionalHead &&
                      <div className="cr-tab-panel__optinal-head">{optionalHead}</div>
                    }
                </div>
                {contents}
            </div>
        );
    }

    private renderTabPanel = (tab: Tab, index: number) => {
        const { disabled, hidden, label } = tab;
        const { tabIndex } = this.props;
        const currentTabIndex = tabIndex ? tabIndex : this.state.currentTabIndex;

        const active = currentTabIndex === index;
        const className = classnames('cr-tab', {
            'cr-tab__active': active,
            'cr-tab__disabled': disabled,
            'cr-tab__hidden': hidden,
        });

        return (
            <div
                className={className}
                key={index}
                onClick={this.createOnTabChangeHandler(index, tab)}
                role="tab"
                tabIndex={index}
            >
                {label}
                {active && <span className="cr-tab__pointer" />}
            </div>
        );
    };

    private renderTabContent = (tab: Tab, index: number) => {
        const { hideMode, tabIndex } = this.props;
        const currentTabIndex = tabIndex ? tabIndex : this.state.currentTabIndex;

        const className: string = classnames('cr-tab-content',
            {
                'cr-tab-content__active':
                    hideMode === HideMode.hide ?
                        currentTabIndex === index : false,
            },
        );

        return (
            <div className={className} key={`${tab.label}-${index}`}>
                {tab.content}
            </div>
        );
    };

    private createOnTabChangeHandler = (index: number, tab: Tab) => () => {
        if (!tab.disabled) {
            this.setState({
                currentTabIndex: index,
            }, () => {
                if (this.props.onTabChange) {
                    this.props.onTabChange(index, tab.label);
                }
            });
        }
    };
}

export {
    HideMode,
    OnTabChangeCallback,
    Tab,
    TabPanel,
    TabPanelProps,
    TabPanelState,
};
