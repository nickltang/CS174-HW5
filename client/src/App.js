import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import LoginVulnerable from './pages/LoginVulnerable';
import NotFound from './pages/NotFound';
import RefineDate from './pages/RefineDate';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <Navigation />
      <Container className="justify-content-md-center mt-3" style={{width: "50%"}}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login-vulnerable" element={<LoginVulnerable />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/refine-date" element={<RefineDate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>    
      </Container>
      
    </div>
    
  );
}

export default App;
