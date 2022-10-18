import './App.css';
import PrimaryNavigation from './components/Navigation/PrimaryNavigation';
import Main from './components/Main/Main';

import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <HashRouter>
        <PrimaryNavigation />
        <Routes>
          <Route index path="/*" element={<Main />} />
          <Route path="stores" element={<>WIP</>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
