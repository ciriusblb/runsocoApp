import React, { useState, useEffect } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";

//axios
import axios from 'axios'

//api
import {API} from '../../utils/Consts'

//componentes
import InfoUser from "../../components/Account/InfoUser";
import Loading from "../../components/Loading";

function UserLogged(props) {
  const {navigation} = props

  // const [userInfo, setUserInfo] = useState({});
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");


  // const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");


  useEffect(() => {
    AsyncStorage.getItem('email').then(
      value =>{
        setEmail(value)
      }
    )
    // setReloadData(false);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('token').then(
      value =>{
        setToken(value)
      }
    )
    // setReloadData(false);
  }, []);


  async function logOut() {
    try {
      console.log("cerrando session")
      setIsLoading(true)
      const res = await axios.get(`${API}/auth/logout`, {
          headers: {
              'Authorization': `Bearer ${token}`,
          }
      })
      console.log("res ", res)
      setIsLoading(false)

      await AsyncStorage.removeItem('email')
      await AsyncStorage.removeItem('_id')
      await AsyncStorage.removeItem('token')
      console.log("session cerrada")
      navigation.navigate("Index")
    } catch(error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <View style={styles.viewUserInfo}>
      <InfoUser
        // userInfo={userInfo}
        email={email}
        // setReloadData={setReloadData}
        setIsLoading={setIsLoading}
        // setTextLoading={setTextLoading}
      />
      {/* <AccountOptions
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
      /> */}

      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={logOut}
      />

      <Loading text="cerrando sesión" isVisible={isLoading} />
    </View>
  );
}
export default UserLogged
const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "rgba(34, 181, 110, 0.1)"
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10
  },
  btnCloseSessionText: {
    color: "#00a680"
  }
});