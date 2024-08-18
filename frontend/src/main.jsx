import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddSubscription from './components/AddSubscription.jsx'
import RevenueReport from './components/RevenueReport.jsx'
import SubscriptionList from './components/SubscriptionList.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path:"/",
        element: <SubscriptionList/>
      },
      {
        path:"/add",
        element: <AddSubscription/>,
      },
      {
        path: "/report",
        element: <RevenueReport/>
      }
    ]
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
