import { useState, useRef, useEffect } from "react";

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
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsDropdownOpen]);

  const filteredCurrencies = currencies.filter((currency) =>
    currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <fieldset className="w-full border border-white/20 p-5 rounded-xl bg-slate-900/40 relative">
      <legend className="px-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
        {label}
      </legend>
      <div className="flex gap-2 items-center justify-center">
        <input 
          className="outline-none pl-3 w-full rounded-lg border border-slate-700 bg-slate-950/60 text-white placeholder-slate-400 h-11 focus:border-emerald-500 transition" 
          type="number"
          placeholder={amountPlaceholder}
          value={amount}
          onChange={(e) => setAmount(e.target.value)} 
          disabled={amountDisabled}
          required
        />
        
        <div ref={dropdownRef} className="relative w-32 shrink-0">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-full h-11 px-3 text-left bg-slate-800 text-white font-medium rounded-lg border border-slate-700 hover:bg-slate-700 outline-none transition uppercase"
          >
            <span>{selectedCurrency}</span>
            <span className={`text-[10px] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-50 mt-1 w-44 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <div className="p-2 border-b border-slate-800 bg-slate-950">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-2 py-1 text-sm bg-slate-800 text-white border border-slate-700 rounded outline-none focus:border-emerald-500"
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
                      className={`px-4 py-2 text-sm text-slate-200 cursor-pointer hover:bg-emerald-600 hover:text-white transition uppercase ${
                        selectedCurrency === currency ? "bg-slate-800 font-bold text-emerald-400 border-l-2 border-emerald-400" : ""
                      }`}
                    >
                      {currency}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-xs text-slate-500 italic">No matches</li>
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
