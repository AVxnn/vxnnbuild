import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import Welcome from "./pages/welcome/welcome";
import PrivateRoute from "./entities/authChecker/privateRoute";
import Main from "./pages/main/main";
import Registration from "./pages/registration/registration";
import Authorization from "./pages/authorization/authorization";

function App() {



  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="authorization" element={
                    <Authorization />
                } />
                <Route path="main" element={
                    <PrivateRoute>
                        <Main />
                    </PrivateRoute>
                } />
                <Route path="registration" element={
                    <Registration />
                } />
            </Routes>
        </Router>
    </>
  );
}

export default App;
