import './App.css';
import Grid from '@mui/material/Grid';
import AddItemForm from './components/AddItemForm/AddItemForm';
import ItemsList from './components/ItemsList/ItemsList';

function App() {
  return (
    <div className="App">
      <Grid container sx={{p: 10}}>
        <Grid item xs={12} >
          <AddItemForm />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
