import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail,Left, Body, Right, Button,CheckBox,Input} from 'native-base';
import {addbuy,dingdanlist,afterdingdan} from '../Actions';
import { StyleSheet, Text, View,Dimensions,TextInput,Image,PixelRatio,ScrollView,FlatList,ActivityIndicator,Modal,TouchableHighlight} from 'react-native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Actions } from 'react-native-router-flux';
import { yellow } from 'ansi-colors';

const mapStateToProps = (state)=>{
    return {
        buybaby:state.addbuy
    }
  }

class Confirmation extends React.Component{
    constructor(props){
        super(props)
        this.state={
            modalVisible:false
        }
    }

    paysuccess(data){
        Actions.paysuccess();
        this.props.dingdanlist(data)
        this.props.afterdingdan(data)
    }
    render(){
        var data= []
        data= this.props.buybaby; 

        var buymoney = 0;
        if(data.length>0){
            data.forEach(element => {
                buymoney =buymoney+element.price*element.num
             });
        }
       
      return(
          <Container style={styles.box}>
              <ScrollView style={{ flex:1}}>
                   <View>
                       <View style={{ display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:"white",padding:10}}>
                           <Icon name={'map-marker'} size={20} style={{ color:'#aaa'}} />
                           <View style={{width:280}}>
                                <View style={{ display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:10 }}>
                                    <Text style={{ fontSize:14}}>收货人：李博</Text>
                                    <Text style={{ fontSize:14}}>18645290046</Text>
                                </View>
                                <Text style={{fontSize:12}}>收货地址：杭州市江干区九堡镇九堡街道金雅苑小区27幢9单元501</Text>
                                <Text style={{fontSize:12,marginTop:10,color:"orange"}}>(收货不便时，可选择免费代收货服务)</Text>
                            </View>
                           <Icon name={'angle-right'} size={20} style={{ color:'#aaa'}} />
                       </View>
                   </View>

                {
                    data.map(element=>(
                        <View key={element._id}>
                        <View style={{display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:"white",marginTop:4,paddingHorizontal:10,marginTop:5}}>
                            <Icon name={'briefcase'} style={{fontSize:14,color:'red',marginRight:10}}></Icon>
                            <Text style={{ height:36,lineHeight:36,fontSize:12}}>天猫旗舰店</Text>
                        </View>
                        
                       <View style={styles.everybaby}>
                            <Image source={{ uri:element.img}}
                            style={{ width:100,height:100 }} 
                            />
                            <View style={{ marginLeft:10,display:"flex",flexDirection:"column",justifyContent:'space-between'}}>
                                <Text numberOfLines={2} style={{ width:260,fontSize:12}}>{element.title}</Text>
                                <View >
                                    <Text style={{ fontSize:12 }}>颜色:灰色，尺码：S</Text>
                                    <Text style={styles.dayreturn}>七天退换</Text>
                                </View>
                                <View style={{ display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
                                    <Text style={{ fontSize:12,color:'orange'}}>￥{element.price}</Text>
                                    <Text style={{ fontSize:12 }}>x{element.num}</Text>
                                </View>
                            </View>
                        </View>
                        <View>    
                            <View>
    
                                <View style={styles.equity}>          
                                    <Text style={{ marginRight:10,fontSize:12}}>配送方式</Text>
                                    <View style={{ display:'flex',flexDirection:'row',alignItems:'center' }}>
                                        <Text>快递免费</Text>
                                        <Icon name="angle-right"  style={styles.icon}/>
                                    </View>
                                </View>
    
                                <View style={styles.equity}>          
                                    <Text style={{ marginRight:10,fontSize:12 }}>运费险</Text> 
                                    <View >
                                        <View style={{ display:'flex',flexDirection:'row',alignItems:'center' }}>
                                        <Text>卖家送，确认收货前退货可赔</Text>
                                        <Icon name="angle-right" style={styles.icon} />
                                        </View>
                                        
                                    </View>
                                </View >
                                <View style={[styles.equity,styles.inputequity]}>
                                    <Text style={{ marginRight:10,fontSize:12}}>买家留言:</Text>
                                    <TextInput style={{ width:250,fontSize:12 }} placeholder='选填:填写内容已和卖家协商确认'/>
                                </View>
                                <View style={[styles.equity,styles.subtotalequity]}>          
                                    <Text style={{ marginRight:10,fontSize:12}}>共{element.num}件商品小计:</Text>
                                    <Text>￥ {element.price*element.num}</Text>
                                </View>
                            </View>
                       </View>
                    </View>    
                    ))
                }

              </ScrollView>

              <View style={styles.bottom}>
                    <Text>合计：￥</Text><Text style={{color:'orange'}}>{buymoney.toFixed(2)}</Text>
                    <Text style={{ height:50,lineHeight:50,backgroundColor:'orange',color:'white',textAlign:"center",width:100,marginLeft:10}}
                        onPress={()=>{ this.setState({modalVisible:true}) }}
                    >
                    提交订单</Text>
              </View>




              <Modal 
                              animationType={'slide'}
                              transparent={true}
                              visible={this.state.modalVisible} 
                              onRequestClose={()=>{}}
                              onDismiss={()=>{}}
                              onShow={()=>{}}
                              supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
                              onOrientationChange={() => {}}>
                  <TouchableHighlight style={{backgroundColor:'rgba(0, 0, 0, 0.4)',height:Dimensions.get("window").height,width:'100%'}}
                      // onPress={()=>{this.setState({modalVisible:false})}}
                  >

                  
                    <View style={{height:285,backgroundColor:'white',position:'absolute',bottom:0,width:Dimensions.get("window").width}}>

                        <Text style={styles.x} onPress={()=>{this.setState({modalVisible:false})}}>×</Text>

                        <View style={{ height:65,display:'flex',paddingHorizontal:10,paddingVertical:5}}>

                            <Text style={{ textAlign:'center',fontSize:16,color:'#222',lineHeight:45}}>确认付款</Text>
                            <Text style={{ textAlign:'center',fontSize:30,color:'#000',lineHeight:45}}>￥{buymoney.toFixed(2)}</Text>
                            
                            <View style={styles.equity}  >
                              <Text>支付宝账号</Text>
                              <Text>183******46</Text>
                            </View>

                            <View style={styles.equity}  >
                              <Text>付款方式</Text>
                              <Text>农业银行储蓄卡(6666)</Text>
                            </View>

                            <Button full style={{ borderRadius:20,backgroundColor:"#06f",marginTop:10}} 
                            onPress={()=>{
                                this.setState({ modalVisible:false });
                                this.paysuccess(data)
                                }}>
                              <Text style={{color:'white'}} >立即付款</Text>
                          </Button>
                        </View>

                    </View>
                  </TouchableHighlight>  
                </Modal>

          </Container>
      )
    }
  }

const CounterContainer = connect(mapStateToProps,{addbuy,dingdanlist,afterdingdan})(Confirmation);
export default CounterContainer

const styles = StyleSheet.create({
    box:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        display:'flex'
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
        display:'flex',flexDirection:'row',paddingVertical:5,height:110,paddingHorizontal:10,backgroundColor:"#eee",borderBottomColor:'white',borderBottomWidth:2
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
        width:Dimensions.get('window').width,height:50,backgroundColor:'white',display:'flex',flexDirection:'row',justifyContent:'flex-end',borderTopWidth:1,borderTopColor:'#eee',
        alignItems:'center',
        // position:'absolute',bottom:0,
    },
    x:{
        position:'absolute',right:10,top:5,fontSize:30,zIndex:999,width:20,height:20,lineHeight:30,textAlign:'center',color:'#aaa',fontWeight:'100'
      },
    bottomall:{
        marginVertical:10,marginRight:20,display:'flex',flexDirection:'column',alignItems:'center'
      }

})