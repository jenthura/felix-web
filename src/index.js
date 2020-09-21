import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { AlertsProvider } from './contexts/AlertsContext';
import { TransactionsProvider } from './contexts/TransactionsContext';
import { GoalsProvider } from './contexts/GoalsContext';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import App from './components/App/App';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
        <TransactionsProvider>
          <UserProvider>
            <GoalsProvider>
              <App />
            </GoalsProvider>
          </UserProvider>
        </TransactionsProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);