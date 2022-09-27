import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens for the bottom tab navigator
import HomeScreen             from '../../screens/DualScreen/HomeScreen';
import SettingsScreen         from '../../screens/SettingsScreen';
import NavigatorDriverScreen  from '../../screens/DriverScreen/NavigatorDriverScreen';
// import SchedulesScreen from '../../screens/DualScreen/SchedulesScreen';

// Importamos los componentes creados
// import SchedulesScreenMain      from "../../screens/DualScreen/SchedulesScreens/SchedulesScreenMain";
// import SchedulesScreenInCourse  from "../../screens/DualScreen/SchedulesScreens/SchedulesScreenStates/SchedulesScreenInCourse";
// import SchedulesScreenUpcoming  from "../../screens/DualScreen/SchedulesScreens/SchedulesScreenStates/SchedulesScreenUpcoming";

// import SchedulesScreenMain  from '../../screens/DualScreen/SchedulesScreens/SchedulesScreenMain';
// import SchedulesScreenRoute from '../../screens/DualScreen/SchedulesScreens/SchedulesScreenRoute';

const NavigationDriver = () => {

  const Nav = createBottomTabNavigator();

  return (
    <Nav.Navigator>

      {/* <Nav.Screen name="Schedules"  component={SchedulesScreen} /> */}


      <Nav.Screen name="Home"       component={HomeScreen} />
      <Nav.Screen name="Settings"   component={SettingsScreen} />
      <Nav.Screen name="Navigation" component={NavigatorDriverScreen} />

      {/* <Nav.Screen name="SchedulesScreenMain"      component={SchedulesScreenMain} />
      <Nav.Screen name="SchedulesScreenInCourse"  component={SchedulesScreenInCourse} />
      <Nav.Screen name="SchedulesScreenUpcoming"  component={SchedulesScreenUpcoming} /> */}

      {/* <Nav.Screen name="SchedulesScreenRoute" component={SchedulesScreenRoute} /> */}

    </Nav.Navigator>
  )
}

export default NavigationDriver