import { useState, useEffect } from 'react';
import InputBox from './components/InputBox.tsx';
import useCurrency from './hooks/useCurrency.ts';
import { ThemeProvider } from './context/theme.ts'

function App() {
  const [fromAmount, setFromAmount] = useState<number>(0);
  const [isFromOpen, setIsFromOpen] = useState<boolean>(false);
  const [fromCurrency, setFromCurrency] = useState<string>("usd");

  const [toAmount, setToAmount] = useState<number>(0);
  const [isToOpen, setIsToOpen] = useState<boolean>(false);
  const [toCurrency, setToCurrency] = useState<string>("pkr");

  const currencyData: Record<string, number> = useCurrency(fromCurrency);
  const currencies: string[] = Object.keys(currencyData);

  const [theme, setTheme] = useState<string>("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  },[theme]);

  return (
    <ThemeProvider value={{ theme: "light", toggleTheme }}>
    <div className="bg-linear-to-br from-slate-200 via-zinc-100 to-slate-300 h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 dark:from-slate-800 dark:via-indigo-950 dark:to-slate-900">
      
      {/* Main glass-panel card wrapper */}
      <div className="w-full max-w-2xl bg-zinc-100/80 backdrop-blur-md p-8 rounded-2xl border border-zinc-300/60 shadow-xl transition-all duration-300 relative dark:bg-white/10 dark:border-white/20 dark:shadow-2xl">
        
        {/* Theme Toggle Button Container */}
        <div className="absolute top-6 right-6">
          <button
            type="button"
            className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-200 border border-zinc-300 text-zinc-600 shadow-xs hover:bg-zinc-300/80 active:scale-95 transition-all duration-150 dark:bg-slate-800 dark:border-white/10 dark:text-slate-300 dark:hover:bg-slate-700"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {/* Minimalist Eclipse / Sun-Ring Icon (Displays in Light Theme) */}
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 block dark:hidden">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            
            {/* Moon Icon SVG (Displays in Dark Theme) */}
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 hidden dark:block">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          </button>
        </div>

        {/* Soft desaturated emerald/cyan gradient text */}
        <h1 className="text-3xl font-extrabold text-center bg-linear-to-r from-emerald-700 to-cyan-700 bg-clip-text text-transparent tracking-wide pr-12 md:pr-0 dark:from-emerald-400 dark:to-cyan-400">
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
            <div className="text-xl font-bold bg-zinc-200 border border-zinc-300 text-zinc-600 w-10 h-10 rounded-full flex items-center justify-center shadow shrink-0 dark:bg-slate-800 dark:border-white/10 dark:text-slate-300">
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
            className="cursor-pointer w-full h-12 mt-2 bg-linear-to-r from-emerald-600 to-cyan-600 text-zinc-50 font-bold rounded-xl tracking-wide shadow-md hover:brightness-105 active:scale-[0.99] transition duration-150 dark:from-emerald-500 dark:to-cyan-500 dark:text-slate-950 dark:hover:brightness-110 dark:shadow-lg"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              const rate = currencyData[toCurrency] || 0;
              const convertedAmount = Number((fromAmount * rate).toFixed(2));
              setToAmount(convertedAmount);
            }}
          >
            Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
