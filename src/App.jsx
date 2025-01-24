import { useState } from 'react';
import './App.css';
import BookCatalog from './components/cat';
import AuthModals from './components/modals';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
    
  };

  return (
    <>
      {user ? (
        <BookCatalog username={user} />
      ) : (
        <AuthModals onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;