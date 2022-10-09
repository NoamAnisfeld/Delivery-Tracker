import './App.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AddItemForm from './components/AddItemForm/AddItemForm';
import ItemsList from './components/ItemsList/ItemsList';
import { useGlobalStateContext } from './GlobalState/GlobalState';

function App() {
  const {
    awaitedProducts
  } = useGlobalStateContext()!;

  return (
    <div className="App">
      <Typography variant="h1" textAlign="center" fontSize="3rem">
        Purcashes Delivery Tracker
      </Typography>
      <AddItemForm />
      
      <Typography variant="h2" fontSize="2rem">
        Items Waiting for Delivery
      </Typography>
      <ItemsList items={awaitedProducts} />
    </div>
  );
}

export default App;
