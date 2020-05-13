import React, {useState, useEffect} from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  AsyncStorage
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Loading from '../../components/Loading'
import ListNegocios from '../../components/Negocios/ListNegocios'

//axios
import axios from 'axios'

//api
import {API} from '../../utils/Consts'


export default function Negocios({ route, navigation }) {
    
    const { negocio } = route.params;
    const { titulo } = route.params;
    
    const [negocios, setNegocios] = useState(null);
    // const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
      async function fetchNegocios() {
          try {
            await AsyncStorage.getItem('token').then(
              value =>{
                getNegocios(value)
              }
            )
          } catch (e) {
              console.log(e);
          }
      };
      fetchNegocios();
    }, [])


    async function getNegocios(token) {
        try {
          // setIsLoading(true)
          const res = await axios.get(`${API}/business/${negocio}`, {
              headers: {
                  'Authorization': `Bearer ${token}`,
              }
          })
          setNegocios(res.data.data)
          // setIsLoading(false)
       } catch (error) {
          setIsLoading(false)
          console.log(error)
       }
    }




  if (negocios === null) {
    return (
      <Loading isVisible={true} text="Cargando..." /> 
    );
  }
   return (negocios.length>0) ? (
    <View style={{ flex: 1, backgroundColor: "rgba(34, 181, 110, 0.1)"}}>
      <View style={styles.containerSearch}>
        <Text style={{ color: '#1B5050', fontWeight: 'bold', fontSize: hp(2), marginBottom: wp(1) }}>{titulo}</Text>
        <View style={{ borderRadius: wp(1), borderWidth: wp(.3), borderColor: '#ddd', width: wp(90), flexDirection: 'row', alignItems: 'center' }}>
          <TextInput 
            style={{ width: wp(85), paddingVertical: wp(1), paddingHorizontal: wp(3), fontSize: hp(2)}} 
            placeholder="Buscar"
          />
          <Icon 
            style={{ color: '#ddd', fontSize: hp(2), marginLeft: wp(-2) }}
            name="search"
          />
        </View>
      </View>
      <View>
        <ListNegocios 
          negocios={negocios}
          category={negocio} //categoria string
          navigation={navigation}
        />
      </View>
    </View>
   ) : (
     <Text style={{textAlign: 'center'}}>aun no hay negocios</Text>
   )
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
    containerSearch: {
        backgroundColor: '#fff',
        marginTop: hp(2),
        width: wp(96),
        alignSelf: 'center',
        ...shadow,
        alignItems: 'center',
        padding: wp(3),
        borderRadius: wp(2),
        marginBottom: wp(2)
      }
});