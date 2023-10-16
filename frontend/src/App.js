import {Route,Routes} from 'react-router-dom'
import HomePage from './pages/Homepage';
import Private from './auth/Private';
import Login from './auth/Login';
import Register from './auth/Register'
function App() {
  return (
    
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/user' element={<Private/>}>
           
      </Route>
    </Routes>
    
  );
}

export default App;
