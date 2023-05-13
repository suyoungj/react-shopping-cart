import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { worker } from './mocks/browser';
import App from './App';
import GlobalStyle from './GlobalStyle';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RecoilRoot>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>,
);
