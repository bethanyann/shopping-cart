import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider} from 'react-query';

const client = new QueryClient();

ReactDOM.render(
  //remove React.StrictMode because it will throw a warning in the console with styles
  <QueryClientProvider client={client}>
      <App />
  </QueryClientProvider>,
   document.getElementById('root')
);

