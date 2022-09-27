// import { StyleSheet, Text, View } from "react-native";

// // Importamos el modulo que nos permite trabajar en pantallas.
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();

// // Importamos los componentes creados
// import SchedulesScreenMain      from "./SchedulesScreenMain";
// import SchedulesScreenInCourse  from "./SchedulesScreenStates/SchedulesScreenInCourse";
// import SchedulesScreenUpcoming  from "./SchedulesScreenStates/SchedulesScreenUpcoming";


// // Funcion que tendra las multiples pantallas

// function MyStackv2() {
//   return (
//     // El orden en el que se coloquen determinara el orden en el que se presenta "renderizar" al usuario 
//     <Stack.Navigator>
//         <Stack.Screen name="SchedulesScreenMain"      component={SchedulesScreenMain}     options={{title: "Horarios - Viajes."}} />
//         <Stack.Screen name="SchedulesScreenInCourse"  component={SchedulesScreenInCourse} options={{title: "Horarios - Viajes en progreso."}} />
//         <Stack.Screen name="SchedulesScreenUpcoming"  component={SchedulesScreenUpcoming} options={{title: "Horarios - Viajes próximos."}} />
//     </Stack.Navigator>
//   );
// }

// export default function SchedulesScreenRoute() {
//   return (
//     // Invocamos al contenedor que tendra nuestras pantallas
//     <NavigationContainer>
//       <MyStackv2 />
//     </NavigationContainer>
//   );
// }

// // Apartado de Estilos
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });