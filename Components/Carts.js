import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail,Left, Body, Right, Button,CheckBox,Input} from 'native-base';
import {productjia,productjian,changeinput,changechecked,allcheck,shanchu,addbuy,tabbar} from '../Actions';
import { StyleSheet, Text, View,Dimensions,TextInput,Image,PixelRatio,ScrollView,FlatList,ActivityIndicator} from 'react-native';
import { connect } from 'react-redux'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Actions } from 'react-native-router-flux';
import lodash from 'lodash'

const mapStateToProps = (state)=>{
  return {
    showcarts:state.showcarts
  }
}
class Carts extends Component {
  constructor(props){
    super(props)
    this.state={
      allchecked:false,
      visible:false,
      sure:false
    }
  }

  componentDidMount(){ }

  quanxuan(shifouquanxuan){
  
    this.props.allcheck(!shifouquanxuan)
 
  }

  alert(checknum){
    if(checknum>0){
      this.setState({
        visible:true
      })
    }
  }

  clickdelete(){

    this.setState({
      visible:false
    })
  }

  Settlement(checknum){
    if(checknum===0){
      return
    }
    var arr =lodash.filter(this.props.showcarts,element=>element.checked===true);
    this.props.addbuy(arr);
    Actions.confirmation()
  }
 
  zhanshi(data){

    if(data.length<1){
      return (
        <View>
          <Image source={ require('../public/images/kongkongruye.jpg')} style={{width:Dimensions.get("window").width }} />
        </View>
      )
    }
    var jsx = []
   for(var i=0;i<data.length;i++){
     jsx.push(
      <View style={{ display:'flex',flexDirection:'row' ,backgroundColor:"white",borderRadius:10,margin:10,paddingVertical:10}} key={i}>
      <CheckBox style={{ marginRight:30,borderRadius:50 ,marginTop:40}} onPress={()=>{}} checked={data[i].checked} />
       <Image style={{ width:100,height:100,marginRight:30}}  source={{ uri:data[i].img}} />
      <View style={{ display:'flex',justifyContent:'space-between',flexDirection:'column',width:150,paddingRight:5}}>
          <Text numberOfLines={2} style={{ lineHeight:20}} >{data[i].title}</Text>
          <View style={styles.flexbox}>
            <Text style={{color:'#fe463e',fontSize:14,fontWeight:'500'}}>￥{data[i].price.toFixed(2)}</Text>
              <View style={styles.flexbox}>
                <Text style={styles.inputbutton } onPress={()=>{this.jianchange()}} > — </Text>

                <TextInput style={{ width:20,height:20,textAlign:'center',lineHeight:20 }}
                  value={data[i].num.toString()} 
                  // onChange={(text)=>{this.changeinput(text.nativeEvent.text)}}
                  keyboardType='numeric' />
                  <Text></Text>
                <Text style={styles.inputbutton } onPress={()=>{this.jiachange(i) }}>＋</Text>
              </View>
          </View>
      </View>

    </View>
     )
   }
   return jsx
  }
  //保留--这是有问题的 为什么传不过去
  render() {

    if(this.props.showcarts.length===0){
      return(
        <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,flex:1,alignItems:'center',backgroundColor:'white'}}>
          <Image source={ require('../public/images/timg.jpg')} style={{width:408,height:439 }} />
          <Text style={{ backgroundColor:'orange',width:250,textAlign:'center',marginTop:50,height:40,lineHeight:40,borderRadius:20,fontSize:20,color:'white' }}
          onPress={Actions.home}
          >现在就去买买买!!!</Text>
        </View>
      )
    }

    const data=this.props.showcarts;
    var heji = 0; 
    var jiesuan = 0;
    var checknum =0
    var shifouquanxuan = false;


    data.forEach(element => {
      if(element.checked){
        heji +=element.price*element.num
        jiesuan +=1
        checknum +=1
      }
    });

    if(checknum<data.length){
      shifouquanxuan = false
    }else{
        shifouquanxuan=true
    }

    return (
          <View style={{ height:Dimensions.get("window").height,width:Dimensions.get("window").width,flex:1 }}>

            <ScrollView>
              {
                data.map((value,index)=>(
                  <View style={{ display:'flex',flexDirection:'row' ,backgroundColor:"white",borderRadius:10,marginHorizontal:10,paddingVertical:10,marginTop:10}} key={index}>
                  <CheckBox style={{ marginRight:30,borderRadius:50 ,marginTop:40,}} onPress={()=>{this.props.changechecked(value._id)}} checked={value.checked} />
                  <Image style={{ width:100,height:100,marginRight:30,borderRadius:8}}  source={{ uri:value.img}} />
                  <View style={{ display:'flex',justifyContent:'space-between',flexDirection:'column',width:150,paddingRight:5}}>
                      <Text numberOfLines={2} style={{ lineHeight:20}} >{value.title}</Text>
                      <View style={styles.flexbox}>
                        <Text style={{color:'#fe463e',fontSize:14,fontWeight:'500'}}>￥{value.price.toFixed(2)}</Text>
                          <View style={styles.flexbox}>
                            <Text style={styles.inputbutton } onPress={()=>{this.props.productjian(value._id)}} > — </Text>

                            <TextInput style={{ width:20,height:20,textAlign:'center',lineHeight:20 }}
                              value={value.num.toString()} 
                              onChange={(text)=>{console.log(text);this.props.changeinput(text.nativeEvent.text,value._id)}}
                              keyboardType='numeric' />
                            <Text style={styles.inputbutton } onPress={()=>{this.props.productjia(value._id) }}>＋</Text>
                          </View>
                      </View>
                </View>

                </View>
                ))
              }
          </ScrollView>
          <List style={{width:'100%',position:'absolute',bottom:0,height:50,backgroundColor:'white'}}>
            <ListItem selected style={{ height:50,borderBottomWidth:0}}>
              <Left>
              <CheckBox style={{ marginRight:15,borderRadius:50}} 
                        onPress={()=>{this.quanxuan(shifouquanxuan)}}
                        checked={shifouquanxuan} 
              />
              <Text style={{ marginRight:15 }}>全选</Text>
              <Text onPress={ ()=>{this.alert(checknum) }}> 删除</Text>
              </Left>
              <Left style={{ display:'flex',
                justifyContent:'flex-end',
                flexDirection: 'row',
                alignItems:'center'}}>
              <Text >合计:</Text><Text style={{color:'#f20'}}>￥{heji.toFixed(2)}</Text>
              <Button disabled={true} warning style={{borderRadius:18,height:40,paddingHorizontal:15,backgroundColor:'#f20',marginLeft:15}}>
            <Text style={{color:'white'}} onPress={()=>{ this.Settlement(checknum) }}>结算({jiesuan})</Text>
          </Button>
              </Left>
            </ListItem>
            </List>
            <Dialog
                onDismiss={()=>{if(this.state.sure){ this.props.shanchu()} }}
                visible={this.state.visible}
                onTouchOutside={() => {
                  this.setState({ visible: false });
                }}
              >
                <DialogContent style={{width:230,height:110,padding:0}}>
                <Text style={{ textAlign:'center',fontSize:16,height:60,lineHeight:60,borderBottomColor:'#ccc',borderBottomWidth:1}}>你确定要删除宝贝吗</Text>
                <View style={{ display:'flex',
                                justifyContent:'space-between',
                                flexDirection: 'row',
                                alignItems:'center'}}>
                    <Text style={styles.text} onPress={()=>{this.setState({visible:false,sure:true})}}
                      >确定</Text>
                      
                    <Text style={styles.text} onPress={()=>{this.setState({ visible:false,sure:false})}}>取消</Text>
                </View>
                </DialogContent>
            </Dialog>
        </View>
    );
  }
}

const CounterContainer = connect(mapStateToProps,{productjia,productjian,changeinput,changechecked,allcheck,shanchu,addbuy,tabbar})(Carts);
export default CounterContainer

const styles = StyleSheet.create({
  
  flexboxmoren:{
    display:'flex',
    flexDirection: 'row',
    alignItems:'center'
  },
  flexbox:{
    display:'flex',
    justifyContent:'space-between',
    flexDirection: 'row',
    alignItems:'center',
    
  },
  inputbutton:{
    height:20,width:20,borderRadius:50,backgroundColor:'red',lineHeight:20,backgroundColor:'#f5f5f5',color:'#8d8d8d',
    fontSize:18,textAlign:'center'
  },
  bottomflexbox:{
    
    display:'flex',
    justifyContent:'space-between',
    flexDirection: 'row',
    position:'absolute',
    bottom:130,
    alignItems:'center'
  },
  text:{
    textAlign:'center',height:40,lineHeight:40,width:80
  }
});
