import * as React from 'react'
import {StyleSheet, View, /*Dimensions,*/ Image, SafeAreaView} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, Text } from "react-native-elements";


import { LinearGradient } from 'expo-linear-gradient';
// const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;


function UserGuest(props){
    const {navigation} = props;
    // console.log(windowHeight/80, 'windowHeight -----',hp(20))

    return(
        <>
            <SafeAreaView style={styles.viewBody}>
                <LinearGradient
                    colors={['#00a680', '#115B37']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: hp(100),
                    }}/>
                <View>
                    <Image
                        source={require("../../assets/img/user-guest.png")}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Pide lo que quieras desde la comodidad de tu casa</Text>
                    <Text style={styles.description}>
                        Busca y visualiza los mejores
                        restaurantes de una forma sencilla, vota cual te ha gustado más y
                        comenta como ha sito tu experiencia.
                    </Text>
                </View>
            </SafeAreaView>
            <View style={styles.viewBtn}>
                <Button
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    title="Iniciar Sesión"
                    onPress={() => navigation.navigate('Iniciar Sesión')}
                />
                <Button
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    title="Regístrate"
                    onPress={() => navigation.navigate('Regístrate')}
                />
                
            </View>

        </> 
    )
}
export default UserGuest

const styles = StyleSheet.create({

    viewBody: {
        flex:1,
    },
    image: {
        // height: (windowHeight<600)?100: 250 ,
        height: hp(25),
        width: "100%",
        marginBottom: 10,
        paddingLeft: 30,
        paddingRight: 30
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: "center",
        color: "#FAFAFA"
    },
    description: {
        textAlign: "center",
        // marginBottom: 30,
        marginTop: hp(0.2),
        paddingLeft: 30,
        paddingRight: 30,
        color: "#EDEDED"
    },
    viewBtn: {
        // flex: 1,
        
        alignItems: "center",
        padding: 40,
        backgroundColor: "#EDEDED",
        borderTopLeftRadius: wp(100)/2,
        borderTopRightRadius: wp(100)/2,
    },
    btnStyle: {
        backgroundColor: "#00a680",
        marginBottom: 10
    },
    btnContainer: {
        width: "60%"
    }
})