import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import store from "./redux/store";

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <App />
      </SnackbarProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
