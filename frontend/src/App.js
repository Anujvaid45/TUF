import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Form from './pages/Form';
import ResponseList from './pages/List';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/' element={<HomePage/>}/>
      <Route path = '/list' element={<ResponseList/>}/>
      <Route path = '/create' element={<Form/>}/>
      <Route path='/*' element={<PageNotFound />}/>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
