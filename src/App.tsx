import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CurrentPrice from './views/CurrentPrice';

/**
 * The main App component.
 * 
 * It renders a BrowserRouter and inside it,
 * a header with the application title and a main section with the routes.
 * The routes are for '/', which renders the CurrentPrice component, and
 * '/current-price', which also renders the CurrentPrice component.
 */
function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <header className="bg-blue-600 text-white p-4 shadow-md">
                    <h1 className="text-2x1 font-bold">Bitcoin Tracker</h1>
                </header>
                <main className="container mx-auto p-4">
                    <Routes>
                        <Route path="/current-price" element={<CurrentPrice />}></Route>
                        <Route path="/" element={<CurrentPrice />}></Route>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
