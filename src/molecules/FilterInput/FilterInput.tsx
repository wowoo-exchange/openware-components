import classnames from 'classnames';
import * as React from 'react';
import { OnChangeEvent } from '../../types/index';
import SearchIcon = require('./Search.svg');

interface FilterInputProps {
    /**
     * Data on which the search will be performed
     */
    data: object[];
    /**
     * filter function prop is used to filter data
     */
    // tslint:disable-next-line
    filter: (item: any, term: string) => boolean;
    /**
     * onFilter prop is called whenever input value changes
     */
    onFilter: (items: object[]) => void;
    /**
     * Additional class name for styling (by default `cr-search`)
     */
    className?: string;
    /**
     * Value for placeholder of FilterInput components
     */
    placeholder?: string;
}

export interface SearchInputState {
    key: string;
}

/**
 * Component for performing search  and filtering objects of the specific dataset.
 */
class FilterInput extends React.Component<FilterInputProps, SearchInputState> {
    constructor(props: FilterInputProps) {
        super(props);
        this.state = {
            key: '',
        };
        this.filterList = this.filterList.bind(this);
    }

    public filterList(event: OnChangeEvent) {
        const value = event.target.value;
        const { data, filter } = this.props;

        const result = data
            .filter(item => filter(item, value));

        this.props.onFilter(result);
        this.setState({ key: value });
    }

    public render() {
        const { key } = this.state;
        const { className, placeholder } = this.props;
        const cx = classnames('cr-search__input', className);
        return (
            <div className="cr-search">
                <span className="cr-search__icon">
                    <img src={SearchIcon} />
                </span>
                <input
                    type={'text'}
                    className={cx}
                    value={key}
                    placeholder={placeholder ? placeholder : 'Search'}
                    onChange={this.filterList}
                />
            </div>
        );
    }
}

export {
    FilterInput,
    FilterInputProps,
};
