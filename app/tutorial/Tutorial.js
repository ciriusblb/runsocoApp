import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, AsyncStorage, SafeAreaView} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {Button} from 'react-native-elements'

import Carousel,{ Pagination } from 'react-native-snap-carousel';

import { LinearGradient } from 'expo-linear-gradient';

import Loading from '../components/Loading'

//steps
const items = [
  {
      title:"Paso 1",
      text: "Iniciar Sesión o registrarse",
  },
  {
      title:"Paso 2",
      text: "ir a la sección de restaurantes y elegir un restaurante",
  },
  {
      title:"Paso 3",
      text: "Elegir el platillo que guste y complete sus datos",
  },
  {
    title:"Paso 4",
    text: "Listo, se lo enviamos en minutos",
  }
]
export default function Tutorial({navigation}) {

  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    async function fetchTutorial() {
      try {
        setIsLoading(true)
        await AsyncStorage.getItem('tutorial').then(
          value =>{
            if(value){
              setIsLoading(false)
              navigation.navigate("Index")
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
    fetchTutorial()
  }, [])
    
  async function saltarTutorial() {
    await AsyncStorage.setItem('tutorial', 'true')
    navigation.navigate('Index')
  }

  function _renderItem({item,index}) {
      return (
        <View style={styles.renderItem}>
          <View style={styles.containerImg}>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemText}>{item.text}</Text>
          </View>
        </View>
      )
  }

  if (isLoading === true) {
    return (
      <Loading isVisible={true} text="Cargando..." /> 
    );
  }

  return (
    <>
      <SafeAreaView style={{flex: 1, paddingTop: hp(5)}}>
        <LinearGradient
          colors={['#00a680', '#115B37']}
          style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: hp(100),
          }}/>
        <View style={{flexDirection:'row' }}>
            <Carousel
              layout={'default'}
              loop
              data={items}
              sliderWidth={wp(100)}
              itemWidth={wp(85)}
              renderItem={_renderItem}
              onSnapToItem = { index => setActiveIndex(index) } 
            />
        </View>
      </SafeAreaView>
      <Pagination
          dotsLength={items.length}
          activeDotIndex={activeIndex}
          containerStyle={styles.containerPuntos}
          dotStyle={styles.punto}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
      />
      <View style={styles.viewBtn}>
        <Button
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            title="Continuar"
            disabled={(activeIndex==3)?false:true}
            disabledStyle={styles.disabledButton}
            onPress={saltarTutorial}
        />
      </View>
    </>
  )
}
const styles = StyleSheet.create({
    //renderItem
    renderItem: {
      backgroundColor:'#FDFDFD',
      borderRadius: 5,
      height: '100%',
      marginLeft: wp(5),
      marginRight: wp(5),
      paddingTop: wp(5),
      paddingLeft: wp(5),
      paddingRight: wp(5),
    },
    containerImg: {
      backgroundColor:'#EDEDED',
      height: '80%',
      borderRadius: 5,
    },
    itemTitle: {fontSize: 20, width: 80, borderColor:'#1B5050', color: '#1B5050', borderBottomWidth: 4},
    itemText: {color: '#1B5050', textAlign: 'center', fontSize: 12},

    //paginacion
    containerPuntos: { 
      backgroundColor: 'transparent', 
      paddingTop: 3, 
      paddingBottom:3 
    },
    punto: {
      width: 15,
      height: 15,
      borderRadius: 15/2,
      backgroundColor: '#EDEDED'
    },

    //boton continuar
    viewBtn: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: "#EDEDED",
        borderTopLeftRadius: wp(100)/2,
        borderTopRightRadius: wp(100)/2,
    },
    btnStyle: {
        backgroundColor: "#00a680",
    },
    disabledButton: {backgroundColor:'rgba(34, 181, 110, 0.1)'},
    btnContainer: {
        width: "60%"
    }
});