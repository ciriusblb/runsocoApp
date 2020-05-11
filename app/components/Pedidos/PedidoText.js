import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";

export default function PedidoText(props) {
  const { setIsVisibleModal } = props;
  const [isLoading, setIsLoading] = useState(false);

  const ok = () => {
    setIsVisibleModal(false);
  }

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Listo, su pedido sera procesado por una de nuestras runsoco perras</Text>
      
      <Button
        title="OK"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={ok}
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