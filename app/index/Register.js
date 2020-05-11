import React, {useRef} from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Divider } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//toast
import Toast from "react-native-easy-toast"

//componentes
import RegisterForm from "../components/Account/RegisterForm";



export default function Register({navigation}) {
    const toastRef = useRef();
  return (
    <KeyboardAwareScrollView>

        <View style={styles.topBackground}>
            <Image
                source={require("../../assets/img/register.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            <Divider style={styles.divider} />

            <View style={styles.viewForm}>
                <RegisterForm navigation={navigation} toastRef={toastRef} />
            </View>

        </View>

        <View>
            <Text style={styles.textRegister}>
                Si tienes una cuenta registrada{" "}
                <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate("Iniciar Sesión")}
                >
                Inicie Sesión
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

    divider: {
        backgroundColor: "#00a680",
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
        marginLeft: 20,
        marginRight: 20
    }
});