import AppRouter from './components/AppRouter';
import { AuthProvider } from './contexts/AuthContextType';
import Header from './components/Header';

const App = () => {
    return (
      <>
      <AuthProvider>
      <Header />
      <AppRouter/>
      </AuthProvider>
      </>
    );
};

export default App;
