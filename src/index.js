import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
{/*  Нужен для проверок, а не для рендеринга*/}
        <App />
  {/*    Корневой компонент*/}
    </StrictMode>,
    rootElement
);
