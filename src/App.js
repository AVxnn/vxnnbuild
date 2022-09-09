import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import Authorization
  from "./pages/authorization/authorization";
import Welcome from "./pages/welcome/welcome";

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/authorization" element={<Authorization />} />
            </Routes>
        </Router>
    </>
  );
}

export default App;
