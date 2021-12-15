import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";

import App from "./App";

ReactDOM.render(
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
  >
    <App />
  </SnackbarProvider>,
  document.getElementById("root")
);
