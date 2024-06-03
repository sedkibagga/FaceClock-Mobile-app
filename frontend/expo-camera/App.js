import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Faces from './pages/Faces';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PersonsFiltred from './pages/PersonsFiltred';
import { MyContextProvider } from './components/FaceContext';
import RejectList from './pages/RejectList';
import PassList from './pages/PassList';
import PassListFiltred from './pages/PassListFiltred';
import RejectListFiltred from './pages/RejectListFiltred';
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <MyContextProvider> 
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
              <Stack.Screen name="Faces" component={Faces} options={{ headerShown: false }} />
              <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
              <Stack.Screen name="PassList" component={PassList} options={{ headerShown: false }} />
              <Stack.Screen name="RejectList" component={RejectList} options={{ headerShown: false }} />
              <Stack.Screen name="PassListFiltred" component={PassListFiltred} options={{ headerShown: false }} />
              <Stack.Screen name="RejectListFiltred" component={RejectListFiltred} options={{ headerShown: false }} />


              <Stack.Screen
                name="PersonsFiltred"
                component={PersonsFiltred}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </MyContextProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default App;
