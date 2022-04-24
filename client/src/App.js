import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import './App.css';
import CreateTest from './components/dashboard/CreateTest';
import UserSampleRecord from './components/dashboard/UserSampleRecord';
import Login from './components/login/Login';
import NavigateBar from './components/navigationBar/NavigateBar';
import RegisterAdminAndUser from './components/register/RegisterAdminAndUser';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import authToken from './components/login/authToken'
import { ToastContainer } from 'react-toastify';

function App() {
  const data = authToken()
  return (
    <div className="App">
      <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      // rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      <Router>
        <Route path="/" component={NavigateBar} />
        <Route exact path="/" component={Login} />
        <ProtectedRoute path="/userrecords" name="Nilesh" component={UserSampleRecord} />
        <ProtectedRoute path="/register" component={RegisterAdminAndUser} />
        <ProtectedRoute path="/createtest" component={CreateTest} />
      </Router>
    </div>
  );
}

export default App;




