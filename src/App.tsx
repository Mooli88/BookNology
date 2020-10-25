import React from 'react';
import { useStore } from 'react-hookstore';
import Login from './components/Login/Login';
import MyLibrary from './components/MyLibrary/MyLibrary';
import { IUser } from './types/user';

function App() {
  const [user] = useStore<IUser>('user');

  return user.token ? <MyLibrary></MyLibrary> : <Login />;
}

export default App;
