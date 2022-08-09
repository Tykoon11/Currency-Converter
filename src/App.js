import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CurrencyRow from "./components/CurrencyRow";
import "./App.css";

const BASE_URL = "http://localhost:3001/convert";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]); //list currency
  const [fromCurrency, setFromCurrency] = useState(); //setDefault from currency selected
  const [toCurrency, setToCurrency] = useState(); //setDefault to currency selected
  const [exchangeRate, setExchangeRate] = useState(); //set and get exchange rates
  const [amount, setAmount] = useState(1); // set state for amount change
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true); //condition to denote which change
  const [loader, setLoader] = useState(false);

  let toAmount, fromAmount; //defining the exchange rates for from and to amounts
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        await axios
          .get(BASE_URL)
          .then((res) => {
            const firstCurrency = Object.keys(res.data.rates)[0];
            setLoader(false);
            setCurrencyOptions([res.data.base, ...Object.keys(res.data.rates)]);
            setFromCurrency(res.data.base);
            setToCurrency(firstCurrency);
            setExchangeRate(res.data.rates[firstCurrency]);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // to link the change in options to input
  useEffect(() => {
    const runThis = async () => {
    if (fromCurrency != null && toCurrency != null) {
      await axios
        .get(`${BASE_URL}? base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => setExchangeRate(res.data.rates[toCurrency]));
    }
    } 
    runThis()
  }, [fromCurrency, toCurrency]);

  //function to handle changes in amount
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div>
      {loader ? (
        <div className="loadingSpinnerContainer">
          <div className="loadingSpinner"></div>
        </div>
      ) : (
        <div>
          <div id="mainContainer">
            <div id="chart">
              <i className="fa fa-line-chart"></i>
            </div>
            <div id="textCan">
              <p>
                Convert <span style={{ color: "#016DE2" }}>your</span> Currency
              </p>
            </div>
            <div id="tabsCan">
              <div id="tab1">
                <h4 style={{ color: "#00D998" }}>From</h4>
                <CurrencyRow
                  currencyOptions={currencyOptions}
                  selectedCurrency={fromCurrency}
                  onChangeCurrency={(e) => setFromCurrency(e.target.value)}
                  amount={fromAmount}
                  onChangeAmount={handleFromAmountChange}
                />
              </div>
              <div className="exchange">
                <i
                  className="fa fa-exchange"
                  style={{ fontSize: "3em", color: "white" }}
                ></i>
              </div>

              <div id="tab2">
                <h4 style={{ color: "#00D998" }}>To</h4>
                <CurrencyRow
                  className="to"
                  currencyOptions={currencyOptions}
                  selectedCurrency={toCurrency}
                  onChangeCurrency={(e) => setToCurrency(e.target.value)}
                  amount={toAmount}
                  onChangeAmount={handleToAmountChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
