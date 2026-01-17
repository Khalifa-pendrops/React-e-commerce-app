import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import { ToastProvider } from "./components/Toast";
import AppLoadBurst from "./components/AppLoadBurst";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastProvider>
        <AppLoadBurst />
        <App />
      </ToastProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
