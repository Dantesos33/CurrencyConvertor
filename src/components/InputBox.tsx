import { useState, useRef, useEffect, ChangeEvent } from "react";

const InputBox = ({
    label,
    amount,
    setAmount,
    amountDisabled=false,
    amountPlaceholder = "Amount",
    currencies = [],
    selectedCurrency = "usd",
    setSelectedCurrency,
    isDropdownOpen,
    setIsDropdownOpen,
    name = "currency"
}: {
  label: string;
  amount: number;
  setAmount: (value: number) => void;
  amountDisabled?: boolean;
  amountPlaceholder?: string;
  currencies: string[];
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  name?: string;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsDropdownOpen]);

  const filteredCurrencies:string[] = currencies.filter((currency) =>
    currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <fieldset className="w-full border border-slate-200 p-5 rounded-xl bg-white relative dark:border-white/10 dark:bg-slate-900/40">
      <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
        {label}
      </legend>
      <div className="flex gap-2 items-center justify-center">
        <input 
          className="outline-none pl-3 w-full rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 h-11 focus:border-emerald-500 transition dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder-slate-500 dark:focus:border-emerald-500" 
          type="number"
          placeholder={amountPlaceholder}
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount((e.target.value as unknown) as number)} 
          disabled={amountDisabled}
          required
        />
        
        <div ref={dropdownRef} className="relative w-32 shrink-0">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-full h-11 px-3 text-left bg-slate-100 text-slate-800 font-medium rounded-lg border border-slate-300 hover:bg-slate-200 outline-none transition uppercase dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700"
          >
            <span>{selectedCurrency}</span>
            <span className={`text-[10px] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-50 mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 dark:bg-slate-900 dark:border-slate-700">
              <div className="p-2 border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-2 py-1 text-sm bg-white text-slate-900 border border-slate-300 rounded outline-none focus:border-emerald-500 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:focus:border-emerald-500"
                  autoFocus
                />
              </div>
              <ul className="max-h-48 overflow-y-auto custom-scrollbar">
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((currency) => (
                    <li
                      key={currency}
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setIsDropdownOpen(false);
                        setSearchQuery("");
                      }}
                      className={`px-4 py-2 text-sm text-slate-700 cursor-pointer hover:bg-emerald-600 hover:text-white transition uppercase dark:text-slate-200 dark:hover:bg-emerald-600 ${
                        selectedCurrency === currency ? "bg-slate-100 font-bold text-emerald-600 border-l-2 border-emerald-500 dark:bg-slate-800 dark:text-emerald-400 dark:border-emerald-400" : ""
                      }`}
                    >
                      {currency}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-xs text-slate-400 italic dark:text-slate-500">No matches</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <input type="hidden" name={name} value={selectedCurrency} />
      </div>
    </fieldset>
  );
};

export default InputBox;
