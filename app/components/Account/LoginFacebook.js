import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import { SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";

//axios
import axios from "axios";

//api
import {API} from '../../utils/Consts'
import { FacebookApi } from "../../utils/Social";

//componentes
import Loading from "../Loading";

export default function LoginFacebook(props) {
  const { toastRef, navigation } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [terms, setTerms] = useState(true);
  const [city, setCity] = useState("Puerto Maldonado");


  async function login() {
    try {
      await Facebook.initializeAsync(FacebookApi.application_id);
      const {
        type,
        token,
        // expires,
        // permissions,
        // declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        setIsLoading(true);
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
        const { id, name, email } = await response.json();
        console.log(id)

        const res = await axios.post(`${API}/auth/facebook`, {
          name,
          email,
          password: id,
          city,
          terms
        })
        
          await AsyncStorage.setItem('token', res.data.token)
          await AsyncStorage.setItem('_id', res.data.data._id)
          await AsyncStorage.setItem('email', email)
          setIsLoading(false)
          navigation.navigate("Mi cuenta")


      } else if (type === "cancel") {
            toastRef.current.show("Inicio de sesion cancelado");
        } else {
            toastRef.current.show("Error desconocido, intentelo más tarde");
        }
        setIsLoading(false);
    } catch ({ message }) {
      console.log("message ", message)
    }
  }


  return (
    <>
      <SocialIcon
        title="Iniciar sesión con Facebook"
        button
        type="facebook"
        onPress={login}
      />
      <Loading isVisible={isLoading} text="Iniciando sesión" />
    </>
  );
}