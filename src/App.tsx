import './App.css';
import Navigation from './components/Navigation/Navigation';
import Main from './components/Main/Main';
import Archive from './components/Archive/Archive';
import { useGlobalStateContext } from './GlobalState/GlobalState';

import { HashRouter, Routes, Route } from 'react-router-dom';
import Typography from '@mui/material/Typography';

function App() {
  const {
    awaitedProducts,
    archivedProducts,
  } = useGlobalStateContext();

  return (
    <div className="App">
      <HashRouter>
        <Navigation />
        <Routes>
          <Route index element={<Main />} />
          <Route path="archive" element={<Archive />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
