import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
//*******Pages****** */
import Splash from './pages/splash/splash.jsx';
import Index from './pages/index/index.jsx';
import Login from './pages/login/login.jsx';
import Signup from './pages/signup/signup.jsx';
import Home from './pages/home/home.jsx';
import Quiz from './pages/quiz/quiz.jsx';
import Settings from './pages/settings/settings.jsx';
import Board from './pages/board/board.jsx';


const router = createBrowserRouter([
  {
    path:'/',
    element: <Splash/>,
  },
  {
    path:'/index',
    element: <Index/>,
  },

  {
    path:'/login',
    element: <Login/>,
  },
  {
    path:'/signup',
    element: <Signup/>,
  },
  {
    path:'/home',
    element: <Home/>,
  },
  {
    path:'/quiz/:subject',
    element: <Quiz/>,
  },
  {
    path:'/board',
    element: <Board/>,
  },
  {
    path:'/settings',
    element: <Settings/>,
  },
  
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
