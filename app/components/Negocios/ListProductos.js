import React, { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
    FlatList,
    ScrollView
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function ListProductos(props) {
  const { productos, navigation, setShowCar, productosOfCar, setProductosOfCar } = props;

  const addToCar = (producto_id, producto_name, producto_price) => {

    setProductosOfCar([...productosOfCar, {product: producto_id, name: producto_name, price: producto_price}]);
  }

  return (
        <FlatList
          style={{paddingHorizontal: wp(3) }}
          data={productos}
          renderItem={producto => (
            <Producto producto={producto.item} navigation={navigation} addToCar={addToCar} setShowCar={setShowCar} />
          )}
          keyExtractor={(item, index) => index.toString()}
        //   onEndReached={handleLoadMore}
          // onEndReachedThreshold={0.5}
        />
  
    
  );
}
function Producto(props) {
  const { producto, navigation,setShowCar, addToCar } = props;
  const [disabled, setDisabled] = useState(false);

  return (
    <View style={{ borderRadius: wp(1), paddingTop: wp(6), paddingBottom: wp(2), paddingHorizontal: wp(2.4), backgroundColor: '#fff', marginBottom: wp(2), ...shadow, position: 'relative' }}>
        <Text style={{ position: 'absolute', backgroundColor: '#00a680', color: '#fff', paddingVertical: wp(.3), paddingHorizontal: wp(3) }}>Combo</Text>
        <View style={{ flexDirection: 'row', paddingRight: wp(2) }}>
        <View style={{ width: wp(30), backgroundColor: 'crimson' }}>
            <Image style={{ height: wp(24), width: '100%' }} source={{ uri: producto.img }} />
        </View>
        <View style={{ paddingLeft: wp(1), paddingRight: wp(1)}}>
            <Text style={{ color: '#00a680', fontSize: hp(2), fontWeight: 'bold', marginBottom: wp(1.5) }}>{producto.name}</Text>
            <Text style={{ width: '60%'}} >{producto.description}</Text>
        </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{ color: '#00a680', fontSize: hp(2), fontWeight: 'bold' }}>$/. {producto.price}</Text>
        <TouchableOpacity style={{ backgroundColor: 'rgba(34, 181, 110, 0.1)', padding: wp(3), borderRadius: wp(5) }}
          onPress={() => {addToCar(producto._id, producto.name, producto.price); setShowCar(true), setDisabled(true)}}
          disabled={disabled}
          >
            <Icon 
            name="plus"
            style={{ fontSize: hp(2), color: '#00a680' }}
            />
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
    loaderRestaurants: {
        marginTop: 10,
        marginBottom: 10
    },
});