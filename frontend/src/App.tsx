import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // No need for BrowserRouter or Router import
import Dashboard from "./app/dashboard/Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}
