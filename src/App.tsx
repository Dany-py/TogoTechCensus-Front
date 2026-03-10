import Home from './pages/Home';
import Connection from './pages/Connection'
import Dashboard from './pages/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { userAuth } from './services/auth.service';
import { initCSRF } from './services/csrf.service';
import './App.css'
const router = createBrowserRouter([  
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "signin/",
    element: <Connection/>,
    action: userAuth,
    //loader: initCSRF
  },
  {
    path: "signup/",
    element:<Connection />,
    action: userAuth,
    //loader: initCSRF
  },
  {
    path: "dashboard/",
    element: <Dashboard />
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;