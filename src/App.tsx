import React from 'react';
import { Provider } from 'react-redux';
import Container from './components/Container';
import { store } from './redux/app/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Result from './components/Result';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "quiz",
      element: <Container />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "results",
      element: <Result />,
      // errorElement: <ErrorPage />,
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  );
}

export default App;
