import AppRouter from './components/AppRouter';
import Header from './components/molecules/Header';
import { AuthProvider } from './contexts/AuthContextType';

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
