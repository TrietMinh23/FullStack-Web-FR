import "./App.css";
import Router from "./Router/router";
import Navbar from "./pages/Home/components/NavBar";

function App() {
  return (
    <div className="App bg-light-silver">
      <Navbar></Navbar>
      <Router></Router>
    </div>
  );
}

export default App;
