import React, {useState, useEffect} from 'react';
import { AsyncStorage } from "react-native";
import UserLogged from './UserLogged'
import io from 'socket.io-client';

export default function MyAccount({navigation}) {

  const [client, setClient] = useState("")

  useEffect(() => {
    AsyncStorage.getItem('_id').then(
      value =>{
        setClient(value)
      }
    )
    const socket = io('https://bytecode-socket.herokuapp.com/sale',
    // {
      // timeout: 10000,
      // jsonp: false,
      // transports: ['websocket'],
    //   autoConnect: false,
    //   agent: '-',
    //   pfx: '-',
    //   cert: '-',
    //   ca: '-',
    //   ciphers: '-',
    //   rejectUnauthorized: '-',
    //   perMessageDeflate: '-'
    // }, 
    { forceNew: true , query:{
      id: client
    }});
    // socket.on('connect',function(){
    //   console.log("conectado")
    // })

    socket.on('refuse',function(data){
      console.log("MI PEDIDO HA SIDO RECHAZADO", data.id)
      AsyncStorage.removeItem('idSale')
      AsyncStorage.setItem('idSale', data.id)
    })

    socket.on('accept',function(data){
      console.log("MI PEDIDO HA SIDO ACEPTADO", data.id)
      AsyncStorage.removeItem('idSale')
      AsyncStorage.setItem('idSale', data.id)
    })
  
  }, [])

  return (
      <UserLogged navigation={navigation} />
  );
}