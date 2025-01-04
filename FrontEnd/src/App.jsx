import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import Captainlogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtetedWrapper from './pages/UserProtectedWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainLogout from './pages/CaptainLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper.jsx'

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/home' element={<UserProtetedWrapper ><Home /> </UserProtetedWrapper>} />
        <Route path='/user/logout' element={<UserProtetedWrapper ><UserLogout /> </UserProtetedWrapper>} />
        <Route path='/user/logout' element={<UserProtetedWrapper ><CaptainLogout /> </UserProtetedWrapper>} />
        <Route path='/captain-home' element={<CaptainProtectedWrapper ><CaptainHome /> </CaptainProtectedWrapper>} />

      </Routes>
    </div>
  )
}

export default App