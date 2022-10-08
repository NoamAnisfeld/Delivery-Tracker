import './App.css';
import Grid from '@mui/material/Grid';
import AddItemForm from './components/AddItemForm/AddItemForm';
import ItemsList from './components/ItemsList/ItemsList';
import { useGlobalStateContext } from './GlobalState/GlobalState';

function App() {
  const {
    awaitedProducts
  } = useGlobalStateContext()!;

  return (
    <div className="App">
      <Grid container>
        <Grid item lg={6}>
          <h2>Available Items</h2>
          <AddItemForm />
        </Grid>
        <Grid item lg={6}>
          <h2>Items Waiting for Delivery</h2>
          <ItemsList itemIds={Array.from(awaitedProducts)} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
