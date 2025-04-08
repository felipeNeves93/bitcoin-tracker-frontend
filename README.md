# Bitcoin Tracker frontend 
Bitcoin Tracker frontend is the frontend that fetches and displays real-time Bitcoin price data from the [bitcoin-tracker-backend](https://github.com/felipeNeves93/bitcoin-tracker/tree/master) project. It provides users with the latest Bitcoin price and a daily summary of price variations, styled with Tailwind CSS for a modern, responsive UI. The frontend is built with React and TypeScript using Vite, while the backend is powered by FastAPI and SQLite.

### Features

- **Current Price View**: Displays the most recent Bitcoin price with a timestamp, formatted in the user’s local timezone.

- **Daily Summary View**: Shows the maximum and minimum Bitcoin prices for the current day, along with the percentage variation.
- **Real-Time Updates**: Automatically refreshes data every 30 seconds.
- **Responsive Design**: Built with Tailwind CSS for a clean, mobile-friendly interface.
- **Environment Configuration**: Backend host is configurable via an environment variable (VITE_APP_HOST).

### Tech Stack

- **React**: JavaScript library for building the UI.
- **TypeScript**: Adds static typing to JavaScript for better maintainability.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios: HTTP client** for API requests.

### Prerequisites

- **Node.js**: v18 or later (recommended LTS version).
- **NPM**: v8 or later (comes with Node.js).

### Running the frontend

```cd bitcoin-tracker-frontend
npm install
npm run dev 
```

### Running the full app
- Start the backend: [bitcoin-tracker-backend](https://github.com/felipeNeves93/bitcoin-tracker/tree/master)
- Start this frontend
- Visit ```http://localhost:5173/current_price```
- ![Project screenshot](/src/assets/project-screenshot.png)