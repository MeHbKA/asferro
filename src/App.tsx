import React from 'react'
import UserList from './components/UserList';
import {Routes,Route} from 'react-router-dom'; 
import CreateUser from './components/CreateUser';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserList/>} />
        <Route path="/createUser/:userId" element={<CreateUser/>} />
        <Route path="/createUser" element={<CreateUser/>} />
      </Routes>
      
    </div>
  )
}
export default App;