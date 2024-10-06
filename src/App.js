import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import TeamPage from './components/TeamPage'; // Import the TeamPage
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/nanowiss" element={<HomePage />} />
        <Route path="/nanowiss/team" element={<TeamPage />} /> {/* Define the route for TeamPage */}
      </Routes>
    </Router>
  );
}

export default App;
