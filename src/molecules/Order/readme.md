Order example:

```js

const handleChangePrice = (value) => { console.log(price); }
const onSubmit = (value) => console.log(value);

<Order
  feeBuy={0.0001}
  feeSell={0.0002}
  availableBase={123.10}
  availableQuote={50}
  onSubmit={onSubmit}
  priceMarketBuy={5}
  priceMarketSell={10}
  currentMarketAskPrecision={5}
  currentMarketBidPrecision={4}
  from="btc"
  to="eth"
  orderTypeText={'Order Type'}
  priceText={'Price'}
  amountText={'Amount'}
  handleChangeInputPrice={handleChangePrice}
/>
```
