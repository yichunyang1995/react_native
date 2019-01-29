import React from 'react';
import { StyleSheet, Text, View,Dimensions,TextInput,Image,PixelRatio,ScrollView,FlatList,ActivityIndicator,TouchableHighlight} from 'react-native';
import {getalllist} from '../services/FlaListDataService'
import { todetails,tabbar } from '../Actions'
import { Button,Content,Container,Header,Item,Input} from 'native-base';
import { Carousel } from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ceshi from './Ceshi'
import { Camera, Permissions,Constants, BarCodeScanner} from 'expo';
import { map } from 'rsvp';


const mapStateToProps = (state)=>{
    return { 
      
    }
  }
class Classification extends React.Component{
    constructor(props){
        super(props)
        this.state={
            listitem:[
                ['male',{ mainTitle:'时尚男装',subHeading:'男装新品/全场热卖',atype:1}],
                ['female',{ mainTitle:'时尚女装',subHeading:'女装新品/全场热卖',atype:2}],
                ['desktop',{ mainTitle:'数码家电',subHeading:'生活电器/数码配件',atype:5}],
                ['desktop',{ mainTitle:'母婴玩具',subHeading:'奶粉/营养品/尿布/睡袋',atype:7}],
                ['desktop',{ mainTitle:'女人世界',subHeading:'个护/美妆',atype:3}],
                ['bed',{ mainTitle:'家居生活',subHeading:'家纺/生活用品',atype:8}],
                ['desktop',{ mainTitle:'烟酒糖茶',subHeading:'好烟好酒/说走就走',atype:4}],
                ['apple',{ mainTitle:'水果生鲜',subHeading:'海鲜/水果/小吃',atype:6}],
            ]
        }
    }
    render(){
        const data = this.state.listitem
      return(
          <ScrollView style={styles.container}>
            {
              data.map((element,index)=>(
                <TouchableHighlight key={index} onPress={()=>{Actions.storelist({atype:element[1].atype})}}>
                <View style={[styles.listitem,{alignItems:'center'}]}>
                        <Text style={{width:50,height:50,textAlign:'center',lineHeight:50,borderColor:'red',borderRadius:50,borderWidth:1}}>
                            <Icon name={element[0]} size={30} style={{ color:'red' }}/>
                        </Text>
                
                        <View style={{ marginLeft:30 }}>
                            <Text style={{ fontSize:18,color:"#222" }}>{element[1].mainTitle}</Text>
                            <Text style={{ fontSize:14,color:"#444" }}>{element[1].subHeading}</Text>
                        </View>
                </View>
              </TouchableHighlight>
              ))  
            }

            
          </ScrollView>
      )
    }
  }

  const CounterContainer = connect(mapStateToProps)(Classification);
  export default CounterContainer

  const styles = StyleSheet.create({
    container:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        flex:1,
        backgroundColor:"white"
    },
    listitem:{
        display:"flex",
        flexDirection:'row',
        paddingLeft:40,
        height:80,
        width:Dimensions.get('window').width,
        backgroundColor:'white',
        borderBottomColor:'#ddd',
        borderBottomWidth:1
    }
  })