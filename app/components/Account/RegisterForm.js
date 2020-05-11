import React, { useState } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { Input, Icon, Button, CheckBox  } from "react-native-elements";

//axios
import axios from 'axios'

//validacioones
import { validateEmail } from "../../utils/Validation";

//components
import Loading from "../Loading";

//api
import {API} from '../../utils/Consts'


function RegisterForm(props) {

  const { navigation, toastRef } = props;
  const [hidePassword, setHidePassword] = useState(true);

  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [city, setCity] = useState("Puerto Maldonado");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // const inputEmailRef = createRef();


  async function register() {
    try {
      if(!name){
        setNameError("El campo nombre es requerido")
      } else if(!email){
        setEmailError("El campo correo electrónico es requerido")
      } else if(!password){
        setPasswordError("El campo contraseña es requerido")
      } else if (!terms) {
        toastRef.current.show("Acepte los terminos y condiciones.");
      } else if (!validateEmail(email)) {
        setEmailError("El correo electrónico es incorrecto")
      } else {
        console.log("---------------------------- registrando ----------------------------")
        setIsVisibleLoading(true)
        const res = await axios.post(`${API}/client/signIn`, {
          name,
          email,
          password,
          terms,
          city
        })
        console.log("res ", res.data.token)
        await AsyncStorage.setItem('token', res.data.token)
        await AsyncStorage.setItem('email', email)
        setIsVisibleLoading(false)
        navigation.navigate("Mi cuenta")
      }
      setIsVisibleLoading(false)
    } catch (error) {
      setIsVisibleLoading(false)
      setEmailError(error.response.data.message);
      // toastRef.current.show("Error: "+error.response.data.message, 1500)
      // inputEmailRef.current.clear()
    }
  }

  return (
    <View style={styles.formContainer}>
      <Input
        label="Nombre(s)"
        labelStyle={styles.labelColor}
        placeholder="Nombre(s)"
        errorStyle={{ color: '#dc3545' }}
        errorMessage={nameError}
        containerStyle={styles.inputForm}
        onChange={e => {setName(e.nativeEvent.text); setNameError("")} }
        leftIcon={
          <Icon
            type="material-community"
            name="account"
            iconStyle={styles.iconLeft}
          />
        }
      />
      <Input
        label="Correo electrónico"
        labelStyle={styles.labelColor}
        placeholder="Correo electronico"
        errorStyle={{ color: '#dc3545' }}
        errorMessage={emailError}
        containerStyle={styles.inputForm}
        // ref={inputEmailRef}
        onChange={e => {setEmail(e.nativeEvent.text); setEmailError("")}}
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
        onChange={e => {setPassword(e.nativeEvent.text); setPasswordError("")}}
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
      <CheckBox
        title='Acepto los terminos y condiciones'
        checked={terms}
        checkedColor='#00a680'
        containerStyle={{backgroundColor: "transparent"}}
        onPress={() => setTerms(!terms)}
        />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={register}
      />
      <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
    </View>
  );
}
export default RegisterForm

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  inputForm: {
    width: "100%",
    marginTop: 5
  },
  labelColor: {
    color: "#0E134F",
  },
  iconRight: {
    color: "#c1c1c1"
  },
  iconLeft: {
    color: "#c1c1c1"
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "70%"
  },
  btnRegister: {
    backgroundColor: "#00a680"
  }
});