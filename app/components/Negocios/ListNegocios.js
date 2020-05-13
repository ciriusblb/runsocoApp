import React, {useState, useEffect} from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Image,
  // AsyncStorage
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
// import Negocio from '../../components/Negocios/Negocio'
// import Loading from '../../components/Loading'

//axios
// import axios from 'axios'

//api
// import {API} from '../../utils/Consts'



export default function ListNegocios({ route, navigation, negocios, category }) {
  return (
    <View>
        <FlatList
          style={{paddingHorizontal: wp(3) }}
          data={negocios}
          renderItem={negocio => (
            <Negocio negocio={negocio.item} navigation={navigation} category={category}/>
          )}
          keyExtractor={(item, index) => index.toString()}
        //   onEndReached={handleLoadMore}
        //   onEndReachedThreshold={0.5}
        />
    </View>
  );

}


function Negocio(props) {
    const { negocio, navigation, category } = props;
    return (
        <View style={{ backgroundColor: '#fff', marginBottom: wp(2), ...shadow, height: wp(60) }}>
            <Image
            style={{ height: '70%', resizeMode: 'cover' }}
            source={{ uri:negocio.img }} 
            />
            <View style={{ padding: wp(2), height: '50%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <View>
                <Text style={{ fontSize: hp(2), color: '#1B5050', fontWeight: 'bold' }}>{ negocio.name }</Text>  
                <View style={{ flexDirection: 'row' }}>
                <Icon name="star"  style={{ color: '#FFDC69', marginRight: wp(1)}}/>
                <Icon name="star"  style={{ color: '#FFDC69', marginRight: wp(1)}}/>
                <Icon name="star"  style={{ color: '#FFDC69', marginRight: wp(1)}}/>
                <Icon name="star"  style={{ color: '#FFDC69', marginRight: wp(1)}}/>
                <Icon name="star"  style={{ color: '#FFDC69', marginRight: wp(1)}}/>
                </View>
                <Text style={{ fontSize: hp(1.8), color: '#999'}}>10:00 a.m a 09:00 p.m</Text>
            </View>
            <TouchableOpacity style={{ padding: wp(2), backgroundColor: 'rgba(34, 181, 110, 0.1)', borderRadius: wp(5) }}>
                <Icon
                style={{ fontSize: hp(3), color: '#00a680'}}
                name="door-open"
                onPress={()=> navigation.navigate("Productos", {negocioName: negocio.name, id:negocio._id, category: category, subCategorias: negocio.categories })}
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