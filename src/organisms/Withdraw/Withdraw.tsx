import classnames from 'classnames';
import * as React from 'react';
import { Button, Input, SummaryField } from '../../atoms';
import { Decimal } from '../../format';

interface WithdrawProps {
    /**
     * Value for setting correct symbol for summary field component. Could be 'rectangle', 'circle' or 'empty-circle'
     */
    borderItem?: string;
    /**
     * Value for setting current currency for withdraw
     */
    currency: string;
    /**
     * Fee for defined currency
     * @default 0
     */
    fee: number;
    /**
     * Function for withdraw event
     */
    onClick: (amount: number, rid: string, otpCode: string) => void;
    /**
     * The precision for numbers
     */
    fixed: number;
    /**
     * Additional class name. By default element receives `cr-withdraw` class
     * @default empty
     */
    className?: string;
    /**
     * Renders Google Authenticator code input
     */
    twoFactorAuthRequired?: boolean;
}

interface WithdrawState {
    /**
     * Value for current address for withdraw
     * @default ''
     */
    address: string;
    /**
     * Value for current amount for withdraw
     * @default 0
     */
    amount: number | string;
    /**
     * Google Authenticator 6-digit code
     */
    otpCode: string;
    /**
     * Total value for withdraw
     */
    total: number;
}

/**
 * Component with for for withdraw.
 */
class Withdraw extends React.Component<WithdrawProps, WithdrawState> {
    public state = {
        address: '',
        amount: '',
        otpCode: '',
        total: 0,
    };

    public render() {
        const {
            address,
            amount,
            total,
        } = this.state;
        const {
            borderItem,
            className,
            currency,
            twoFactorAuthRequired,
        } = this.props;
        const cx = classnames('cr-withdraw', className);
        const lastDividerClassName = classnames('cr-withdraw__divider', {
            'cr-withdraw__divider-one': twoFactorAuthRequired,
            'cr-withdraw__divider-two': !twoFactorAuthRequired,
        });

        const formattedCurrency = currency.toUpperCase();
        return (
            <div className={cx}>
                <div className="cr-withdraw-column">
                    <form>
                        <fieldset className="cr-withdraw__input">
                            <legend>
                                {formattedCurrency} "Withdrawal Address"
                            </legend>
                            <Input
                                className="cr-input-block__input"
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChangeValue={this.handleChangeInputAddress}
                            />
                        </fieldset>
                    </form>
                    <div className="cr-withdraw__divider cr-withdraw__divider-one" />
                    <form>
                        <fieldset className="cr-withdraw__input">
                            <legend>
                                Withdrawal Amount
                            </legend>
                            <Input
                                className="cr-input-block__input"
                                type="number"
                                placeholder="0"
                                value={amount}
                                onChangeValue={this.handleChangeInputAmount}
                            />
                        </fieldset>
                    </form>
                    <div className={lastDividerClassName} />
                    {twoFactorAuthRequired && this.renderOtpCodeInput()}
                </div>
                <div className="cr-withdraw-column">
                    <div>
                        <SummaryField
                            className="cr-withdraw__summary-field "
                            message="Fee"
                            content={this.renderFee()}
                            borderItem={borderItem}
                        />
                        <SummaryField
                            className="cr-withdraw__summary-field"
                            message="Total Withdraw Amount"
                            content={this.renderTotal()}
                            borderItem={borderItem}
                        />
                    </div>
                    <div className="cr-withdraw__deep">
                        <Button
                            className="cr-withdraw__button"
                            label="WITHDRAW"
                            onClick={this.handleClick}
                            disabled={Number(total) <= 0 || !Boolean(address)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    private renderFee = () => {
        const { fee, fixed, currency } = this.props;
        return (
            <span>
                <Decimal fixed={fixed}>{fee.toString()}</Decimal> {currency.toUpperCase()}
            </span>
            );
    }

    private renderTotal = () => {
        const total = this.state.total;
        const { fixed, currency } = this.props;
        return total ? (
            <span>
                <Decimal fixed={fixed}>{total.toString()}</Decimal> {currency.toUpperCase()}
            </span>) :
            <span>0 {currency.toUpperCase()}</span>;
    }

    private renderOtpCodeInput = () => {
        const { otpCode } = this.state;
        return (
            <React.Fragment>
                <form>
                    <fieldset className="cr-withdraw__input">
                        <legend>
                            6-digit GAuthenticator Code
                        </legend>
                        <Input
                            type="text"
                            className="cr-input-block__input"
                            placeholder="XXXXXX"
                            value={otpCode}
                            onChangeValue={this.handleChangeInputOtpCode}
                        />
                    </fieldset>
                </form>
                <div className="cr-withdraw__divider cr-withdraw__divider-two" />
            </React.Fragment>
        );
    }

    private handleClick = () => this.props.onClick(
        parseInt(this.state.amount, 10),
        this.state.address,
        this.state.otpCode,
    );

    private handleChangeInputAmount = (text: string) => {
        const value: number = parseFloat(text);
        const total: number = value - this.props.fee;
        if (total < 0) {
            this.setTotal(0);
        } else {
            this.setTotal(total);
        }
        this.setState({
            amount: value,
        });
    };

    private setTotal = (value: number) => {
        this.setState({
            total: value,
        });
    };

    private handleChangeInputAddress = (text: string) => {
        this.setState({
            address: text,
        });
    };

    private handleChangeInputOtpCode = (otpCode: string) => {
        this.setState({ otpCode });
    }
}

export {
    Withdraw,
    WithdrawProps,
    WithdrawState,
};
