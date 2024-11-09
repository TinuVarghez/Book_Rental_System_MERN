import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
// import NewDept from './department/pages/NewDept';
import MainNavigation from './shared/Navigation/MainNavigation';
// import Emps from './employee/pages/Emps';
// import Depts from './department/pages/Depts';
// import AddEmp from './employee/pages/AddEmp';
// import DeptEmp from './employee/pages/DeptEmp';
import { AuthContext } from './shared/Context/AuthContext';
import { useState,useCallback} from 'react';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login = useCallback(()=>{
    setIsLoggedIn(true)
  },[])
  const logout = useCallback(()=>{
    setIsLoggedIn(false)
  },[])

  let routes;
  if(isLoggedIn){
    routes=(
      <Routes>
        {/* <Route path="/" element={<Depts/>}></Route>
        <Route path="/emp/new" element={<AddEmp/>}></Route>
        <Route path="/:deptId/employee" element={<DeptEmp/>}></Route> */}
        <Route path="*" element={<Navigate to = "/" />}></Route>
      </Routes>
    )
  }
  else{
    routes=(
      <Routes>
        <Route path="/" element={<Depts/>}></Route>
        {/* <Route path="/:deptId/employee" element={<DeptEmp/>}></Route> */}
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="*" element={<Navigate to = "/auth" />}></Route>
      </Routes>
    )
  }
  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login:login, logout:logout}}>
    <Router>
      <MainNavigation/>
      <main>
        {routes}
      </main>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;

