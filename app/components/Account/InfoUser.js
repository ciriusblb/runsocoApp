import React from "react";

import { StyleSheet, View, Text } from "react-native";

import { Avatar } from "react-native-elements";


export default function InfoUser(props) {
  // const {
  //   userInfo: { name, email, photoURL },
  // } = props;
  const {email} = props;

  const changeAvatar = () => {
    console.log("changeAvatar");
  };





  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        // showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={{
          // uri: photoURL ? photoURL : "https://api.adorable.io/avatars/266/abott@adorable.png"
          uri: "https://api.adorable.io/avatars/266/abott@adorable.png"
        }}
      />
      <View>
        <Text style={styles.displayName}>
          {/* {name ? name : "Nombre"} */}
          Hola
        </Text>
        <Text>{email ? email : "userInfo"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold"
  }
});