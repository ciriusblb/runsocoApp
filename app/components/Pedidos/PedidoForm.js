import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { Input, Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

//axios
import axios from 'axios'

//api
import {API} from '../../utils/Consts'

//components
import Loading from "../Loading"


export default function PedidoForm(props) {
    const {navigation, selectedComponent, token, toastRef } = props;
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);

    const [client, setClient] = useState("")
    const [description, setDescription] = useState("")
    const [cellphone, setCellphone] = useState("")
    const [category, setCategory] = useState("")
    const [payment, setPayment]= useState("efectivo")
    const [store, setStore] = useState("")
    const [priceDelivery, setPriceDelivery] = useState(4)
    const [extraDelivery, setExtraDelivery] = useState(2)
    const [type, setType] = useState("outStore")

    const [descriptionError, setDescriptionError] = useState("")
    const [storeError, setStoreError] = useState("")
    const [cellphoneError, setCellphoneError] = useState("")


    useEffect(() => {
        AsyncStorage.getItem('_id').then(
          value =>{
            setClient(value)
            console.log(client)
          }
        )
    }, [])


    async function realizarPedido() {
        try{
            if(!description){
                setDescriptionError("El campo Descripción es requerido")
            } else if(!store){
                setStoreError("El campo Tienda es requerido")
            } else if(!cellphone){
                setCellphoneError("El campo Celular es requerido")
            } else if(cellphone.length<9){
              setCellphoneError("Número de celular invalido")
            } else {
                console.log("---------------------------- realizado pedido ----------------------------")
                setIsVisibleLoading(true)
                const res = await axios.post(`${API}/sale/outstore`, {
                    client,
                    description,
                    cellphone,
                    category,
                    payment,
                    store,
                    priceDelivery,
                    extraDelivery,
                    type
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                console.log("res ", res)
                setIsVisibleLoading(false)
                selectedComponent("pedidotext")

            }
            setIsVisibleLoading(false)
            // selectedComponent("pedidotext")
        }catch(error){
            setIsVisibleLoading(false)
            toastRef.current.show("Error: "+error.response.data.message, 1500)
        }
    }

  return (
    <>
      <View style={styles.form}>
        <View style={styles.select}> 
          <Text style={styles.labelSelect}>
            Categoría
          </Text>
          <RNPickerSelect
          
          placeholder={{ label: 'Selecciona una categoría', value: null }}
          style={{inputAndroid:{
            placeholderColor: '#ababa',
            color: '#000',
          }}} 
          onValueChange={(value) => setCategory(value)}
          items={[
            { label: 'Se la come Becker', value: 'Se la come Becker' },
            { label: 'Se la come Denis', value: 'Se la come Denis' },
            { label: 'Se la come Sadam', value: 'Se la come Sadam' },
            { label: 'Se la come Romario', value: 'Se la come Romario' },
          ]}
        />
         </View>
          <Input  
            label="Descripción" 
            labelStyle={styles.labelColor}
            inputStyle={styles.input} 
            errorStyle={{ color: '#dc3545' }}
            errorMessage={descriptionError}
            containerStyle={styles.inputForm} 
            onChange={e => {setDescription(e.nativeEvent.text); setDescriptionError("")} }
            multiline={true}
            inputContainerStyle={styles.textArea}
            placeholder="Descripción" />
          <Input  
            label="Tienda" 
            labelStyle={styles.labelColor}
            inputStyle={styles.input}
            errorStyle={{ color: '#dc3545' }}
            errorMessage={storeError}
            containerStyle={styles.inputForm} 
            onChange={e => {setStore(e.nativeEvent.text); setStoreError("")} }
            placeholder="Tienda" />
          <Input  
            label="Celular"
            labelStyle={styles.labelColor} 
            inputStyle={styles.input} 
            keyboardType='numeric'
            maxLength={9}
            
            errorStyle={{ color: '#dc3545' }}
            errorMessage={cellphoneError}
            containerStyle={styles.inputForm} 
            onChange={e => {setCellphone(e.nativeEvent.text); setCellphoneError("")} }
            placeholder="Celular" />
          <Button
            title="Pedido"
            containerStyle={styles.btnContainerPedido}
            buttonStyle={styles.btnPedido}
            disabled={category?false:true}
            onPress={realizarPedido}
          />
        <Loading text="Procesando Pedido" isVisible={isVisibleLoading} />
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    form: {
      flex: 1,
      padding: wp(6),
      alignItems: 'center',
    },
    select: { 
      borderBottomWidth: wp(.3), 
      borderColor: '#999', 
      width: '95%', 
      marginBottom: hp(2) 
    },
    labelSelect: {
      color: '#0E134F', 
      fontWeight: 'bold', 
      // fontSize: hp(2.2) 
    },
    inputForm: {
      marginBottom: hp(2)
    },
    input: {
      fontSize: hp(2)
    },

    labelColor: {
      color: "#0E134F"
    },

    textArea: {
      height: 100,
    },
    btnContainerPedido: {
      marginTop: 20,
      width: "60%"
    },
    btnPedido: {
      backgroundColor: "#00a680"
    }
})