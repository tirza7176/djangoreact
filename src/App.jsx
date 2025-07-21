import { Route, Routes } from "react-router-dom";

import Navbar from "./component/navbar";
import Home from "./page/home";
import SignIn from "./page/sign-in";
import Register from "./page/register";
import Signout from "./component/sign-out";
import Footer from "./component/footer";
function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <header>
        <Navbar />
      </header>
      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />

          <Route path="/sign-out" element={<Signout />} />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
