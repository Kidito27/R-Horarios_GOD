import React, {useEffect, useState} from 'react'

// Invocando componentes de react
import { ScrollView, View, Text, Button } from "react-native";

// Invocando componentes para mostrar los datos
import { ListItem, Avatar } from "react-native-elements";
import moment from "moment";

// Importando la base de datos
import { db } from "../../../../backend/firebase";
import { collection, doc, getDocs, where, orderBy, query } from 'firebase/firestore';

const SchedulesScreenUpcoming = (props) => {

  // ================================================================================
  const [horarios_comin_ida, setHorarios_comin_ida]   = useState([]);
  const [horarios_comin_ret, setHorarios_comin_ret]   = useState([]);
  // ================================================================================
  const horariosRef           = collection(db, "Horarios");
  const horariosCursoIda      = query(horariosRef, where("state", "==", false), where("type_of_trip", "==", "1"), orderBy("date_of_travel", "asc"));
  const horariosCursoRetorno  = query(horariosRef, where("state", "==", false), where("type_of_trip", "==", "2"), orderBy("date_of_travel", "asc"));
  // ================================================================================

  // UseEffect - LLamando a los viajes proximos ida
  useEffect(() => { 
      const getcominIda = async () => {
          const horarios_comin_ida = [];
          const querySnapshot = await getDocs(horariosCursoIda);
          querySnapshot.forEach((doc) => {
              const { correo_del_admin, date_of_travel, id_user, state, type_of_trip, } = doc.data();
              horarios_comin_ida.push({
                  id: doc.id, correo_del_admin, date_of_travel, id_user, state, type_of_trip,
              }); // Cierre del push
          }); // Cierre del forEach
          setHorarios_comin_ida(horarios_comin_ida);
      }; // Cierre de la función getAllHorarios
      getcominIda();
  }, []); // Cierre del useEffect

  // UseEffect - LLamando a los viajes en curso
  useEffect(() => { 
      const getcominRetorno = async () => {
          const horarios_comin_ret = [];
          const querySnapshot = await getDocs(horariosCursoRetorno);
          querySnapshot.forEach((doc) => {
              const { correo_del_admin, date_of_travel, id_user, state, type_of_trip, } = doc.data();
              horarios_comin_ret.push({
                  id: doc.id, correo_del_admin, date_of_travel, id_user, state, type_of_trip,
              }); // Cierre del push
          }); // Cierre del forEach
          setHorarios_comin_ret(horarios_comin_ret);
      }; // Cierre de la función getAllHorarios
      getcominRetorno();
  }, []); // Cierre del useEffect

return (
  // <Text>SchedulesScreenMain</Text>

  <ScrollView>

      <Text style={{ paddingHorizontal: 5, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}></Text>

      <View style={{ paddingHorizontal: 20, paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button color={"green"}     title="Viajes en progreso"  onPress={ () => { props.navigation.navigate("SchedulesScreenInCourse")} } />
        <Button color={"lightblue"} title="Todos los Viajes"    onPress={ () => { props.navigation.navigate("SchedulesScreenMain")} } />
      </View>

      {/* <Text style={{ paddingHorizontal: 5, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}></Text> */}

      {/* .Map - Viajes curso ida */}
      {
          horarios_comin_ida.map((horariocominida) => {
              return(
                  <ListItem key={horariocominida.id} bottomDivider>
                      <Avatar icon={{ name: "bus-outline", type: "ionicon", color: "red" }} size="large" />
                      <ListItem.Content>
                          <ListItem.Title>
                              {"Conductor: "}{horariocominida.correo_del_admin}
                          </ListItem.Title>
                          <ListItem.Subtitle>
                              {"Identificacion:"} {horariocominida.id_user}
                          </ListItem.Subtitle>
                          <ListItem.Subtitle>
                              {"Hora de partida:"} {moment(horariocominida.date_of_travel.toDate()).format('lll')}
                          </ListItem.Subtitle>
                      </ListItem.Content>
                  </ListItem>
              )
          })
      }

      {/* .Map - Viajes curso retorno */}
      {
          horarios_comin_ret.map((horariocominret) => {
              return(
                  <ListItem key={horariocominret.id} bottomDivider>
                      <Avatar icon={{ name: "bus-outline", type: "ionicon", color: "red" }} size="large" />
                      <ListItem.Content>
                          <ListItem.Title>
                              {"Conductor: "}{horariocominret.correo_del_admin}
                          </ListItem.Title>
                          <ListItem.Subtitle>
                              {"Identificacion:"} {horariocominret.id_user}
                          </ListItem.Subtitle>
                          <ListItem.Subtitle>
                              {"Hora de partida:"} {moment(horariocominret.date_of_travel.toDate()).format('lll')}
                          </ListItem.Subtitle>
                      </ListItem.Content>
                  </ListItem>
              )
          })
      }

  </ScrollView>

)
}

export default SchedulesScreenUpcoming