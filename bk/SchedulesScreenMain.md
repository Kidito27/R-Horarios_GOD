import React, {useEffect, useState} from 'react'

// Invocando componentes de react
import { ScrollView, View, Text, Button } from "react-native";

// Invocando componentes para mostrar los datos
import { ListItem, Avatar } from "react-native-elements";
import moment from "moment";

// Importando la base de datos
import { db } from "../../../backend/firebase";
import { collection, doc, getDocs, where, orderBy, query } from 'firebase/firestore';

// CUIDADO CON EL PROPS EN ESTE LUGAR
const SchedulesScreenMain = (props) => {

    const [allHorarios, setAllHorarios] = useState([]);

    const horariosRef = collection(db, "Horarios");

    const horariosLimit = query(horariosRef, where("type_of_trip", "==", "1"), orderBy("date_of_travel", "asc"));

    useEffect(() => { 
        const getAllHorarios = async () => {
            const allHorarios = [];
            const querySnapshot = await getDocs(horariosLimit);
            querySnapshot.forEach((doc) => {
                const { correo_del_admin, date_of_travel, id_user, state, type_of_trip, } = doc.data();
                allHorarios.push({
                    id: doc.id, correo_del_admin, date_of_travel, id_user, state, type_of_trip,
                }); // Cierre del push
            }); // Cierre del forEach
            setAllHorarios(allHorarios);
        }; // Cierre de la función getAllHorarios
        getAllHorarios();
    }, []); // Cierre del useEffect

  return (

    <ScrollView>
        
        <Text style={{ paddingHorizontal: 5, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}></Text>

        <View style={{ paddingHorizontal: 20, paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button color={"red"}   title="Viajes a confirmar"  onPress={ () => { props.navigation.navigate("SchedulesScreenUpcoming") } } />
            <Button color={"green"} title="Viajes en progreso"  onPress={ () => { props.navigation.navigate("SchedulesScreenInCourse")} } />
        </View>

        {
            allHorarios.map((horario) => {
                return (
                    // FALTA PONER EL ONPRESS PARA QUE REDIRECCIONE A LA PANTALLA DE SCHEDULESSCREENSTATES
                    <ListItem key={horario.id} bottomDivider>                   
                        <Avatar icon={{ name: "bus-outline", type: "ionicon", color: "green" }} size="large" />
                        <ListItem.Content>
                            <ListItem.Title>
                                {"Conductor: "}{horario.correo_del_admin}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                {"Identificacion:"} {horario.id_user}
                            </ListItem.Subtitle>
                            {/* <ListItem.Subtitle>
                                {"Hora de partida:"} {moment(horario.date_of_travel.toDate()).format('lll')}
                            </ListItem.Subtitle> */}
                        </ListItem.Content>
                    </ListItem> // Cierre del ListItem
                ) // Cierre del return
            })
        }

    </ScrollView>


  );
};

export default SchedulesScreenMain;