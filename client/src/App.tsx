import Layout from "Layout/Layout";
import { Provider } from "react-redux";

import { store } from "redux/store";

import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
