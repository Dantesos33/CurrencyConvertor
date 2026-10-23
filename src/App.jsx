import { useState } from 'react';
import InputBox from './components/InputBox';
import useCurrency from './hooks/useCurrency';

function App() {
  const [fromAmount, setFromAmount] = useState(0);
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [fromCurrency, setFromCurrency] = useState("usd");

  const [toAmount, setToAmount] = useState(0);
  const [isToOpen, setIsToOpen] = useState(false);
  const [toCurrency, setToCurrency] = useState("pkr");

  const currencyData = useCurrency(fromCurrency);
  const currencies = Object.keys(currencyData);

  

  return (
    <div className="bg-linear-to-br from-slate-800 via-indigo-950 to-slate-900 h-screen flex flex-col items-center justify-center p-4">
      {/* Main glass-panel card wrapper */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-center bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-wide">
          Currency Converter
        </h1>
        
        <form method="post" action="/convert" className="mt-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* FROM FIELDSET */}
            <InputBox
              label="From"
              amount={fromAmount}
              setAmount={setFromAmount}
              currencies={currencies}
              selectedCurrency={fromCurrency}
              setSelectedCurrency={setFromCurrency}
              isDropdownOpen={isFromOpen}
              setIsDropdownOpen={setIsFromOpen}
            />                

            {/* Equals Sign Icon Divider */}
            <div className="text-xl font-bold bg-slate-800 border border-white/10 text-slate-300 w-10 h-10 rounded-full flex items-center justify-center shadow">
              ＝
            </div>

            {/* TO FIELDSET */}
            <InputBox
              label="To"
              amount={toAmount}
              setAmount={setToAmount}
              currencies={currencies}
              selectedCurrency={toCurrency}
              setSelectedCurrency={setToCurrency}
              isDropdownOpen={isToOpen}
              setIsDropdownOpen={setIsToOpen}
              amountPlaceholder="Result"
              amountDisabled={true}
            />

          </div>

          <button 
            type="submit" 
            className="cursor-pointer w-full h-12 mt-2 bg-linear-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold rounded-xl tracking-wide shadow-lg hover:brightness-110 active:scale-[0.99] transition duration-150"
            onClick={(e) => {
              e.preventDefault();
              const convertedAmount = Number(fromAmount * currencyData[toCurrency]).toFixed(2);
              setToAmount(convertedAmount);
            }}
          >
            Convert {fromAmount} {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
