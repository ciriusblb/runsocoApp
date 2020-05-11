import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Vibration, Platform } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
// import Icon from 'react-native-vector-icons/dist/FontAwesome5'

// import { Notifications } from 'expo';
// import * as Permissions from 'expo-permissions';


export default function Categorias({navigation}) {


    // const [token, setToken] = useState("")

    // const sendPushNotification = async () => {
    //     console.log('sadasf')
    //     const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    //     if (status !== "granted" ){
    //       return;
    //     }
    //     const token = await Notifications.getExpoPushTokenAsync();
    //     console.log(token)

    //     const message = {
    //       to: token,
    //       sound: 'default',
    //       title: 'Original Title',
    //       body: 'And here is the body!',
    //       data: { data: 'goes here'},
    //       _displayInForeground: true,
    //     };
    //     const response = await fetch('https://exp.host/--/api/v2/push/send', {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Accept-encoding': 'gzip, deflate',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(message),
    //     });
    //   };

    return (
        < 
        // style={styles.container}
        >
            {/* <View style={styles.containerHeader}>
                <Text style={styles.logo}></Text>
            </View> */}
            {/* <View style={styles.containerSearch}>
                <Icon
                style={styles.iconSearch}
                name="search" 
                />
                <TextInput
                style={styles.inputSearch}
                placeholder="Buscar lo que necesitas"
                placeholderTextColor='#999'
                />
            </View> */}
            <View style={styles.containerMenu}>
                <View style={styles.containerMenuGrid}>
                    <TouchableOpacity style={[styles.btnCategory, { marginTop: hp(10)}]} onPress={()=> navigation.navigate("Negocios", {negocio: 'pizzeria', titulo: 'PIZZERIA'})}>
                        <Image style={styles.imageMenu} source={require("../../../assets/img/categorias/pizzeria.png")} />
                        <Text style={styles.textMenu}>PIZZERÍA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnCategory} onPress={()=> navigation.navigate("Negocios", {negocio: 'polleria', titulo: 'POLLERIA'})}>
                        <Image style={styles.imageMenu} source={require("../../../assets/img/categorias/polleria.png")} />
                        <Text style={styles.textMenu}>POLLERÍA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCategory, { marginTop: hp(10)}]} onPress={()=> navigation.navigate("Negocios", {negocio: 'farmacia', titulo: 'FARMACIA'})}>
                        <Image style={styles.imageMenu} source={require("../../../assets/img/categorias/farmacia.png")} />
                        <Text style={styles.textMenu}>FARMACIA</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerMenuGrid}>
                    <TouchableOpacity style={[styles.btnCategory, {
                         marginTop: hp(-5), 
                         width: wp(30), 
                         height: hp(16) 
                         }]}
                         onPress={()=> navigation.navigate("Realizar Pedido")}
                        //  onPress={() => sendPushNotification()}
                         >
                        <Image style={styles.imageMenu} source={require("../../../assets/img/categorias/elija.png")} />
                        <Text style={styles.textMenu}>Pide lo que quieras</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerMenuGrid}>
                    <TouchableOpacity style={[styles.btnCategory, { marginTop: hp(-7)}]} onPress={()=> navigation.navigate("Negocios", {negocio: 'restaurants', titulo: 'RESTAURANTS'})}>
                        <Image style={styles.imageMenu} source={require("../../../assets/img/categorias/restaurants.png")} />
                        <Text style={styles.textMenu}>RESTAURANTS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCategory, { marginTop: hp(5)}]} onPress={()=> navigation.navigate("Negocios", {negocio: 'licoreria', titulo: 'LICORERIA'} )}>
                        <Image style={styles.imageMenu} source={require("../../../assets/img/categorias/licoreria.png")} />
                        <Text style={styles.textMenu}>LICORERÍAS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnCategory, { marginTop: hp(-7)}]} onPress={()=> navigation.navigate("Negocios", {negocio: 'pasteleria', titulo: 'PASTELERIA'})}>
                        <Image style={styles.imageMenu} source={require("../../../assets/img/categorias/pasteleria.png")} />
                        <Text style={styles.textMenu}>PASTELERIA</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={styles.containerFooter}>
                <Image style={styles.iconFooter} source={{ uri: 'https://github.com/thesevencode/Runsoco/blob/master/runsocoApp/assets/icon.png?raw=true' }} />   
            </View> */}
        </>
    );
}
const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00, 
    elevation: 1
}
const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: '#00a680'
    // },
    // containerHeader: {
    //     alignItems: 'center',
    //     paddingBottom: hp(2.2),
    //     paddingTop: hp(2.2)
    // },
    // logo: {
    //     fontSize: hp(2.8),
    //     fontWeight: 'bold',
    //     color: '#fff'
    // },
    //BUSCADOR
    // containerSearch: {
    //     backgroundColor: '#fff',
    //     width: wp(90),
    //     alignSelf: 'center',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     borderRadius: wp(2),
    //     paddingHorizontal: wp(2),
    //     marginBottom: hp(20)
    // },
    // inputSearch: {
    //     width: wp(80),
    //     paddingHorizontal: wp(2),
    //     fontSize: hp(2),
    //     paddingVertical: hp(1.5)
    // },
    // iconSearch: {
    //     fontSize: hp(1.8),
    //     color: '#999'
    // },
    //MENU
    containerMenu: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "rgba(34, 181, 110, 0.1)",
        // paddingHorizontal: wp(2),
        // marginBottom: hp(12)
    },
    // containerMenuBottom: {
    //     marginTop: hp(-10)
    // },
    containerMenuGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btnCategory: {
        backgroundColor: '#fff', width: wp(23), height: hp(13), borderRadius: wp(80), alignItems: 'center', justifyContent: 'center', ...shadow,
    },
    imageMenu: {
        width: wp(10),
        height: hp(6)
    },
    textMenu: {
        // fontWeight: 'bold',
        fontSize: hp(1.4)
    },
    //FOOTER
    // containerFooter: {
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     paddingVertical: hp(1)
    // },
    // iconFooter: {
    //     height: hp(6),
    //     width: wp(6),
    //     resizeMode: 'contain'
    // }
});