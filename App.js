import React, { Component } from 'react';
import { Container, Header, Content, Button,} from 'native-base';
import { StyleSheet, Text, View,Dimensions,TextInput,Image,PixelRatio,ScrollView} from 'react-native';
import {AppLoading} from 'expo'
import { Home,TabIcon,My,Carts,Details,Classification,Ceshi,Order,Confirmation,Paysuccess,Storelist} from './Components'
import {Router,Stack,Scene,Tabs,Modal, Actions} from 'react-native-router-flux'
import {Provider} from 'react-redux'
import Icon  from 'react-native-vector-icons/FontAwesome'
import storeConfig from './Store'
const { persistor, store } = storeConfig()
import { PersistGate } from 'redux-persist/integration/react'



const HomeNavBar = (props)=>{
  return (
    <View
      style={{
        height:80,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center', 
        paddingTop:20
      }}
    >
      <Image
        source={require('./assets/splash.png') }
        style={{ height:80,width:Dimensions.get('window').width,position:'absolute' }}
      />
    <Text style={{ color:'blue'}}>
      navBarButtonColor
    </Text>
    </View>
  )
}



  const right =(props)=>{
    return(
        <View>
            <Text onPress={()=>{props._fn()}}>右边按钮</Text>
        </View>
    )
  }


 
export default class ButtonThemeExample extends Component {
  constructor(props){
    super(props)
    this.state={
      loading:true,
      tabbar:false
    }
  }

  async componentDidMount(){
    await Expo.Font.loadAsync({
      'Roboto' : require('./Fonts/Roboto-Regular.ttf'),
      'Roboto_medium' : require('./Fonts/RobotoCondensed-Regular.ttf')
    })
    this.setState({
      loading:false
    })
  }
  

  render() {
    return (
      <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
          <Router>
          
            <Tabs key='tabbar' activeTintColor='#ff2f49' inactiveTintColor='#999999'  swipeEnabled={true}>

              <Stack  key="root" title='首页' icon={TabIcon} iconName='home'>
                <Scene key="home" component={Home} title='首页' hideNavBar={true}  />
                <Scene key="details" component={Details} title='详情页' hideTabBar={true} />
                <Scene key="carts" component={Carts} title='购物车' hideTabBar={true}/>
                {/* <Scene key='storelist' title='商品列表' component={Storelist}></Scene>
                <Scene key="confirmation" component={Confirmation} title='提交订单' hideTabBar={true} />
                <Scene key="paysuccess" component={Paysuccess} title='支付成功' hideTabBar={true} />
                <Scene key="order" component={Order} title='订单列表' hideTabBar={true} /> */}
              </Stack>

              <Stack key="fenlei" title='分类页' icon={TabIcon} iconName='th-large'>
                <Scene key='storelist' title='商品列表' component={Storelist}></Scene>
                <Scene key="classification" component={Classification} title='分类' initial/>
              </Stack>

              <Stack key="gouwuche" title='购物车' icon={TabIcon} iconName='shopping-cart'>
                <Scene key="carts" component={Carts} title='购物车' initial/>
                <Scene key="confirmation" component={Confirmation} title='提交订单' hideTabBar={true} />
                <Scene key="paysuccess" component={Paysuccess} title='支付成功' hideTabBar={true} />
                <Scene key="order" component={Order} title='订单列表' hideTabBar={true} />
              </Stack>

              <Stack key="me" title='我的' icon={TabIcon} iconName='user'>
                <Scene key="carts" component={My} title='我的' initial />
              </Stack>
            </Tabs>
        </Router>
        </PersistGate>
        </Provider>
    ) 
  }
}
