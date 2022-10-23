import './App.css';
import PrimaryNavigation from './components/Navigation/PrimaryNavigation';
import Main from './components/Main/Main';
import StoresSummary from './components/StoresSummary/StoresSummary';

import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <PrimaryNavigation />
        <Routes>
          <Route index path="/*" element={<Main />} />
          <Route path="stores" element={<StoresSummary />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
