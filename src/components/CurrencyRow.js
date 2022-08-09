import React from "react";
import "../App.css";

function CurrencyRow({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
}) {
  return (
    <div>
      <div className="inputDiv">
        <input type="number" value={amount} onChange={onChangeAmount} />

        <select value={selectedCurrency} onChange={onChangeCurrency}>
          {currencyOptions.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CurrencyRow;
