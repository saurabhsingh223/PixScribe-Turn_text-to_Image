import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Generate from './pages/Generate';
import Result from './pages/Result';
import MyCreations from './pages/MyCreations';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/result" element={<Result />} />
            <Route path="/my-creations" element={<MyCreations />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
