import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Image,
  AsyncStorage
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
// import Icon from 'react-native-vector-icons/FontAwesome5'

import Modal from "../../components/Modal";
import Loading from "../../components/Loading";

import ConfirmationText from "../../components/Negocios/ConfirmationText"



//axios
import axios from 'axios'

//api
import {API} from '../../utils/Consts'

//SOMBRA DE LAS TARJETAS
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

  //COMPONENTE PEDIDO - LA TERJETA
// function Pedido(props) {
//   const {confirmarPedido} = props;
//     return (
//       <View MENSAJE="ESTA ES UN CARD">
//           <View style={styles.card}>
//             <Text style={{ 
//               position: 'absolute', left: wp(-14), top: wp(3),
//               fontSize: hp(1.8), fontWeight: 'bold',
//               borderRadius: wp(50), backgroundColor: '#00a680', color: '#fff', width: wp(9), height: wp(9), textAlign: 'center', lineHeight: wp(8)}}>N</Text>
//             <View style={styles.cardContent}>
//               <View style={{ paddingVertical: wp(2), flexDirection: 'row', alignItems: 'center', borderBottomWidth: wp(.2), borderBottomColor: '#999'}}>
//                 <Text style={{ color: '#00a680', fontWeight: 'bold', fontSize: hp(1.8), marginRight: wp(2) }}>
//                   CODIGO
//                 </Text>
//                 <Text>1</Text>
//               </View>
//               <View MENSAJE="COMIENZA LA TABLA, ESTO SOLO ES UN MENSAJE">
//                 <View MENSAJE="EL HEAD" style={{ flexDirection: 'row' }}>
//                   <Text style={[styles.headCol, { flex: 4}]}>Producto</Text>
//                   <Text style={styles.headCol}>Cantidad</Text>
//                   <Text style={styles.headCol}>Precio</Text>
//                 </View>
//                 <View MENSAJE="LA FILA SIN BODY :v" style={{ flexDirection: 'row', alignItems: 'center', marginBottom: wp(1) }}>
//                   <Image
//                     style={{ width: wp(8), height: wp(8), resizeMode: 'cover', marginHorizontal: wp(1)}}
//                     source={{ uri: 'https://elcomercio.pe/resizer/nIcDyuvfXa_Lh73jiU-sP_bLbFI=/980x528/smart/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/3UCDCXD2CZCCLKHP6P57GPTAIY.jpg' }}
//                   />
//                   <Text style={[styles.bodyCol, { flex: 4}]}>Pizza grande $./45.00</Text>
//                   <Text style={styles.bodyCol}>1</Text>
//                   <Text style={styles.bodyCol}>70.00</Text>
//                 </View>
//               </View>
//               <View MENSAJE="DETALLE DE PEDIDO">
//                 <Text style={{ color: '#00a680', fontWeight: 'bold', marginBottom: wp(1)}}>Detalle de Pago</Text>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(1) }}>
//                   <Text>Pedido</Text> 
//                   <Text>S./ 165</Text>
//                 </View>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(1) }}>
//                   <Text>Delivery</Text> 
//                   <Text>S./ 5</Text>
//                 </View>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(1) }}>
//                   <Text>Total a pagar</Text> 
//                   <Text>S./ 175</Text>
//                 </View>
//               </View>
//               <View MENSAJE="INFORMACION DE PEDIDO">
//                 <Text style={{ color: '#00a680', fontWeight: 'bold', marginBottom: wp(1)}}>Información del pedido</Text>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(1) }}>
//                   <Text>Lugar</Text> 
//                   <Text>Pizzeria EL HORCON</Text>
//                 </View>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(1) }}>
//                   <Text>Av. que te importa ctm</Text> 
//                   <Text>S./ 5</Text>
//                 </View>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(1) }}>
//                   <Text>Estador</Text> 
//                   <Text>No cancelado</Text>
//                 </View>
//               </View>
//             </View>
//             <View style={styles.lineBlue}></View>
//             <View style={styles.lineGreen}></View> 
//           </View>
//           <View style={{ marginTop: wp(6), flexDirection: 'row', justifyContent: 'space-between' }}>
//             <TouchableOpacity style={[styles.btn, { backgroundColor: '#1B5050', marginLeft: wp(19) }]}>
//               <Text style={{ color: '#fff' , fontSize: hp(1.5), fontWeight: 'bold' }}>CANCELAR</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.btn, { backgroundColor: '#00a680', marginRight: wp(5) }]}
//               onPress={() => {confirmarPedido()}}
//             >
//               <Text style={{ color: '#fff' , fontSize: hp(1.5), fontWeight: 'bold' }}>CONFIRMAR</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//     )
// }
export default function Pedidos({navigation,route}){

  const [idSale, setIdSale] = useState("")
  const [token, setToken] = useState("")


  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)

  const [isLoading, setIsLoading] = useState(false)





  const [pedido, setPedido] = useState(null);
  const [reloadPedido, setReloadPedido] = useState(false);
  
  if(route.params) {
    console.log('hola pedido')
      AsyncStorage.getItem('token').then(
        value =>{
          getPedido(value)
          route.params = undefined
        }
      )
  }


  useEffect(() => {
    console.log('hola')
    fetchPedido()
    async function fetchPedido() {
        try {
          await AsyncStorage.getItem('token').then(
            value =>{
              getPedido(value)
            }
          )
        } catch (e) {
            console.log(e);
        }
    };
    
  }, [])




  async function getPedido(token) {
        try {
          // setIsLoading(true)
          const res = await axios.get(`${API}/sale/client`, {
              headers: {
                  'Authorization': `Bearer ${token}`,
              }
          })
          console.log(res)
          if(res.data.data) {
            setPedido(res.data.data)
          }else{
            setPedido(false)
          }

          // setIsLoading(false)
       } catch (error) {
          // setIsLoading(false)
          console.log(error)
       }
    }



  const confirmarPedido = async () => {
  }


  if (pedido === null) {
    return (
      <Loading isVisible={true} text="Cargando..." /> 
    );
  }
   return pedido ? (
    <View style={{ position: 'relative', flex: 1 }}>
          <View style={{ position: 'absolute', width: wp(.5), height: hp(100), backgroundColor: '#1B5050', left: wp(6), top: wp(0)}}></View>
          {/* <FlatList 
            data={[
              { id: '1', title: 'Pedido 1' },
              { id: '2', title: 'Pedido 1' },
              { id: '3', title: 'Pedido 1' },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => 
              <Pedido confirmarPedido={confirmarPedido}/>
            }
          /> */}

        <View MENSAJE="ESTA ES UN CARD">
          <View style={styles.card}>
            <Text style={{ 
              position: 'absolute', left: wp(-14), top: wp(3),
              fontSize: hp(1.8), fontWeight: 'bold',
              borderRadius: wp(50), backgroundColor: '#00a680', color: '#fff', width: wp(9), height: wp(9), textAlign: 'center', lineHeight: wp(8)}}> -> </Text>
            <View style={styles.cardContent}>
              <View style={{ paddingVertical: wp(2), flexDirection: 'row', alignItems: 'center', borderBottomWidth: wp(.2), borderBottomColor: '#999'}}>
                <Text style={{ color: '#00a680', fontWeight: 'bold', fontSize: hp(1.8), marginRight: wp(2) }}>
                  CODIGO
                </Text>
                 <Text>{pedido._id}</Text>
              </View>
              <View MENSAJE="COMIENZA LA TABLA, ESTO SOLO ES UN MENSAJE">
                <View MENSAJE="EL HEAD" style={{ flexDirection: 'row' }}>
                  <Text style={[styles.headCol, { flex: 4}]}>Producto</Text>
                  <Text style={styles.headCol}>Cantidad</Text>
                  <Text style={styles.headCol}>Precio</Text>
                </View>
                <View MENSAJE="LA FILA SIN BODY :v" style={{ flexDirection: 'row', alignItems: 'center', marginBottom: wp(1) }}>

                  <FlatList 
                      data={pedido.products}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => 
                        <View style={{ paddingVertical: wp(2), flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            style={{ width: wp(8), height: wp(8), resizeMode: 'cover', marginHorizontal: wp(1)}}
                            source={{ uri: 'https://elcomercio.pe/resizer/nIcDyuvfXa_Lh73jiU-sP_bLbFI=/980x528/smart/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/3UCDCXD2CZCCLKHP6P57GPTAIY.jpg' }}
                          />
                          <Text style={[styles.bodyCol, { flex: 4}]}>{item.product.name} S/.{item.product.price}</Text>
                          <Text style={styles.bodyCol}>{item.quantity}</Text>
                          <Text style={styles.bodyCol}>S/. {item.subtotal}</Text>

                        </View>
                      }
                    />
                </View>
              </View>
              <View MENSAJE="DETALLE DE PEDIDO">
                <Text style={{ color: '#00a680', fontWeight: 'bold', marginBottom: wp(1)}}>Detalle de Pago</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(1) }}>
                  <Text>Pedido</Text> 
                    <Text>S./ {(pedido.total-pedido.priceDelivery)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(1) }}>
                  <Text>Delivery</Text> 
                  <Text>S./ {pedido.priceDelivery}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(1) }}>
                  <Text>Total a pagar</Text> 
                  <Text>S./ {pedido.total}</Text>
                </View>
              </View>
              <View MENSAJE="INFORMACION DE PEDIDO">
                <Text style={{ color: '#00a680', fontWeight: 'bold', marginBottom: wp(1)}}>Información del pedido</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(1) }}>
                  <Text>Lugar</Text> 
                  <Text>{pedido.business.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(1) }}>
                  <Text>Dirección</Text> 
                  <Text>{pedido.address}</Text>
                </View>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: wp(1) }}>
                  <Text>Estador</Text> 
                  <Text>No cancelado</Text>
                </View> */}
              </View>
            </View>
            <View style={styles.lineBlue}></View>
            <View style={styles.lineGreen}></View> 
          </View>
          <View style={{ marginTop: wp(6), flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#1B5050', marginLeft: wp(19) }]}>
              <Text style={{ color: '#fff' , fontSize: hp(1.5), fontWeight: 'bold' }}>CANCELAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { backgroundColor: '#00a680', marginRight: wp(5) }]}
              onPress={() => {confirmarPedido()}}
            >
              <Text style={{ color: '#fff' , fontSize: hp(1.5), fontWeight: 'bold' }}>CONFIRMAR</Text>
            </TouchableOpacity>
          </View>
        </View>


          {renderComponent && (
            <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
              {renderComponent}
            </Modal>
          )}
          {/* <Loading text="Cargando pedido" isVisible={isLoading} /> */}
        </View>
   ) : (
     <Text style={{textAlign: 'center'}}>aun no hizo un pedido</Text>
   )
}

  const styles = StyleSheet.create({
    card: {
      marginTop: wp(4),
      backgroundColor: '#fff',
      width: wp(82),
      ...shadow,
      alignSelf: 'flex-end',
      padding: wp(3),
      borderRadius: wp(.5),
      position: 'relative',
      marginRight: wp(2)
    },
    lineBlue: { 
      width: wp(.4), backgroundColor: '#1B5050', height: wp(6),
      position: 'absolute',
      bottom: wp(-6),
      left: wp(13) 
    },
    lineGreen: { 
      position: 'absolute',
      width: wp(.4), backgroundColor: '#00a680', height: wp(6),
      bottom: wp(-6),
      left: wp(69) 
    },
    btn: { borderRadius: wp(1), width: wp(20), padding: wp(2), alignItems: 'center' },
    headCol: {
      flex: 1,
      padding: wp(1),
      fontWeight: 'bold',
      fontSize: hp(1.6),
      color: '#00a680',
    },
    bodyCol: {
      flex: 1,
      fontSize: hp(1.7),
    },
  })