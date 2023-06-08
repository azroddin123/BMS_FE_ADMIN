import "./App.css";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Udharis from "./pages/Udharis";
import Customers from "./pages/Customers";
import Parlours from "./pages/Parlours";
import Products from "./pages/Products";
import { QueryClient, QueryClientProvider} from "react-query";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import About from "./pages/About";
import Login from "./pages/Login";
import MakeupArtist from "./pages/MakeupArtist";
import Banners from "./pages/Banners";
import Testimonials from "./pages/Testimonials";
import PrivateRoute from "./utils/PrivateRoute";
import { createTheme ,ThemeProvider,createStyles } from '@mui/material/styles'
import Gallary from "./pages/Gallary";
import MetaTags from "./pages/MetaTags";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect } from "react";
import axios from "axios";
import StorageManagement from "./pages/StorageManagement";

const queryClient = new QueryClient();

const theme = createTheme({
  // overrides 
    palette: {
      primary: {
        main: "#F49881",
        contrastText : 'white'
      },
    },
    typography: {
      "fontFamily": `"Poppins", "Helvetica", "Arial", sans-serif`,
      "fontSize": 14,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500,
    },
    shape :{
      borderRadius : '10px'
    },
});

function App() {


  useEffect(
    () => {
      axios.defaults.headers.common['Authorization'] = 
      localStorage.getItem("_token");
    },[]
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme = {theme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact element={<PrivateRoute  />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/udharis" element={<Udharis />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/makeup-artists" element={<MakeupArtist />} />
              <Route path="/parlours" element={<Parlours />} />
              <Route path="/makeup-products" element={<Products />} />
              <Route path="/banners" element={<Banners />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/gallary" element={<Gallary />} /> */}
              <Route path="/gallery" element={<Gallary />} />
              <Route path="/meta-tags" element={<MetaTags />} />
              <Route path="/storage-management" element={<StorageManagement />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </QueryClientProvider>
    </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
