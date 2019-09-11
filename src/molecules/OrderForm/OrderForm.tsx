import classnames from 'classnames';
import * as React from 'react';
import { Dropdown, OrderInput } from '../';
import { Button, CryptoIcon, PercentageButton } from '../../atoms';
import { Decimal } from '../../format';
import { FormType, OnSubmitCallback } from '../Order/Order';

// tslint:disable:no-magic-numbers jsx-no-lambda

type DropdownElem = number | string | React.ReactNode;

interface OrderFormProps {
    /**
     * Fee that is applied during total order amount calculation
     */
    fee: number;
    /**
     * Price that is applied during total order amount calculation when type is Market
     */
    priceMarket: number;
    /**
     * Price that is applied during total order amount calculation when type is Market
     */
    priceLimit?: number;
    /**
     * Type of form, can be 'buy' or 'cell'
     */
    type: FormType;
    /**
     * Available types of order
     */
    orderTypes: DropdownElem[];
    /**
     * Additional class name. By default element receives `cr-order` class
     * @default empty
     */
    className?: string;
    /**
     * Name of currency for price field
     */
    from: string;
    /**
     * Name of currency for amount field
     */
    to: string;
    /**
     * Amount of money in a wallet
     */
    available?: number;
    /**
     * Precision of amount, total, available, fee value
     */
    currentMarketAskPrecision: number;
    /**
     * Precision of price value
     */
    currentMarketBidPrecision: number;
    /**
     * Whether order is disabled to execute
     */
    disabled?: boolean;
    /**
     * Callback that is called when form is submitted
     */
    onSubmit: OnSubmitCallback;
    /**
     * @default 'Order Type'
     * Text for order type dropdown label.
     */
    orderTypeText?: string;
    /**
     * @default 'Price'
     * Text for Price field Text.
     */
    priceText?: string;
    /**
     * @default 'Amount'
     * Text for Amount field Text.
     */
    amountText?: string;
    /**
     * @default 'Total'
     * Text for Total field Text.
     */
    totalText?: string;
    /**
     * @default 'Available'
     * Text for Available field Text.
     */
    availableText?: string;
    /**
     * @default 'Estimated fee'
     * Text for Estimated fee field Text.
     */
    estimatedFeeText?: string;
    /**
     * @default type.toUpperCase()
     * Text for submit Button.
     */
    submitButtonText?: string;
}

interface OrderFormState {
    orderType: string | React.ReactNode;
    amount: string;
    price: string;
    priceMarket: number;
    currentMarketAskPrecision: number;
    currentMarketBidPrecision: number;
    amountFocused: boolean;
    priceFocused: boolean;
}

const handleSetValue = (value: string | number | undefined, defaultValue: string) => (
    value || defaultValue
);

const cleanPositiveFloatInput = (text: string) => {
    let cleanInput = text
        .replace(',', '.')
        .replace(/-+/, '')
        .replace(/^0+/, '0')
        .replace(/\.+/, '.')
        .replace(/^0+([1-9])/, '$1');

    if (cleanInput[0] === '.') {
        cleanInput = `0${cleanInput}`;
    }
    return cleanInput;
};

const checkButtonIsDisabled = (safeAmount: number, safePrice: number, props: OrderFormProps, state: OrderFormState) => {
    const invalidAmount = safeAmount <= 0;
    const invalidLimitPrice = safePrice <= 0 && state.orderType === 'Limit';
    const invalidMarketPrice = props.priceMarket <= 0 && state.orderType === 'Market';
    return props.disabled || !props.available || invalidAmount || invalidLimitPrice || invalidMarketPrice;
};

class OrderForm extends React.Component<OrderFormProps, OrderFormState> {
    constructor(props: OrderFormProps) {
        super(props);
        this.state = {
            orderType: 'Limit',
            amount: '',
            price: '',
            priceMarket: this.props.priceMarket,
            currentMarketAskPrecision: this.props.currentMarketAskPrecision || 6,
            currentMarketBidPrecision: this.props.currentMarketBidPrecision || 6,
            priceFocused: false,
            amountFocused: false,
        };
    }

