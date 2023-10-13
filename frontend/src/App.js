import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HomePage from './pages/Homepage';
import Private from './auth/Private';
function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<HomePage/>}/>
 
        <Route path='/user' element={<Private/>}>
           
        </Route>

       </Routes>
    
    </BrowserRouter>
  );
}

export default App;
