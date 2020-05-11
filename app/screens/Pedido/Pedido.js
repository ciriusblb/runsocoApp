import React, {useState, useEffect, useRef} from 'react';
import { ScrollView, AsyncStorage, View, Text } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome5'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { SocialIcon } from 'react-native-elements';

//toast
import Toast from "react-native-easy-toast"

//componentes
import Modal from "../../components/Modal";
import PedidoForm from "../../components/Pedidos/PedidoForm"
import PedidoText from "../../components/Pedidos/PedidoText"
import WhatsApp from "../../components/Pedidos/WhatsApp"

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
export default function Restaurants({navigation}) {
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)

  const [token, setToken] = useState("")

  const toastRef = useRef();

  useEffect(() => {
    AsyncStorage.getItem('token').then(
      value =>{
        // console.log("token ", value)
        setToken(value)
      }
    )
  }, [])

  const selectedComponent = key => {
    switch (key) {
      case "pedidotext":
        setRenderComponent(
          <PedidoText
            setIsVisibleModal={setIsVisibleModal}
            
          />
        );
        setIsVisibleModal(true);
        break;
        case "whatsapp":
          setRenderComponent(
            <WhatsApp
              setIsVisibleModal={setIsVisibleModal}
            />
          );
          setIsVisibleModal(true);
          break;
      default:
        break;
    }
  }

  return (
    <View style={{flex:1, backgroundColor: "rgba(34, 181, 110, 0.1)"}}>
    <View style={{ marginVertical: wp(2), backgroundColor: '#ECF8F5', ...shadow, width: wp(60), padding: wp(5), alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: '#00a680', fontWeight: 'bold', fontSize: hp(2) }}>Pide lo que quieras</Text>
            <View style={{alignItems: 'center' }}>
              <Text style={{ fontSize: hp(1.8), marginTop:-4}}>o</Text>
              {/* <Icon name="whatsapp" style={{ fontSize: hp(2), marginRight: wp(2) }}/> */}
              <Text style={{ fontSize: hp(1.8),  marginTop:-4}}>Escríbenos al WhatsApp</Text>
            </View>
          </View>
      <ScrollView>
        <PedidoForm selectedComponent={selectedComponent} token={token} toastRef={toastRef}/>
      </ScrollView>
      <SocialIcon
        style={{ 
          backgroundColor: '#00a680', 
          position:'absolute', 
          bottom: 5, right: 5 }}
        type='whatsapp'
        onPress={() => selectedComponent("whatsapp")}
      />
      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
        <Toast ref={toastRef} position="center" opacity={0.8} />
    </View>
  )
}

