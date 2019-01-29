import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail,Left, Body, Right, Button,CheckBox,Input} from 'native-base';
import {addbuy,dingdanlist,afterdingdan} from '../Actions';
import { StyleSheet, Text, View,Dimensions,TextInput,Image,PixelRatio,ScrollView,FlatList,ActivityIndicator,Modal,TouchableHighlight,ImageBackground} from 'react-native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state)=>{
  return {
      
  }
}



class My extends React.Component{
  constructor(props){
    super(props)
    this.state={
      commodityStatus:[
                       ['待付款','briefcase'],
                       ['待发货','gift'],
                       ['待收货','truck'],
                       ['评价','comment'],
                       ['退款','save']
                      ],
      interests:[
                  ['我要充值','volume-up'],
                  ['竞猜记录','pencil'],
                  ['收货地址','map-marker'],
                  ['我的收藏','star'],
                  ['帮助与反馈','envelope']
                ]
    }
  }

  commodityStatus(data){
      var arr=[]
     data.forEach(element =>{
      arr.push(<View key={element[0]} style={{ display:"flex",flexDirection:'row',   justifyContent:'space-around'}}>
                  <View style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around'}}>
                    <Icon name={element[1]} style={{ fontSize:20,color:"#aaa"}} />
                    <Text style={{fontSize:10,color:'#aaa'}} onPress={()=>{}}>{element[0]}</Text>
                  </View>
              </View>)
    }) 
    return arr
  }
  

  interests(data){
    var arr=[];
    data.forEach(element => {
      arr.push(
        <View key={element[0]} style={[styles.flexboxrow,styles.equity,{paddingHorizontal:20}]}>
          <View style={[styles.flexboxrow,{alignItems:'center'}]}>          
          <Icon name={element[1]}  style={[styles.icon,{marginRight:10,color:"#999",fontSize:15,width:20}]}/>
            <Text style={{color:'#999'}}>{element[0]}</Text>
          </View>              
          <Icon name="angle-right"  style={[styles.icon,{color:'#999',fontSize:15}]}/>
        </View> 
      )
    });
    return arr
  }

  render(){
    return(
        <ScrollView style={styles.box}>

            <ImageBackground source={require('../public/images/my.jpg')}  style={[styles.flexboxrow,{backgroundColor:'blue',alignItems:'center',paddingVertical:30,paddingHorizontal:30}]}>
               
                <Image source={require('../public/images/photo.png')} style={{width:70,height:70,borderRadius:50,marginRight:20}} />
                <View style={[styles.flexboxcolumn,{alignItems:'flex-start'}]}>
                  <Text style={{ fontSize:18,color:"white" }}>起名字好难</Text>
                  <Text style={{ fontSize:14,color:"white" }}>开心快乐每一天</Text>
                </View>

              </ImageBackground>
              <TouchableHighlight onPress={Actions.order} >
                <View style={[styles.flexboxrow,styles.equity,{paddingHorizontal:20}]} >
                  <View style={[styles.flexboxrow,{alignItems:'center',marginRight:20}]}>
                  <Icon name="file"  style={[styles.icon,{marginRight:10,color:'#777',width:20}]}/>
                    <Text style={{color:'#777'}}>我的订单</Text>
                  </View>              
                  <View style={[styles.flexboxrow,{alignItems:'center'}]}>
                    <Text style={{color:'#777'}}>全部订单</Text>
                    <Icon name="angle-right"  style={[styles.icon,{marginLeft:10,color:'#777',fontSize:15}]}/>
                  </View>
                  </View>
                </TouchableHighlight>
              
                <View style={{height:10,backgroundColor:'#eee'}}></View>
                <View style={[styles.flexboxrow,{justifyContent:"space-around",height:50,paddingVertical:5,borderBottomColor:'#eee',borderBottomWidth:1}]}>
                  {this.commodityStatus(this.state.commodityStatus)}
                  
                </View>
                {this.interests(this.state.interests)}
             
        </ScrollView>

  

    )
  }
}

const CounterContainer = connect(mapStateToProps,{addbuy,dingdanlist,afterdingdan})(My);
export default CounterContainer


const styles = StyleSheet.create({
  box:{
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
    backgroundColor:'white'
  },
  flexboxrow:{
      display:'flex',
      flexDirection:"row",
     
  },
  flexboxcolumn:{
    display:'flex',
    flexDirection:"column",
    alignItems:'center'
  },
  equity:{
    display:'flex',flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',paddingHorizontal:10,borderBottomColor:'#eee',borderBottomWidth:1,alignItems:'center',height:50
  }
})