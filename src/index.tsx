
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserHistory } from "history";
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { SpotifyProvider } from './hooks/useSpotify';
import { QueryClient, QueryClientProvider } from 'react-query';


const history = createBrowserHistory();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

root.render(
  <StrictMode>
    <HistoryRouter history={history}>
      <SpotifyProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SpotifyProvider>
    </HistoryRouter  >
  </StrictMode>);



