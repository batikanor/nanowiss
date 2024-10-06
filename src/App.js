import './App.css';
import HomePage from './components/HomePage';
import TeamPage from './components/TeamPage'; // Import the TeamPage
import ProductsPage from './components/ProductsPage'; // Import the ProductsPage
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes basename={process.env.PUBLIC_URL}>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/products" element={<ProductsPage />} /> {/* Add the route for ProductsPage */}
        <Route path="/nanowiss" element={<HomePage />} />
        <Route path="/nanowiss/team" element={<TeamPage />} /> {/* Define the route for TeamPage */}
        <Route path="/nanowiss/products" element={<ProductsPage />} /> {/* Define the route for ProductsPage */}
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to HomePage for unmatched routes */}
      </Routes>
    </Router>
  );
}

export default App;
