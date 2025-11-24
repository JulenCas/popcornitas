import './App.css';
import { MovieProvider } from './context/MovieContext';
import { AppContent } from './AppContent';

function App() {
  return (
    <MovieProvider>
      <AppContent />
    </MovieProvider>
  );
}

export default App;