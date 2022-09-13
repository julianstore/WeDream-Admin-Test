import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { Provider } from 'react-redux';
import store, { history } from './store/store';
import AuthProvider from 'src/contexts/AuthProvider';

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <HelmetProvider>
        <SidebarProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SidebarProvider>
      </HelmetProvider>
    </AuthProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
