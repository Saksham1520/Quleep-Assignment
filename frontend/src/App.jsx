import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footter from "./Components/Footter";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footter />
    </>
  );
}

export default App;
