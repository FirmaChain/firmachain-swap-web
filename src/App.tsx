import { BrowserRouter } from "react-router-dom";

import { Main } from "./pages";

import "./default.css";

const App = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};

export default App;
