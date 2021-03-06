import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";

export default function Confirmation(props) {
  const { setIsVisibleModal, navigation, mensaje } = props;
  const [isLoading, setIsLoading] = useState(false);

  const goToPedidos = () => {
    setIsVisibleModal(false);
    // navigation.navigate('Pedidos')
  }

  return (
    <View style={styles.view}>
      <Text style={styles.text}>{mensaje}</Text>
      
      <Button
        title="OK"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={goToPedidos}
        // loading={isLoading}
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