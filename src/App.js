import "./App.css";
//import MyForm from './AddScheme';
//import Form from './addDB'
import { Sidebars } from "./components/Sidebars";
import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import Crud from './components/crud/Crud.css';
import LoadPage from "./pages/Load/LoadPage";
import TestCrude from "./pages/Env/TestCrude";
import SchemaCrude from "./pages/Schema/SchemaCrude";
import AddEnv from "./pages/Env/AddEnv";
import TraitementTable from "./pages/traitement/TraitementTable";
const theme = createTheme({
  palette: {
    primary: {
      main: "#008C75",
    },
    secondary: {
      main: "#00CCAA",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <div className="wrapper">
          <Router>
            <Sidebars />

            <Routes>
              <Route path="/Environment" element={<TestCrude />} />
              <Route path="/Schema" element={<SchemaCrude />} />
              <Route path="/addDatabase" element={<AddEnv />} />
              <Route exact path="/" element={<TraitementTable />} />     
              <Route path="/Traitement" element={<TraitementTable />} />
              <Route path="/Load" element={<LoadPage />} />
            </Routes>
          </Router>
        </div>
      </Fragment>
    </ThemeProvider>
  );
}

export default App;
