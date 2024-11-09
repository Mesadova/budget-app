import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import MainPage from './components/MainPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <MainPage />
      </div>
    ),
  },
  {
    path: "home",
    element: (
      <div>
        <App />
      </div>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
