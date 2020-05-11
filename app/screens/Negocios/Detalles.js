import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  AsyncStorage
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome5'
//axios
import axios from 'axios'

//api
import {API} from '../../utils/Consts'
import Loading from "../../components/Loading"

import Modal from "../../components/Modal";
import PedidoText from "../../components/Negocios/PedidoText"


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

export default function Detalles({navigation,route}) {
  const { business } = route.params;
  const { products } = route.params;
  const { category } = route.params;
  const { negocioName } = route.params;


  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)

  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const [token, setToken] = useState("")

  const [client, setClient] = useState("")
  const [address, setAddress] = useState("")
  const [payment, setPayment] = useState("efectivo")
  const [cellphone, setCellphone] = useState("")
  const [pedido, setPedido] = useState(0)
  const [total, setTotal] = useState(0)
  const [priceDelivery, setPriceDelivery] = useState(4)
  const [type, setType] = useState("inStore")

  const [cellphoneError, setCellphoneError] = useState("")
  const [addressError, setAddressError] = useState("")


  useEffect(() => {
    let pedidoAux = 0
    products.map(product=> {
      pedidoAux=pedidoAux+product.subtotal
      delete product.name
      delete product.price
    })
    setPedido(pedidoAux)
    setTotal(pedidoAux + priceDelivery)
    console.log(products)
  }, [])

  useEffect(() => {
    async function fetchToken() {
        try {
          await AsyncStorage.getItem('_id').then(
            value =>{
              setClient(value)
            }
          )
          await AsyncStorage.getItem('token').then(
            value =>{
              setToken(value)
            }
          )
        } catch (e) {
            console.log(e);
        }
    };
    fetchToken();
  }, [])


  const selectedComponent = key => {
    switch (key) {
      case "pedidotext":
        setRenderComponent(
          <PedidoText
            setIsVisibleModal={setIsVisibleModal}
            navigation={navigation}
          />
        );
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
  }
async function doPedido() {

    try{
      if(!cellphone){
        setCellphoneError("El campo celular es requerido")
      } else if(!address){
        setAddressError("El campo Dirección es requerido")
      } else if(cellphone.length<9){
        setCellphoneError("Número de celular invalido")
      } else {
          console.log("---------------------------- realizado pedido ----------------------------")
          setIsVisibleLoading(true)
          const res = await axios.post(`${API}/sale/instore`, {
              client,
              business,
              address,
              payment,
              products,
              category,
              cellphone,
              total,
              priceDelivery,
              type
          }, {
              headers: {
                  'Authorization': `Bearer ${token}`,
              }
          })
          console.log("res ", res.data)
          setIsVisibleLoading(false)
          selectedComponent("pedidotext")
      }
      setIsVisibleLoading(false)
  }catch(error){
      setIsVisibleLoading(false)
      console.log(error)
      // toastRef.current.show("Error: "+error.response.data.message, 1500)
  }
}
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "rgba(34, 181, 110, 0.1)"}}>
            <View style={{ marginVertical: wp(2), backgroundColor: '#ECF8F5', ...shadow, width: wp(60), padding: wp(5), alignItems: 'center', alignSelf: 'center' }}>
              <Text style={{ color: '#00a680', fontWeight: 'bold' }}>{negocioName}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="clock" style={{ fontSize: hp(2), marginRight: wp(2) }}/>
                <Text style={{}}>10:00 a.m a 09.00 p.m</Text>
              </View>
          </View>
      <View style={styles.form}>
        <Text style={{ marginBottom: wp(3), color: '#00a680', fontSize: hp(1.8), fontWeight: 'bold' }} >DESCRIPCIÓN DE ENTREGA</Text>
        <TextInput
          style={[styles.input]}
          keyboardType='numeric'
          maxLength={9}
          onChange={e => {setCellphone(e.nativeEvent.text); setCellphoneError("")} }
          placeholder="Celular"
        />
          <Text style={styles.textError}>{cellphoneError}</Text>
        <TextInput
          style={[styles.input]}
          placeholder="Dirección"
          multiline={true}
          onChange={e => {setAddress(e.nativeEvent.text); setAddressError("")} }
        />
        <Text style={styles.textError}>{addressError}</Text>
        <View style={styles.lineBlue}></View>
        <View style={styles.lineGreen}></View> 
      </View>
      <View style={[styles.form, { marginTop: wp(8) }]}>
        <Text style={{ marginBottom: wp(3), color: '#00a680', fontSize: hp(1.8), fontWeight: 'bold' }} >PAGO</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: wp(2) }}>
          <Text style={{ fontSize: hp(1.8) }}>Pedido: </Text>
          <Text style={{ fontSize: hp(1.8) }}>S/. {pedido}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: wp(2) }}>
          <Text style={{ fontSize: hp(1.8) }}>Delivery: </Text>
          <Text style={{ fontSize: hp(1.8) }}>S/. {priceDelivery}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: wp(2) }}>
          <Text style={{ fontSize: hp(1.8), color: '#00a680', fontWeight: 'bold' }}>Total: </Text>
          <Text style={{ fontSize: hp(1.8), color: '#00a680' }}>S/. {total}</Text>
        </View>
        <View style={styles.lineBlue}></View>
        <View style={styles.lineGreen}></View> 
      </View>
      <View style={{ marginTop: wp(8), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(11) }}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#1B5050' }]}>
          <Text style={{ color: '#fff' , fontWeight: 'bold' }}>CANCELAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: '#00a680' }]}
            onPress={doPedido}
        >
          <Text style={{ color: '#fff' , fontWeight: 'bold' }}>CONFIRMAR</Text>
        </TouchableOpacity>
      </View>
      <Loading text="Procesando Pedido" isVisible={isVisibleLoading} />

      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}

    </ScrollView>
    )
}
const styles = StyleSheet.create({
    //ESTILOS FORMULARIOS
    form: {
      backgroundColor: '#fff',
      width: wp(90),
      ...shadow,
      alignSelf: 'center',
      padding: wp(3),
      borderRadius: wp(1),
      position: 'relative'
    },
    input: {
      borderWidth: wp(.21),
      borderColor: '#d6ddf5',
      // marginBottom: wp(2),
      paddingHorizontal: wp(2),
      paddingVertical: wp(1),
      fontSize: hp(1.8),
      borderRadius: wp(1)
    },
    lineBlue: { 
      position: 'absolute', width: wp(.4), backgroundColor: '#1B5050', height: wp(8),
      bottom: wp(-8),
      left: wp(18) 
    },
    lineGreen: { 
      position: 'absolute', width: wp(.4), backgroundColor: '#00a680', height: wp(8),
      bottom: wp(-8),
      left: wp(72) 
    },
    btn: { borderRadius: wp(1), padding: wp(2), alignItems: 'center' },
    textError:{
      // marginTop: 5,
      fontSize: 10,
      marginBottom: .5,
      marginLeft: 5,
      color: '#dc3545'
    },
  })
  