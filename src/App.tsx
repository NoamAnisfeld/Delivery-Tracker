import './App.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import AddItemForm from './components/AddItemForm/AddItemForm';
import ItemsList from './components/ItemsList/ItemsList';
import { useGlobalStateContext } from './GlobalState/GlobalState';

function App() {
  const {
    awaitedProducts,
    archivedProducts,
  } = useGlobalStateContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Grid container textAlign="center">
          <Grid item p={2} bgcolor="primary.main" flexBasis="50%">
            <Link to="/">
              <Typography color="primary.contrastText">
                Products you are awaiting for
              </Typography>
            </Link>
          </Grid>
          <Grid item p={2} bgcolor="secondary.main" flexBasis="50%">
            <Link to="/archive">
              <Typography color="secondary.contrastText">
                Archive of items you already got
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Typography variant="h1" textAlign="center" fontSize="3rem">
          Purcashes Delivery Tracker
        </Typography>
        <Routes>
          <Route index element={<>
            <AddItemForm />

            <Typography variant="h2" fontSize="2rem">
              Items Waiting for Delivery
            </Typography>
            <ItemsList items={awaitedProducts} />
          </>} />
          <Route path="/archive" element={<>
            <Typography variant="h2" fontSize="2rem">
              Archive of delivered items
            </Typography>
            <ItemsList items={archivedProducts} />
          </>} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
