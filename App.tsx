import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Routes from './src/routes';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  );
}

export default App;
