import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ChartDetail from '@/pages/ChartDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart/:id" element={<ChartDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
