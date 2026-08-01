import Home from './pages/Home';
import Connection from './pages/Connection'
import Dashboard from './pages/Dashboard';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { userAuth } from './services/auth.service';
import { dashboardAction } from './services/project.service'
import './App.css'
//import Akuvi from './pages/Akuvi';
import Explore from './pages/Explore';
import Terms from './pages/TS';
import slugify from 'slugify';
import Privacy from './pages/Privacy';
import { initCSRF } from './services/csrf.service'
import { dashboardLoader } from './services/dashboard.loader.service';
import { Details } from './pages/Details';
import Contact from './pages/Contact';
import ErrorPage from './pages/ErrorPage';
import { logClientError } from './services/errorLogger.service';

const refPath = window.location.pathname
const newRefPath = refPath as string
const projectRaw = newRefPath.split('/')[2];

// 2. On n'appelle slugify que si projectRaw existe, sinon on met une chaîne vide ou une valeur par défaut
const slugProject = projectRaw ? slugify(decodeURIComponent(projectRaw), {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: false,
    locale: 'en',
    trim: true
}) : '';

const errorAction = async ({ request }: { request: Request }) => {
  try {
    const error = new Error(`Route error on ${request.method} ${new URL(request.url).pathname}`);
    await logClientError(error, {
      route: new URL(request.url).pathname,
      method: request.method,
    });
  } catch (logError) {
    console.log('Failed to log route error', logError);
    console.error('Failed to log route error', logError);
  }

  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    loader: initCSRF,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,         // remplace path: "/"
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      /*{
        path: "ai-explore",
        element: <Akuvi />,
      },*/
      {
        path: `project/${slugProject}`,
        element: <Details />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "signin/",
        element: <Connection />,
        action: userAuth,
      },
      {
        path: "signup/",
        element: <Connection />,
        action: userAuth,
      },
      {
        path: "dashboard/",
        element: <Dashboard />,
        action: dashboardAction,
        loader: dashboardLoader,
      },
      {
        path: "*",
        action: errorAction,
        element: <ErrorPage />,
      },
    ],
  },
  {/*
    path: "/",
    element: <Home/>,
    loader: initCSRF,
    errorElement: <ErrorPage/>
  },
  {
    path: "/contact",
    element: <Contact/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/explore",
    element: <Explore/>,
    errorElement: <ErrorPage />
  },
  {
    path: `/project/${slugProject}`,
    element: <Details/>,
    errorElement: <ErrorPage />
  },
  {
    path: "/terms",
    element: <Terms/>
  },
  {
    path: "/privacy",
    element: <Privacy/>
  },
  {
    path: "signin/",
    element: <Connection/>,
    action: userAuth,
    errorElement: <ErrorPage />
  },
  {
    path: "signup/",
    element:<Connection />,
    action: userAuth,
    errorElement: <ErrorPage />
  },
  {
    path: "dashboard/",
    element: <Dashboard />,
    action: dashboardAction,
    loader: dashboardLoader,
    errorElement: <ErrorPage />
  },
  {
    path: "*",
    element: <ErrorPage />
  */}
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;