
import './App.css';
import { BrowserRouter, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import { Route } from 'react-router-dom';
import FitnessForm from './components/FitnessForm';
import UpdateForm from './components/UpdateForm';
import ViewForm from './components/ViewForm';

function App() {
  return (
    <BrowserRouter>
      <div>
       
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav">
          <Link className="navbar-brand" to="/home">Fit Nest</Link>
        </nav>

        <Routes>
          {/* configure the routes here and import necessary imports required*/}
          <Route path = "/home" element = {<Home/>}/>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/fitness-form" element = {<FitnessForm/>}/>
          <Route path = "/view-form" element = {<ViewForm/>}/>
          <Route path = "/update-form/:joiningId" element = {<UpdateForm/>}/>
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
