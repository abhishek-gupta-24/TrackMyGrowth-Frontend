import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import {Protected,UserInfo} from './components'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Info from './pages/Info.jsx'
import Profile from './pages/Profile.jsx'
import PersonalInfo from './pages/PersonalInfo.jsx'
import Edit from './pages/Edit.jsx'
import EditPersonal from './pages/EditPersonal.jsx'
import EditPlatforms from './pages/EditPlatforms.jsx'
import EditSocial from './pages/EditSocial.jsx'
import Features from './pages/Features.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';



const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Home />
    )
  },
  {
    path: '/login',
    element: (
      <Login />
    )
  },
  {
    path: '/signup',
    element: (
      <Signup />
    )
  },
  {
    path: '/info',
    element:
      (
        <Info />
      )
  },
  {
    path: '/profile',
    element:
      (
        <Profile />
      )
  },
  {
    path: '/personalInfo',
    element:
      (
        <PersonalInfo />
      )
  },
  {
    path: '/edit',
    element:
      (
        <Edit />
      ),
  },
  {
      path: 'edit/personal',
      element:
      (
        <EditPersonal/>
      )
  },
  {
    path: 'edit/platforms',
    element:
    (
      <EditPlatforms/>
    )
  },
  {
    path: 'edit/social',
    element:
    (
      <EditSocial/>
    )
  },
  {
    path: '/features',
    element:
    (
      <Features/>
    )
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
