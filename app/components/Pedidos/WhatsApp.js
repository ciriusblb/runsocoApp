import React, { useState } from "react";
import { StyleSheet, View, Text, Linking } from "react-native";
import { Input, Button } from "react-native-elements";

export default function WhatSapp(props) {
  const { setIsVisibleModal } = props;
  const [isLoading, setIsLoading] = useState(false);

  const continuar = () => {
    console.log("enviando mensaje por whatsapp")
    let msg = "hola perra";
    let mobile = 958991205;
    if(mobile){
      if(msg){
        let url = 'whatsapp://send?text=' + msg + '&phone=51' + mobile;
        Linking.openURL(url).then((data) => {
          console.log('WhatsApp Opened');
        }).catch(() => {
          console.log('instala tu whatsapp maldita perra');
        });
      }else{
        console.log("ingrese un mensaje")
      }
    }else{
      console.log("la perra no esta disponible")
    }
    setIsVisibleModal(false);
  }

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Mediante Whatsapp puede realizar su pedido con una de nuestras runsoco perras</Text>
      <Button
        title="Continuar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={continuar}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  text: {
    textAlign: 'center'
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor: "#00a680"
  }
});