import React, {useRef} from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import Toast from "react-native-easy-toast"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import LoginForm from "../components/Account/LoginForm";
import LoginFacebook from "../components/Account/LoginFacebook";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Login({ navigation }) {
    const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>

        <View style={styles.topBackground}>
            <Image
                source={require("../../assets/img/login.png")}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.viewFacebook}>
                <LoginFacebook navigation={navigation} toastRef={toastRef}  />
            </View>  

            <Divider style={styles.divider} />

            <View style={styles.viewForm}>
                <LoginForm navigation={navigation} toastRef={toastRef} />
            </View>
        </View>
        <View>
            <Text style={styles.textRegister}>
                Si no tienes una cuenta{" "}
                <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate("Regístrate")}
                >
                Registrate
                </Text>
            </Text>
        </View>
        <Toast ref={toastRef} position="center" opacity={0.8} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
    topBackground: {
        backgroundColor: "rgba(34, 181, 110, 0.1)",
        paddingTop: 20,
        paddingBottom: 20
    },
    logo: {
        width: "100%",
        // height: 150,
        height: hp(25),
    },
    viewFacebook: {
        marginRight: 20,
        marginLeft: 20
    },
    viewForm: {
        marginRight: 20,
        marginLeft: 20
    },
    textRegister: {
        marginTop: 20,
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 10
    },
    btnRegister: {
        color: "#00a680",
        fontWeight: "bold"
    },
    divider: {
        backgroundColor: "#00a680",
        marginRight: 20,
        marginLeft: 20,
    }
});