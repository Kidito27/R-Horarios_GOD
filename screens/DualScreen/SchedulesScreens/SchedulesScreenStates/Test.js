import React, { useState, useEffect } from "react";

// Importando la base de datos
import { db } from "../../../../backend/firebase";
import { collection, doc, getDocs, where, orderBy, query, getDoc } from 'firebase/firestore';

// Invocando componentes de react
import { Alert, ActivityIndicator, View, Button, TextInput, ScrollView, StyleSheet, Text } from "react-native";

const Test = (props) => {

    const initialState = {
        id: "",
        correo_del_admin: "",
        date_of_travel: "",
        id_user: "",
        state: "",
        type_of_trip: "",
    }

    const [horarioSelected, setHorarioSelected] = useState(initialState);

    const getUsuarioSelected = async (id) => {
        const docHorarioSelectedRef     = doc(db, "Horarios", id); // Esto se cambia dependiendo donde se encuentre el documento a invocar
        const docHorarioSelectedSnap    = await getDoc(docHorarioSelectedRef);
        const horarioSelected           = docHorarioSelectedSnap.data();
        // console.log(horarioSelected);
        // console.log(docHorarioSelectedSnap.data());
        setHorarioSelected({
            ...horarioSelected, id: docHorarioSelectedSnap.id
        });
    };
    
    useEffect(() => {
        getUsuarioSelected(props.route.params.id);
    }, []);

    // Formulario para manejar los datos que se pasaron por la id del horario seleccionado
  return (
    <ScrollView style={styles.container}>

        <View style={styles.inputGroup}>
            <TextInput placeholder="Correo del admin" value={horarioSelected.correo_del_admin} />
        </View>

        <View style={styles.inputGroup}>
            <TextInput placeholder="Date of travel" value={horarioSelected.date_of_travel} />
        </View>

        <View style={styles.inputGroup}>
            <TextInput placeholder="Id user" value={horarioSelected.id_user} />
        </View>

        <View style={styles.inputGroup}>
            <TextInput placeholder="State" value={horarioSelected.state} />
        </View>

        <View style={styles.inputGroup}>
            <TextInput placeholder="Type of trip" value={horarioSelected.type_of_trip} />
        </View>

    </ScrollView>
  )
}

// Apartado de Estilos
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
    },
  
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 40,
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
    },
  });


export default Test