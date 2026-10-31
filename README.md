# Currency Converter

A currency converter built with **React** and **TypeScript**. It fetches exchange rates from an API, converts between currencies, and supports a light and dark theme.

**Live demo:** <add-your-deployed-url>

## Features

- Convert an amount from one currency to another
- Live exchange rates fetched from an API
- Light and dark theme toggle
- Loading and error states for data fetching
- Fully typed with TypeScript

## Tech stack

| Layer | Technology |
|---|---|
| UI | React |
| Language | TypeScript |
| Build tool | Vite |
| Styling | <CSS / Tailwind CSS / CSS Modules> |
| Api | fawazahmed0/currency-api |

## React concepts used

This project is a practice ground for core React features:

| Concept | Where it is used |
|---|---|
| `useState` | Amount, selected currencies, and theme state |
| `useEffect` | Fetching exchange rates when the selected currency changes |
| Custom hook | <hook name, e.g. `useCurrencyInfo`> encapsulates the fetch logic and returns the rates |
| Light and dark theme | Theme toggle that switches the app's color scheme |
| TypeScript | Typed props, state, hook return values, and API responses |

## Getting started

### Requirements

- Node.js 20+

### Installation

```bash
git clone <your-repo-url>
cd currency-converter
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server with HMR |
| `npm run lint` | Run ESLint |

## Project structure

Adjust this to match your folders:

```
src/
  components/     UI pieces (input box, theme toggle, etc.)
  hooks/          Custom hook for fetching rates
  App.tsx
  main.tsx
```

## How it works

1. The user enters an amount and picks the "from" and "to" currencies.
2. The custom hook fetches the latest rates for the "from" currency inside `useEffect`.
3. The converted amount is calculated from the returned rate and shown instantly.
4. The theme toggle switches between light and dark mode.

## Possible improvements

- [ ] Swap button to flip the two currencies
- [ ] Remember the chosen theme and currencies across visits
- [ ] Cache rates to avoid refetching on every change
- [ ] Historical rate chart
- [ ] Unit tests for the custom hook

## License

MIT
