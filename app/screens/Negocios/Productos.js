import React, {useState, useEffect} from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  AsyncStorage,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
// import Producto from '../../components/Negocios/Producto'
import Loading from '../../components/Loading'

import ListProductos from '../../components/Negocios/ListProductos'

 //axios
import axios from 'axios'

//api
import {API} from '../../utils/Consts'


export default function Productos({navigation,route}) {
  const { negocioName } = route.params;
  const { id } = route.params;
  const { category } = route.params;
  const { subCategorias } = route.params;

  const [productos, setProductos] = useState([])
  const [productosFiltrados, setProductosFiltrados] = useState([])
  const [activeCategoria, setActiveCategoria] = useState(""); 

  const [productosOfCar, setProductosOfCar] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [showCar, setShowCar] = useState(false)

  useEffect(() => {
    async function fetchToken() {
      try {
        await AsyncStorage.getItem('token').then(
          value =>{
            getProductos(value)
          }
        )
      } catch (e) {
          console.log(e);
      }
  };
  fetchToken();
  }, [])

  async function getProductos(token) {
      try {
        setIsLoading(true)
        const res = await axios.get(`${API}/product/business/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        setProductosFiltrados(res.data.data)
        setProductos(res.data.data)

        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }
  }
  const pressTodos = () => {
    setActiveCategoria("")
    setProductos(productosFiltrados)
  }
  const pressSubCategoria = subCategoria => {
    setActiveCategoria(subCategoria)

    let data = productosFiltrados.filter((item)=>{
      return item.category == subCategoria;
    })
    setProductos(data)
  }

  const goToCarScreen = () => {
    navigation.navigate('CarScreen', {negocioName: negocioName, business: id, products:productosOfCar, category: category })
  }
    return (
        <View style={{ flex: 1, backgroundColor: "rgba(34, 181, 110, 0.1)"}}>
          <View style={{ marginVertical: wp(2), backgroundColor: '#ECF8F5', ...shadow, width: wp(60), padding: wp(5), alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#00a680', fontWeight: 'bold', fontSize: hp(2) }}>{negocioName}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="clock" style={{ fontSize: hp(2), marginRight: wp(2) }}/>
              <Text style={{ fontSize: hp(1.8)}}>10:00 a.m a 09.00 p.m</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity 
              onPress={()=> pressTodos("")}
            >
              <Text style={[{ paddingLeft: wp(3), paddingBottom: 10},  activeCategoria==="" ? styles.linkActive : null]}>Todos</Text>
            </TouchableOpacity> 
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={subCategorias}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => 
            <TouchableOpacity 
              onPress={()=> pressSubCategoria(item.description)}
            >
              <Text style={[{ paddingLeft: wp(3), paddingBottom: 10}, item.description === activeCategoria ? styles.linkActive : null]}>{ item.description }</Text>
            </TouchableOpacity>   
            }
          />
          </View>
          <ListProductos
            productos={productos}
            navigation={navigation}
            setShowCar={setShowCar}
            setProductosOfCar={setProductosOfCar} 
            productosOfCar={productosOfCar}
            // addToCar={addToCar}
          />
          {showCar && (

            <TouchableOpacity style={{ backgroundColor: '#00a680', padding: 15, borderRadius: 25, position: 'absolute', bottom: 10, right: 10 }} onPress={goToCarScreen}>
                <Icon 
                  name="shopping-cart"
                  style={{ fontSize: 20, color: '#fff' }}
                />
            </TouchableOpacity>
          )} 
          <Loading text="Cargando Productos" isVisible={isLoading} />
        </View>
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
    linkActive: {//COLOR PARA EL LINK DE CATEGORIAS
        color: '#00a680',
        fontWeight: 'bold'
    }
});