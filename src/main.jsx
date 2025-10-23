import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import {Protected} from './components' 
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
      <Protected authentication={false}>
        <Login />
      </Protected>
    )
  },
  {
    path: '/signup',
    element: (
      <Protected authentication={false}>
        <Signup />
      </Protected>
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
        <Protected>
          <Profile />
        </Protected>
      )
  },
  {
    path: '/personalInfo',
    element:
      (
        <Protected>
          <PersonalInfo />
        </Protected>
      )
  },
  {
    path: '/edit',
    element:
      (
        <Protected>
          <Edit />
        </Protected>
      ),
  },
  {
      path: 'edit/personal',
      element:
      (
        <Protected>
          <EditPersonal/>
        </Protected>
      )
  },
  {
    path: 'edit/platforms',
    element:
    (
      <Protected>
        <EditPlatforms/>
      </Protected>
    )
  },
  {
    path: 'edit/social',
    element:
    (
      <Protected>
        <EditSocial/>
      </Protected>
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

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  );
}