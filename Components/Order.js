import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail,Left, Body, Right, Button,CheckBox,Input} from 'native-base';
import {addbuy} from '../Actions';
import { StyleSheet, Text, View,Dimensions,TextInput,Image,PixelRatio,ScrollView,FlatList,ActivityIndicator,Modal,TouchableHighlight} from 'react-native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Actions } from 'react-native-router-flux';
import { yellow } from 'ansi-colors';




const mapStateToProps = (state)=>{
    console.log(state)
    return {
        dingdanlist:state.dingdanlist
    }
  }

class Order extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
      }

    everylist(element){
      return  element.map(element=>(
            <View style={styles.everybaby} key={element._id}>
                <Image source={{ uri:element.img}}
                       style={{ width:100,height:100 }} 
                />
                <View style={{ marginLeft:10,display:"flex",flexDirection:"column",justifyContent:'space-between'}}>
                    <Text numberOfLines={2} style={{ width:225,fontSize:12}}>{element.title}</Text>
                    <View>
                        <Text style={{ fontSize:12 }}>颜色:灰色，尺码：S</Text>
                        <Text style={styles.dayreturn}>七天退换</Text>
                    </View>
                    <View style={{ display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
                        <Text style={{ fontSize:12,color:'orange'}}>￥{element.price}</Text>
                        <Text style={{ fontSize:12 }}>x{element.num}</Text>
                    </View>
                </View>
            </View>
        ))
    } 
    
    everylistmoney(element){
        var money = 0;
        element.forEach(value => {
            money +=value.num*value.price
        });
        return money
    }
  render(){
   const data = this.props.dingdanlist
    return(
        <View style={{ width:Dimensions.get('window').width,height:Dimensions.get('window').height,flex:1}}>
            <ScrollView style={{display:'flex', flex:1}}>
            {
               data.map((element,index)=>(
                <View key={index}>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:"white",marginTop:4,paddingHorizontal:10,marginTop:5}}>
                    <Icon name={'briefcase'} style={{fontSize:14,color:'red',marginRight:10}}></Icon>
                    <Text style={{ height:36,lineHeight:36,fontSize:12}}>天猫旗舰店</Text>
                </View>
                {this.everylist(element)}
               
                <View>    
                    <View style={[styles.equity,styles.subtotalequity]}>          
                        <Text style={{ marginRight:10,fontSize:12}}>共{element.length}件商品小计:</Text>
                        <Text>￥ {this.everylistmoney(element)}</Text>
                    </View>
                </View>
            </View>    
               ))  
            }
            </ScrollView>  
        </View>
    )
  }
}


const CounterContainer = connect(mapStateToProps)(Order);
export default CounterContainer

const styles = StyleSheet.create({
    box:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        flex:1
    },
    flexbox:{
        display:'flex',
        flexDirection:"column",
    },
    marginTop:{
        marginTop:15
    },
    equity:{
        display:'flex',flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',paddingHorizontal:10,borderBottomColor:'#eee',borderBottomWidth:1,alignItems:'center',height:50
    },
    icon:{
      marginHorizontal:7
    },
    everybaby:{
        display:'flex',flexDirection:'row',paddingVertical:5,height:114,paddingHorizontal:10,backgroundColor:"#eee",borderBottomColor:'white',borderBottomWidth:2
    },
    inputequity:{
        justifyContent:'flex-start'
    },
    subtotalequity:{
        justifyContent:'flex-end'
    },
    dayreturn:{
        fontSize:10,color:'orange',width:50,borderColor:'orange',borderWidth:1,height:20,textAlign:"center",lineHeight:20 
    },
    bottom:{
        width:Dimensions.get('window').width,position:'absolute',bottom:0,height:50,backgroundColor:'white',display:'flex',flexDirection:'row',justifyContent:'flex-end',borderTopWidth:1,borderTopColor:'#eee',
        alignItems:'center'
    },
    x:{
        position:'absolute',right:10,top:5,fontSize:30,zIndex:999,width:20,height:20,lineHeight:30,textAlign:'center',color:'#aaa',fontWeight:'100'
      },
    bottomall:{
        marginVertical:10,marginRight:20,display:'flex',flexDirection:'column',alignItems:'center'
      }

})