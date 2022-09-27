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

    // ================================================================================
    // const [allHorarios, setAllHorarios]         = useState([]);
    const [horarios_prox, setHorarios_prox]     = useState([]);
    const [horarios_curso, setHorarios_curso]   = useState([]);
    // ================================================================================
    const horariosRef   = collection(db, "Horarios");
    // const horariosAproxLimit = query(horariosRef, orderBy("date_of_travel", "asc"));
    // const horariosAproxLimit = query(horariosRef, where("state", "==", true), where("type_of_trip", "==", "1"), orderBy("date_of_travel", "asc"));
    const horariosAproxLimit = query(horariosRef, where("type_of_trip", "==", "1"), orderBy("date_of_travel", "asc"));
    const horariosCursoLimit = query(horariosRef, where("type_of_trip", "==", "2"), orderBy("date_of_travel", "asc"));
    // ================================================================================

    // UseEffect - LLamando a los viajes proximos
    useEffect(() => { 
        const getHorariosProx = async () => {
            const horarios_prox = [];
            const querySnapshot = await getDocs(horariosAproxLimit);
            querySnapshot.forEach((doc) => {
                const { correo_del_admin, date_of_travel, id_user, state, type_of_trip, } = doc.data();
                horarios_prox.push({
                    id: doc.id, correo_del_admin, date_of_travel, id_user, state, type_of_trip,
                }); // Cierre del push
            }); // Cierre del forEach
            setHorarios_prox(horarios_prox);
        }; // Cierre de la función getAllHorarios
        getHorariosProx();
    }, []); // Cierre del useEffect

    // UseEffect - LLamando a los viajes en curso
    useEffect(() => { 
        const getHorariosCurso = async () => {
            const horarios_curso = [];
            const querySnapshot = await getDocs(horariosCursoLimit);
            querySnapshot.forEach((doc) => {
                const { correo_del_admin, date_of_travel, id_user, state, type_of_trip, } = doc.data();
                horarios_curso.push({
                    id: doc.id, correo_del_admin, date_of_travel, id_user, state, type_of_trip,
                }); // Cierre del push
            }); // Cierre del forEach
            setHorarios_curso(horarios_curso);
        }; // Cierre de la función getAllHorarios
        getHorariosCurso();
    }, []); // Cierre del useEffect

  return (
    // <Text>SchedulesScreenMain</Text>

    <ScrollView>

        <Text style={{ paddingHorizontal: 5, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}></Text>

        <View style={{ paddingHorizontal: 20, paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button color={"red"}   title="Viajes a confirmar"  onPress={ () => { props.navigation.navigate("SchedulesScreenUpcoming")} } />
          <Button color={"green"} title="Viajes en progreso"  onPress={ () => { props.navigation.navigate("SchedulesScreenInCourse")} } />
        </View>

        {/* .Map - Viajes proximos */}
        {
            horarios_prox.map((horarioprox) => {
                return(
                    <ListItem key={horarioprox.id} bottomDivider>
                        <Avatar icon={{ name: "bus-outline", type: "ionicon", color: "red" }} size="large" />
                        <ListItem.Content>
                            <ListItem.Title>
                                {"Conductor: "}{horarioprox.correo_del_admin}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                {"Identificacion:"} {horarioprox.id_user}
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                                {"Hora de partida:"} {moment(horarioprox.date_of_travel.toDate()).format('lll')}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )
            })
        }

        {/* .Map - Viajes curso */}
        {
            horarios_curso.map((horariocurso) => {
                return(
                    <ListItem key={horariocurso.id} bottomDivider onPress={() => {props.navigation.navigate("Test", { id: horariocurso.id })}}>
                        <Avatar icon={{ name: "bus-outline", type: "ionicon", color: "green" }} size="large" />
                        <ListItem.Content>
                            <ListItem.Title>
                                {"Conductor: "}{horariocurso.correo_del_admin}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                {"Identificacion:"} {horariocurso.id_user}
                            </ListItem.Subtitle>
                            <ListItem.Subtitle>
                                {"Hora de partida:"} {moment(horariocurso.date_of_travel.toDate()).format('lll')}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )
            })
        }

    </ScrollView>

  )
}

export default SchedulesScreenMain;
