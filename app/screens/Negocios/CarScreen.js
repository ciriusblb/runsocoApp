
import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  SafeAreaView 
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'


export default function CarScreen({navigation,route}) {
  const { business } = route.params;
  const { products } = route.params;
  const { category } = route.params;
  const { negocioName } = route.params;


  const [car, setCar] = useState(products)

  useEffect(() => {
    car.map(product=> {
      product.quantity = 1;
      product.subtotal = 1*product.price;
    })
  }, [])

  const sumar = (producto) => {
    producto.quantity=producto.quantity + 1
    producto.subtotal=producto.quantity * producto.price
  }
  const restar = (producto) => {
      producto.quantity=producto.quantity - 1
      producto.subtotal=producto.quantity * producto.price 
  }

  const eliminarProducto = (idx)=> {
    let _itemState = car.filter(
      (_item, _index) => _index !== idx
      );
      setCar(_itemState)
    }
  const goToDetails = () => {
    navigation.navigate('Detalles', {business: business, products: car, category: category, negocioName: negocioName})
  }

    return (
        <SafeAreaView  style={{ flex: 1, backgroundColor: "rgba(34, 181, 110, 0.1)"}}>
        <View style={{ marginVertical: wp(2), backgroundColor: '#ECF8F5', ...shadow, width: wp(60), padding: wp(5), alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#00a680', fontWeight: 'bold' }}>{negocioName}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="clock" style={{ fontSize: hp(2), marginRight: wp(2) }}/>
              <Text style={{}}>10:00 a.m a 09.00 p.m</Text>
            </View>
          </View>
        {/* <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            { id: '1', title: 'Familiar' },
            { id: '2', title: 'Individual' },
            { id: '3', title: 'Especial' },
          ]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
          <TouchableOpacity>
            <Text style={[{ paddingHorizontal: wp(3), fontSize: hp(1.8) }, item.id === '1' ? styles.linkActive : null]}>{ item.title }</Text>
          </TouchableOpacity>   
          }
        /> */}
        <View style={{ marginBottom: wp(8), position: 'relative', padding: wp(2), paddingBottom: wp(10), backgroundColor: '#fff', ...shadow, marginTop: wp(3), width: wp(95), alignSelf: 'center' }}>
          <View MENSAJE="COMIENZA LA TABLA, ESTO SOLO ES UN MENSAJE">
            <View style={{ flexDirection: 'row', backgroundColor: '#00a680' }}>
              <Text style={styles.headCol}>PRODUCTO</Text>
              <Text style={styles.headCol}>PRECIO</Text>
              <Text style={styles.headCol}>CANTIDAD</Text>
              <Text style={styles.headCol}>SUBTOTAL</Text>
            </View>
            <View>
            <FlatList
              data={car}
              renderItem={producto => (
                <Item producto={producto.item} sumar={sumar} restar={restar} eliminarProducto={eliminarProducto} idx={producto.index}/>
              )}
              keyExtractor={(item, index) => index.toString()}
              
            />
            </View>
          </View>
          <View 
            style={{ 
              position: 'absolute', width: wp(.4), backgroundColor: '#1B5050', height: wp(8),
              bottom: wp(-8),
              left: wp(14) 
            }}
            ></View>
          <View 
            style={{ 
              position: 'absolute', width: wp(.4), backgroundColor: '#00a680', height: wp(8),
              bottom: wp(-8),
              left: wp(80) 
            }}
            ></View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(5) }}>
          <TouchableOpacity style={{ backgroundColor: '#1B5050', padding: wp(2), borderRadius: 5 }}>
            <Text style={{ color: '#fff' , fontWeight: 'bold' }}>CANCELAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#00a680', padding: wp(2), borderRadius: 5 }}
            onPress={goToDetails}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>CONTINUAR</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
}
function Item(props) {
  const {producto, sumar, restar, eliminarProducto, idx } = props;
  const [cantidad, setCantidad] = useState(1)
  const [subtotal, setSubtotal] = useState(producto.price*cantidad)
  console.log('----------------')
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.bodyCol}>{producto.name}</Text>
      <Text style={styles.bodyCol}>{producto.price}</Text>
      <View style={[styles.bodyCol, { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around' }]}>
        <TouchableOpacity
          style={{ backgroundColor: '#00a680', width: wp(5), borderRadius: 10, alignItems: 'center' }}
          onPress={() => {restar(producto); setCantidad(producto.quantity); setSubtotal(producto.subtotal)}}
          disabled={(cantidad==1)? true: false}
        >
          <Text style={{  color: '#fff' }}>-</Text>
        </TouchableOpacity>
        <Text>{cantidad}</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#00a680', width: wp(5), borderRadius: 10, alignItems: 'center' }}
          onPress={() => {sumar(producto); setCantidad(producto.quantity); setSubtotal(producto.subtotal)}}
        >
          <Text style={{  color: '#fff' }}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.bodyCol, { flexDirection: 'row', alignItems: 'flex-start'}]}>
        <Text style={{ marginRight: wp(2)}}>{subtotal}</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#00a680', width: wp(8), borderRadius: 16, alignItems: 'center', paddingVertical: wp(.9)  }}
          onPress={() => {eliminarProducto(idx)}}
        >
          <Icon name="trash" style={{ color: '#fff' }}/>
        </TouchableOpacity>
      </View>
    </View>
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
    linkActive: {//COLOR PARA EL LINK DE CATEGORIAS
      color: '#00a680',
      fontWeight: 'bold',
    }, // LOS ESTILOS DE LAS COULUMNAS DE LAS TABLAS
    headCol: {
      flex: 1,
      paddingTop: 3,
      paddingBottom: 3,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#fff',
    },
    bodyCol: {
      flex: 1,
      textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
      borderBottomWidth: wp(.2),
      borderColor: '#ccc'
    }
  })