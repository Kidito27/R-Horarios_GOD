import React, { useEffect, useState } from "react";

// Invocando componentes de react
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
} from "react-native";

// Invocando componentes para mostrar los datos
import { ListItem, Avatar } from "react-native-elements";
import moment from "moment";

// Importando la base de datos
import { db } from "../../../backend/firebase";
import {
  collection,
  doc,
  getDocs,
  where,
  orderBy,
  query,
} from "firebase/firestore";

// CUIDADO CON EL PROPS EN ESTE LUGAR
const SchedulesScreenMain = (props) => {
  // ================================================================================
  const [horarios_prox, setHorarios_prox] = useState([]);
  const [horarios_curso_ida, setHorarios_curso_ida] = useState([]);
  const [horarios_curso_ret, setHorarios_curso_ret] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShow2, setShouldShow2] = useState(false);

  const horariosRef = collection(db, "Horarios");
  const horariosAproxLimit = query(
    horariosRef,
    where("type_of_trip", "==", "1"),
    orderBy("date_of_travel", "asc")
  );
  const horariosCursoIda = query(
    horariosRef,
    where("state", "==", true),
    where("type_of_trip", "==", "1"),
    orderBy("date_of_travel", "asc")
  );
  const horariosCursoRetorno = query(
    horariosRef,
    where("state", "==", true),
    where("type_of_trip", "==", "2"),
    orderBy("date_of_travel", "asc")
  );
  // ================================================================================

  // UseEffect - LLamando a los viajes proximos
  useEffect(() => {
    const getHorariosProx = async () => {
      const horarios_prox = [];
      const querySnapshot = await getDocs(horariosAproxLimit);
      querySnapshot.forEach((doc) => {
        const {
          correo_del_admin,
          date_of_travel,
          id_user,
          state,
          type_of_trip,
        } = doc.data();
        horarios_prox.push({
          id: doc.id,
          correo_del_admin,
          date_of_travel,
          id_user,
          state,
          type_of_trip,
        }); // Cierre del push
      }); // Cierre del forEach
      setHorarios_prox(horarios_prox);
    }; // Cierre de la funci??n getAllHorarios
    getHorariosProx();
  }, []); // Cierre del useEffect

  // UseEffect - LLamando a los viajes proximos ida
  useEffect(() => {
    const getIda = async () => {
      const horarios_curso_ida = [];
      const querySnapshot = await getDocs(horariosCursoIda);
      querySnapshot.forEach((doc) => {
        const {
          correo_del_admin,
          date_of_travel,
          id_user,
          state,
          type_of_trip,
        } = doc.data();
        horarios_curso_ida.push({
          id: doc.id,
          correo_del_admin,
          date_of_travel,
          id_user,
          state,
          type_of_trip,
        }); // Cierre del push
      }); // Cierre del forEach
      setHorarios_curso_ida(horarios_curso_ida);
    }; // Cierre de la funci??n getAllHorarios
    getIda();
  }, []); // Cierre del useEffect

  // UseEffect - LLamando a los viajes en curso
  useEffect(() => {
    const getRetorno = async () => {
      const horarios_curso_ret = [];
      const querySnapshot = await getDocs(horariosCursoRetorno);
      querySnapshot.forEach((doc) => {
        const {
          correo_del_admin,
          date_of_travel,
          id_user,
          state,
          type_of_trip,
        } = doc.data();
        horarios_curso_ret.push({
          id: doc.id,
          correo_del_admin,
          date_of_travel,
          id_user,
          state,
          type_of_trip,
        }); // Cierre del push
      }); // Cierre del forEach
      setHorarios_curso_ret(horarios_curso_ret);
    }; // Cierre de la funci??n getAllHorarios
    getRetorno();
  }, []); // Cierre del useEffect

  return (
    <ScrollView>
      <Text
        style={{
          paddingHorizontal: 5,
          paddingVertical: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      ></Text>

      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            color={"red"}
            title="Viajes a confirmar"
            onPress={() => {
              setShouldShow(!shouldShow);
              setShouldShow2(false);
            }}
          ></Button>

          <Button
            color={"green"}
            title="Viajes en progreso"
            onPress={() => {
              setShouldShow2(!shouldShow2);
              setShouldShow(false);
            }}
          ></Button>
        </View>

        <Text style={{ textAlign: "center", fontSize: 20, padding: 20 }}>
          Horarios
        </Text>

        {shouldShow ? (
          <View>
            {horarios_prox.map((horarioprox) => {
              return (
                <ListItem key={horarioprox.id} bottomDivider>
                  <Avatar
                    icon={{
                      name: "bus-outline",
                      type: "ionicon",
                      color: "red",
                    }}
                    size="large"
                  />
                  <ListItem.Content>
                    <ListItem.Title>
                      {"Conductor: "}
                      {horarioprox.correo_del_admin}
                    </ListItem.Title>

                    <ListItem.Subtitle>
                      {"Identificacion:"} {horarioprox.id_user}
                    </ListItem.Subtitle>

                    <ListItem.Subtitle>
                      {"Hora de partida:"}{" "}
                      {moment(horarioprox.date_of_travel.toDate()).format(
                        "lll"
                      )}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })}
          </View>
        ) : null}

        {shouldShow2 ? (
          <View>
            {horarios_curso_ida.map((horariocursoida) => {
              return (
                <ListItem
                  key={horariocursoida.id}
                  bottomDivider
                  onPress={() => {
                    props.navigation.navigate("Test", {
                      id: horariocursoida.id,
                    });
                  }}
                >
                  <Avatar
                    icon={{
                      name: "bus-outline",
                      type: "ionicon",
                      color: "green",
                    }}
                    size="large"
                  />
                  <ListItem.Content>
                    <ListItem.Title>
                      {"Conductor: "}
                      {horariocursoida.correo_del_admin}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      {"Identificacion:"} {horariocursoida.id_user}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      {"Hora de partida:"}{" "}
                      {moment(horariocursoida.date_of_travel.toDate()).format(
                        "lll"
                      )}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })}

            {/* .Map - Viajes curso retorno */}
            {horarios_curso_ret.map((horariocursoret) => {
              return (
                <ListItem
                  key={horariocursoret.id}
                  bottomDivider
                  onPress={() => {
                    props.navigation.navigate("Test", {
                      id: horariocursoret.id,
                    });
                  }}
                >
                  <Avatar
                    icon={{
                      name: "bus-outline",
                      type: "ionicon",
                      color: "orange",
                    }}
                    size="large"
                  />
                  <ListItem.Content>
                    <ListItem.Title>
                      {"Conductor: "}
                      {horariocursoret.correo_del_admin}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      {"Identificacion:"} {horariocursoret.id_user}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      {"Hora de partida:"}{" "}
                      {moment(horariocursoret.date_of_travel.toDate()).format(
                        "lll"
                      )}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              );
            })}
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
};

export default SchedulesScreenMain;
