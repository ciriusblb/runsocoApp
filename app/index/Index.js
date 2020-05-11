import React, {useState, useEffect} from 'react';
import { Text, AsyncStorage } from "react-native";

import Loading from '../components/Loading'
import UserGuest from './UserGuest'
// import UserLogged from './UserLogged'


export default function MyAccount({navigation}) {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchUserGuest() {
      try {
        setIsLoading(true)
        await AsyncStorage.getItem('email').then(
          value =>{
            if(value){
              setIsLoading(false)
              navigation.navigate("Mi cuenta")
            }else {
              setIsLoading(false)
            }
          }
        )
      } catch (e) {
        setIsLoading(false)
        console.log(e);
      }
    }
    fetchUserGuest()
  }, [])

  if (isLoading === true) {
    return (
      <Loading isVisible={true} text="Cargando..." /> 
    );
  }
  return (
    <UserGuest navigation={navigation} />
  );
}