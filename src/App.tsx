import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ChartDetail from '@/pages/ChartDetail';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart/:id" element={<ChartDetail />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
