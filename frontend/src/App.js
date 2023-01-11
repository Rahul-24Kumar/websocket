import React from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ROUTES } from "./const";

import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import UserDetails from "./components/userDetails";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Routes>
          {ROUTES.map(({ path, page }, index) => {
            return <Route path={path} key={index} element={page} />;
          })}

          <Route exact path="/" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/userDetails" element={<UserDetails />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
