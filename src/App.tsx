import './App.css';
import Navigation from './components/Navigation/Navigation';
import Main from './components/Main/Main';
import Archive from './components/Archive/Archive';

import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {

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
