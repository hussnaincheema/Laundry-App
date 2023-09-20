import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from "./Redux/Store/Store";
import AuthNavigation from './Navigation/AuthNavigation';
import StackNavigation from "./Navigation/StackNavigation";
import { useState } from 'react';

export default function App() {

  const [isLogged, setIsLogged] = useState(true);

  return (
    <Provider store={store}>
      {
        isLogged ? <StackNavigation /> : <AuthNavigation />
      }
      <StatusBar style="auto" />
    </Provider>

  );
}


