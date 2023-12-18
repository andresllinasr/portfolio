import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/global_styles.scss";

import { App } from "./pages/App/App";
import { Library } from "./pages/Library";

ReactDOM.render(
    <Router>
        <Routes>
            <Route exact path="/" component={App} />
            <Route path="/library" component={Library} />
        </Routes>
    </Router>,
    document.getElementById("app")
);