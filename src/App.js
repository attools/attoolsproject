import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menubar from './menubar';
import {Routes,Route} from "react-router-dom";
import Joblistpage from './components/job-post-list';
import Home from "./components/home";
// import Footerbar from './components/footer-bar';
import PageNotFound from '../src/components/pagenotfound';
import AnniversaryList from '../src/components/anniversarylist';
import LoginPage from './components/loginpage';
import { useLocation } from 'react-router-dom';
import ProtectedRoute from './components/rbaccontrol/producted-route';
import {useFetchCollection} from './components/getfirebasedata';
function App() {
const navigate = useLocation();
const { fbdbdata: Logindata } = useFetchCollection("loginDetails");
console.log("Logindata",Logindata);
  return (
    <div className="App">
      {navigate.pathname !== '/' && <Menubar />}
      {/* <Menubar /> */}
      <div className={navigate.pathname === '/' ? '' : `routing-content`}>
        <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route exact path="joblist" element={<ProtectedRoute><Joblistpage /></ProtectedRoute>} />
            <Route exact path="/anniversarylist" element={<ProtectedRoute><AnniversaryList /></ProtectedRoute>} />
            <Route exact path="*" element={<PageNotFound />} />
            <Route exact path="/404" element={<PageNotFound />} />
        </Routes>
      </div>
      {/* <Footerbar /> */}
    </div>
  );
}

export default App;
