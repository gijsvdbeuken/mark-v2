import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Settings from './pages/settings/Settings';
import Tasks from './pages/tasks/Tasks';
import { InteractionsProvider } from './context/InteractionsContext';

function App() {
  return (
    <InteractionsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </InteractionsProvider>
  );
}

export default App;
