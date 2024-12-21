import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import View from './components/View'
import NotFound from './components/NotFound'
import Lists from './components/Lists'


const router=createBrowserRouter(
  [
      {
        path:"/",
        element:
        <div>
           <Navbar/>
           <Home/>
        </div>
      },
      {
        path:"/pastes",
        element:
        <div>
          <Navbar/>
          <Lists/>

        </div>
      },
      {
        path:"/pastes/:id",
        element:
        <div>
          <Navbar/>
          <View/>

        </div>
      },
      {
         path:"*",
         element:<NotFound/>
      },
  ]
)

function App() {
  
  return (
    <div className='w-[100%] '>
       <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