    public componentWillReceiveProps(next: OrderFormProps) {
        const nextPriceLimitTruncated = Decimal.format(next.priceLimit, this.state.currentMarketBidPrecision);
        if (this.state.orderType === 'Limit' && next.priceLimit && nextPriceLimitTruncated !== this.state.price) {
            this.setState({
                price: nextPriceLimitTruncated,
            });
        }

        if (this.state.orderType === 'Market' && next.priceMarket && next.priceMarket !== this.state.priceMarket) {
            this.setState({
                priceMarket: +Decimal.format(next.priceMarket, this.state.currentMarketBidPrecision),
            });
        }

        if (next.currentMarketAskPrecision && next.currentMarketAskPrecision !== this.state.currentMarketAskPrecision) {
            this.setState({
                currentMarketAskPrecision: next.currentMarketAskPrecision,
            });
        }

        if (next.currentMarketBidPrecision && next.currentMarketBidPrecision !== this.state.currentMarketBidPrecision) {
            this.setState({
                currentMarketBidPrecision: next.currentMarketBidPrecision,
            });
        }
    }

    public render() {
        const {
            type,
            fee,
            orderTypes,
            className,
            from,
            to,
            available,
            orderTypeText,
            priceText,
            amountText,
            totalText,
            availableText,
            estimatedFeeText,
            submitButtonText,
        } = this.props;
        const {
            orderType,
            amount,
            price,
            priceMarket,
            currentMarketAskPrecision,
            currentMarketBidPrecision,
            priceFocused,
            amountFocused,
        } = this.state;
        const safeAmount = Number(amount) || 0;
        const safePrice = Number(price) || 0;
        const total = orderType === 'Market'
            ? safeAmount * priceMarket : safeAmount * safePrice;
        const amountPercentageArray = [0.25, 0.5, 0.75, 1];

        const cx = classnames('cr-order-form', className);
        const currencyCodeFrom = `${from.toUpperCase()}-alt`;
        const availableCurrency = type === 'buy' ? from : to;

        return (
            <div className={cx}>
                <div className="cr-order-item">
                    {orderTypeText ? (
                        <div className="cr-order-item__dropdown__label">
                            {orderTypeText}
                        </div>
                    ) : null}
                    <Dropdown
                        list={orderTypes}
                        onSelect={this.handleOrderTypeChange}
                    />
                </div>
                {orderType === 'Limit' ? (
                    <div className="cr-order-item">
                        <OrderInput
                            currency={from}
                            label={priceText}
                            placeholder={priceText}
                            value={handleSetValue(price,'')}
                            isFocused={priceFocused}
                            handleChangeValue={this.handlePriceChange}
                            handleFocusInput={() => this.handleFieldFocus(priceText)}
                        />
                    </div>
                ) : (
                    <div className="cr-order-item">
                        <div className="cr-order-input">
                            <fieldset className="cr-order-input__fieldset">
                                <legend className={'cr-order-input__fieldset__label'}>
                                    {handleSetValue(priceText, '')}
                                </legend>
                                <div className="cr-order-input__fieldset__input">
                                    <span className="cr-order-input__fieldset__input__price">{handleSetValue(Decimal.format(priceMarket, currentMarketBidPrecision), '0')}</span>
                                </div>
                            </fieldset>
                            <div className="cr-order-input__crypto-icon">
                                <CryptoIcon code={currencyCodeFrom}>{from.toUpperCase()}</CryptoIcon>
                            </div>
                        </div>
                    </div>
                )}
                <div className="cr-order-item">
                    <OrderInput
                        currency={to}
                        label={amountText}
                        placeholder={amountText}
                        value={handleSetValue(amount, '')}
                        isFocused={amountFocused}
                        handleChangeValue={this.handleAmountChange}
                        handleFocusInput={() => this.handleFieldFocus(amountText)}
                    />
                </div>

                <div className="cr-order-item">
                    <div className="cr-order-item__percentage-buttons">
                        <PercentageButton
                            label={`${amountPercentageArray[0] * 100}%`}
                            onClick={() => this.handleChangeAmountByButton(amountPercentageArray[0], type)}
                        />
                        <PercentageButton
                            label={`${amountPercentageArray[1] * 100}%`}
                            onClick={() => this.handleChangeAmountByButton(amountPercentageArray[1], type)}
                        />
                        <PercentageButton
                            label={`${amountPercentageArray[2] * 100}%`}
                            onClick={() => this.handleChangeAmountByButton(amountPercentageArray[2], type)}
                        />
                        <PercentageButton
                            label={`${amountPercentageArray[3] * 100}%`}
                            onClick={() => this.handleChangeAmountByButton(amountPercentageArray[3], type)}
                        />
                    </div>
                </div>

                <div className="cr-order-item">
                    <div className="cr-order-item__total">
                        <label className="cr-order-item__total__label">
                            {handleSetValue(totalText, 'Total')}
                        </label>
                        <div className="cr-order-item__total__content">
                            <span className="cr-order-item__total__content__amount">
                                {Decimal.format(total, currentMarketAskPrecision)}
                            </span>
                            <span className="cr-order-item__total__content__currency">
                                {from.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cr-order-item">
                    <div className="cr-order-item__available">
                        <label className="cr-order-item__available__label">
                            {handleSetValue(availableText, 'Available')}
                        </label>
                        <div className="cr-order-item__available__content">
                            <span className="cr-order-item__available__content__amount">
                                {available ? Decimal.format(available, currentMarketAskPrecision) : ''}
                            </span>
                            <span className="cr-order-item__available__content__currency">
                                {available ? availableCurrency.toUpperCase() : ''}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cr-order-item">
                    <div className="cr-order-item__fee">
                        <label className="cr-order-item__fee__label">
                            {handleSetValue(estimatedFeeText, 'Estimated fee')}
                        </label>
                        <div className="cr-order-item__fee__content">
                            <span className="cr-order-item__fee__content__amount">
                                {fee ? (
                                    type === 'buy' ? (
                                        Decimal.format(fee * +amount, currentMarketAskPrecision)
                                    ) : (
                                        Decimal.format(fee * total, currentMarketAskPrecision)
                                    )
                                ) : ''}
                            </span>
                            <span className="cr-order-item__fee__content__currency">
                                {fee ? (type === 'buy' ? to.toUpperCase() : from.toUpperCase()) : ''}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cr-order-item">
                    <Button
                        disabled={checkButtonIsDisabled(safeAmount, safePrice, this.props, this.state)}
                        label={submitButtonText || type}
                        noMargin={true}
                        onClick={this.handleSubmit}
                    />
                </div>
            </div>
        );
    }

    private handleOrderTypeChange = (index: number) => {
        const { orderTypes } = this.props;
        this.setState({
            orderType: orderTypes[index],
        });
    };

    private handleFieldFocus = (field: string | undefined) => {
        switch (field) {
            case this.props.priceText:
                this.setState(prev => ({
                    priceFocused: !prev.priceFocused,
                }));
                break;
            case this.props.amountText:
                this.setState(prev => ({
                    amountFocused: !prev.amountFocused,
                }));
                break;
            default:
                break;
        }
    }

    private handlePriceChange = (value: string) => {
        const convertedValue = cleanPositiveFloatInput(String(value));
        const condition = new RegExp(`^(?:[\\d-]*\\.?[\\d-]{0,${this.state.currentMarketBidPrecision}}|[\\d-]*\\.[\\d-])$`);
        if (convertedValue.match(condition)) {
            this.setState({
                price: convertedValue,
            });
        }
    };

    private handleAmountChange = (value: string) => {
        const convertedValue = cleanPositiveFloatInput(String(value));
        const condition = new RegExp(`^(?:[\\d-]*\\.?[\\d-]{0,${this.state.currentMarketAskPrecision}}|[\\d-]*\\.[\\d-])$`);
        if (convertedValue.match(condition)) {
            this.setState({
                amount: convertedValue,
            });
        }
    };

    private handleChangeAmountByButton = (value: number, type: string) => {
        switch (type) {
            case 'buy':
                switch (this.state.orderType) {
                    case 'Limit':
                        this.setState({
                            amount: this.props.available && +this.state.price ? (
                                Decimal.format(this.props.available / +this.state.price * value, this.state.currentMarketAskPrecision)
                            ) : '',
                        });
                        break;
                    case 'Market':
                        this.setState({
                            amount: this.props.available && this.state.priceMarket ? (
                                Decimal.format(this.props.available / this.state.priceMarket * value, this.state.currentMarketAskPrecision)
                            ) : '',
                        });
                        break;
                    default:
                        break;
                }
                break;
            case 'sell':
                this.setState({
                    amount: this.props.available ? (
                        Decimal.format(this.props.available * value, this.state.currentMarketAskPrecision)
                    ) : '',
                });
                break;
            default:
                break;
        }
    };

    private handleSubmit = () => {
        const { type } = this.props;
        const { amount, price, priceMarket, orderType } = this.state;

        const order = {
            type,
            orderType,
            amount,
            price: orderType === 'Market' ? priceMarket : price,
        };

        this.props.onSubmit(order);
        this.setState({
            amount: '',
            price: '',
        });
    };
}


export {
    OrderForm,
    OrderFormProps,
    OrderFormState,
};
