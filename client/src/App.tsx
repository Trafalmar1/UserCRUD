import Layout from "Layout/Layout";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "redux/store";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <Layout />
      <ToastContainer />
    </Provider>
  );
}

export default App;
