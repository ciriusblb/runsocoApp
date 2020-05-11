import React, { useState } from "react";
import { StyleSheet, View, AsyncStorage, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

//axios
import axios from 'axios'

//validacioones
import { validateEmail } from "../../utils/Validation";

//api
import {API} from '../../utils/Consts'

//componentes
import Loading from "../Loading";

function LoginForm(props) {
  const { toastRef, navigation } = props;

  const [hidePassword, setHidePassword] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [textError, setTextError] = useState("");


  
  async function login() {
    try {
      if(!email){
        setEmailError("El campo correo electrónico es requerido")
      } else if(!password){
        setPasswordError("El campo contraseña es requerido")
      } else if (!validateEmail(email)) {
        setEmailError("El correo electrónico es incorrecto")
      } else {
        console.log("---------------------------- Iniciando sesión")
        setIsVisibleLoading(true)
        const res = await axios.post(`${API}/auth/login`, {
          email,
          password,
        })
        await AsyncStorage.setItem('token', res.data.token)
        await AsyncStorage.setItem('_id', res.data.data._id)
        await AsyncStorage.setItem('email', email)
        setIsVisibleLoading(false)
        navigation.navigate("Mi cuenta")
      }
      setIsVisibleLoading(false)
    } catch (error) {
      setIsVisibleLoading(false)
      setTextError(error.response.data.message)
      // toastRef.current.show("Error: "+error.response.data.message, 1000);
    }
  }

  return (
    <View style={styles.formContainer}>
      <Input
        label="Correo electrónico"
        labelStyle={styles.labelColor}
        placeholder="Correo electronico"
        errorStyle={{ color: '#dc3545' }}
        errorMessage={emailError}
        containerStyle={styles.inputForm}
        onChange={e => {setEmail(e.nativeEvent.text); setEmailError(""); setTextError("")}}
        leftIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconLeft}
          />
        }
      />
      <Input
        label="Contraseña"
        labelStyle={styles.labelColor}
        placeholder="Contraseña"
        errorStyle={{ color: '#dc3545' }}
        errorMessage={passwordError}
        password={true}
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        onChange={e => {setPassword(e.nativeEvent.text); setPasswordError(""); setTextError("")}}
        leftIcon={
            <Icon
              type="material-community"
              name="lock"
              iconStyle={styles.iconLeft}
            />
        }
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Text style={styles.textError}>{textError}</Text>
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={login}
      />
      
      <Loading isVisible={isVisibleLoading} text="Iniciando sesión" />
    </View>
  );
}
export default LoginForm

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 5
  },
  labelColor: {
    color: "#0E134F"
  },
  iconRight: {
    color: "#c1c1c1"
  },
  iconLeft: {
    color: "#c1c1c1"
  },
  textError:{
    marginTop: 5,
    color: '#dc3545'
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "70%"
  },
  btnLogin: {
    backgroundColor: "#00a680"
  }
});