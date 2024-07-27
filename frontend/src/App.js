
import './App.css';
import{ BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import EmployeeManagementApp from './Components/EmployeeManagementApp';
import EmployeeDetails from './Components/EmployeeDetails';
import TreeComponent from './Components/TreeComponent';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="employee" />} />
            <Route path="/employee" element={<EmployeeManagementApp />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/employee/hierarchy" element = {<TreeComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
