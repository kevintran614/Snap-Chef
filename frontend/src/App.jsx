import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import Recipes from "./components/Recipes.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/recipes" element={<Recipes />}></Route>
    </Routes>
  );
}

export default App;
