import { Toaster } from "react-hot-toast";
import Home from "./pages/home.page";
import "./index.css";

function App() {
  return (
    <div className="min-h-[100vh] bg-slate-100">
      <Toaster position="top-right" reverseOrder={true} />
      <Home />
    </div>
  );
}

export default App;
