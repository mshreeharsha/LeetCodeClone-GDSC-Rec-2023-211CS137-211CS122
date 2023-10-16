import {Route,Routes} from 'react-router-dom'
import HomePage from './pages/Homepage';
import Private from './auth/Private';
import ProblemDescription from './pages/ProblemDescription';
function App() {
  return (
    
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/user' element={<Private/>}>
           
      </Route>
      <Route path='/problems/:slug' element={<ProblemDescription/>}/>
    </Routes>
    
  );
}

export default App;
