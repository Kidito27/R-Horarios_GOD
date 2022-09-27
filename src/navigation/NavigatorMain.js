import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import {auth} from '../../backend/firebase';

import LoginScreen      from '../../screens/DualScreen/LoginScreen';
import NavigationUser   from './NavigationUser';
import StackScreen      from '../../screens/DualScreen/ChanguePasswordScreen';
import NavigationDriver from './NavigationDriver';

// Importamos los componentes creados
import SchedulesScreenMain      from "../../screens/DualScreen/SchedulesScreens/SchedulesScreenMain";
import SchedulesScreenInCourse  from "../../screens/DualScreen/SchedulesScreens/SchedulesScreenStates/SchedulesScreenInCourse";
import SchedulesScreenUpcoming  from "../../screens/DualScreen/SchedulesScreens/SchedulesScreenStates/SchedulesScreenUpcoming";
import Test                     from '../../screens/DualScreen/SchedulesScreens/SchedulesScreenStates/Test';

const Stack = createNativeStackNavigator();

export default function NavigatorMain() {

    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login"          options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="User"           options={{headerShown: false}} component={NavigationUser} />
        <Stack.Screen name="ChangePassword" options={{headerShown: false}} component={StackScreen} /> 
        <Stack.Screen name="Driver"         options={{headerShown: false}} component={NavigationDriver} />



        <Stack.Screen name="SchedulesScreenMain"      options={{headerShown: false}} component={SchedulesScreenMain} />
        <Stack.Screen name="SchedulesScreenInCourse"  options={{headerShown: false}} component={SchedulesScreenInCourse} />
        <Stack.Screen name="SchedulesScreenUpcoming"  options={{headerShown: false}} component={SchedulesScreenUpcoming} />
        <Stack.Screen name="Test"                     options={{headerShown: false}} component={Test} />



      </Stack.Navigator>
    </NavigationContainer>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });