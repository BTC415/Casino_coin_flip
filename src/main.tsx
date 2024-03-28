import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import StoreProvider from './store/store.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SVGs from './components/svg.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <SVGs />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <BrowserRouter>
      <Routes>
        <Route path="heads-or-tails">
          <Route index element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StoreProvider>
  ,
)
