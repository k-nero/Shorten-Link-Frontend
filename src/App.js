import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/dashboard" element={<Dashboard />} />*/}
          {/*<Route path="/login" element={<Login />} />*/}
          {/*<Route path="/register" element={<Register />} />*/}
        </Routes>
      </BrowserRouter>
  );
}
export default App;
