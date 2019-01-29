import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, ActivityIndicator, ScrollView, Modal, TextInput, TouchableHighlight } from 'react-native';
import { Card, CardItem, Thumbnail, Button, Left, Body, Icon,Container} from 'native-base';
import { Carousel, WhiteSpace, List } from "@ant-design/react-native";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { connect } from "react-redux";
import {tocarts,todetails,addbuy} from '../Actions';
import {Actions} from 'react-native-router-flux'

const Item = List.Item;

const mapStateToProps = (state) => {
    return {
      baby : state.showdetails
    }
}

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible:false,
            value:1,
            button:''
        }
    }

    addCart(){
        this.setState({
            modalVisible:true,
            button:'carts'
        })
    }
    close(){
        this.setState({
            modalVisible:false
        })
            
            var baby =this.props.baby;
            baby.num = this.state.value;
            baby.checked = false
            if(this.state.button==='carts'){
                this.props.tocarts(baby);
            }else{
                this.props.addbuy([baby])
                Actions.confirmation()
            }
    }

    minus(){
        if(this.state.value<=1){
            this.setState({
                value:1
            })
        }else{
            this.setState({
                value:this.state.value-1
            })
        }
    }
    plus(){
        if(this.state.value>=99){
            this.setState({
                value:99
            })
        }else{
            this.setState({
                value:this.state.value+1
            })
        }
    }

    componentWillUnmount() {
        this.setState = () => {
          return
        }
      }
    
    changeValue(val){
        if(val==''||val<=1){
            val=1
        }else if(val>=99){
            val=99
        }else{
            val=parseInt(val)
        }
        this.setState({
            value:val
        })
        
    }
    
    componentDidMount(){
        this.props.todetails(this.props._id)
    }
    render() {
        console.log(this.props.baby)
         const {_id,title,price,img}=this.props.baby
        return <Container style={{ width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        display:'flex'}}>
        <ScrollView style={{flex:1}}>
       
            <View>
            <Text style={{ position:'absolute',bottom:30}}>6666</Text>
              <View>
                <Carousel style={styles.wrapper} selectedIndex={2} autoplay infinite dotStyle={{ width: 5, height: 5 }}>
                  <Image style={[styles.containerHorizontal]} source={{ uri: img }} />
                  <Image style={[styles.containerHorizontal]} source={{ uri: img }} />
                  <Image style={[styles.containerHorizontal]} source={{ uri: img }} />
                </Carousel>
              </View>
            </View>
            <View style={{ padding: 10, backgroundColor: '#fefefe', borderTopColor: '#ccc', borderTopWidth: 1 }}>
                <Text style={{ color: '#00BFFF', fontSize: 24 }}>￥{price}</Text>
                <Text style={{ color: '#080808', fontSize: 14 }} numberOfLines={2}>{title}</Text>
            </View>
            <WhiteSpace size="md" />
            <WhiteSpace size="md" />
            <View>
                <List>
                    <Item>
                        <View style={{display: 'flex', flexDirection: 'row',alignItems: 'center' }}>
                            <Text style={{color:'#ccc',fontSize:11}}>运　　费</Text>
                            <Text style={{color:'#080808',fontSize:13,marginLeft:8}}>包邮</Text>
                        </View>
                    </Item>
                    <Item>
                        <View style={{display: 'flex', flexDirection: 'row',alignItems: 'center' }}>
                            <Text style={{color:'#ccc',fontSize:11}}>服　　务</Text>
                            <Text style={{color:'#080808',fontSize:13,marginLeft:8}}>所有商品均由'由你购平台'提供</Text>
                        </View>
                    </Item>
                </List>
            </View>



            <View>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { }}
                    onDismiss={() => { }}
                    onShow={() => { }}
                    supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
                    onOrientationChange={() => { }}>
                    <TouchableHighlight style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', height: Dimensions.get("window").height, zIndex: 1, width: Dimensions.get("window").width,marginTop:-25}}
                        onShowUnderlay={() => { this.setState({ modalVisible: false }) }}
                        onHideUnderlay={() => { alert(1) }}
                    >
                    <View style={{ height: 400, width: Dimensions.get('window').width, backgroundColor: 'white',position:'absolute',bottom:0 }}>
                        <View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Image source={{uri:img}} style={{width:80,height:80}}/>
                                </View>
                                <View>
                                    <Text style={{fontSize:16,color:'#3366FF'}}>￥{price}  有货</Text>
                                    <Text style={{fontSize:10}}>商品编号：{_id}</Text>
                                </View>
                                   <Text style={{ position: 'absolute', right: 10, top: 10, width: 20, height: 20, backgroundColor: '#f5f5f5',lineHeight: 20,textAlign:'center'}} onPress={() => { this.setState({ modalVisible: false }) }}>X</Text>
                            </View>
                            <View>
                                <Text style={{color:'#ccc',fontSize:10,marginLeft:5,marginBottom:10,marginTop:20}}>容量</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Button style={styles.pop}><Text style={{color:'white',fontSize:11}}>4GB+64GB</Text></Button>
                                    <Button style={[styles.pop,styles.inactiveColor]}><Text style={{color:'black',fontSize:11}}>4GB+64GB</Text></Button>
                                    <Button style={[styles.pop,styles.inactiveColor]}><Text style={{color:'black',fontSize:11}}>4GB+64GB</Text></Button>
                                </View>
                            </View>
                       
                            <View>
                                <Text style={{color:'#ccc',fontSize:10,marginLeft:5,marginBottom:10,marginTop:20}}>版本</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Button style={styles.pop}><Text style={{color:'white',fontSize:11}}>全网通4G</Text></Button>
                                </View>
                            </View>
                            <View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}>
                                    <Text style={{ color: '#ccc', fontSize: 10, marginLeft: 5, marginBottom: 10, marginTop: 20 }}>数量</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginRight:10 }}>
                                        <Text style={styles.inputbutton} onPress={() => { this.minus() }} > — </Text>
                                        <TextInput style={{ width: 20, height: 20, textAlign: 'center', lineHeight: 20 }}
                                            value={this.state.value.toString()}
                                            onChange={(text) => this.changeValue(text.nativeEvent.text)}
                                            keyboardType='numeric' />
                                            <Text style={styles.inputbutton} onPress={() => { this.plus() }}>＋</Text>
                                    </View>
                                </View>
                            </View>
                            <Button onPress={() => this.close()} style={{ width: Dimensions.get('window').width, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor:'#3399FF',marginTop:30}}><Text style={{fontSize:12,color:'white'}}>确定</Text></Button>
                        </View>
                    </View>
                    </TouchableHighlight>
                </Modal>
            </View>
          </ScrollView>
            
          <View>
                <List>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <View style={[styles.btn]}>
                                <Button icon style={{display: 'flex', flexDirection: 'column', alignItems: 'center',backgroundColor:'white'}}>
                                    <Icon name='mic' style={{fontSize:10,color:'black'}}/>
                                    <Text style={{fontSize:10,marginTop:-20}}>客服</Text>
                                </Button>
                                <Button icon style={{  display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
                                    <Icon name='star' style={{ fontSize: 10, color: 'black' }} />
                                    <Text style={{ fontSize: 10, marginTop: -20 }}>收藏</Text>
                                </Button>
                                <Button icon style={{  display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}
                                onPress={Actions.carts}
                                >
                                    <Icon name='cart' style={{ fontSize: 10, color: 'black' }} />
                                    <Text style={{ fontSize: 10, marginTop: -20 }}>购物车</Text>
                                </Button>
                            </View>
                            <Button style={{ backgroundColor: '#FFA500', width: Dimensions.get('window').width/4, height: 40, fontSize: 20, lineHeight: 40,flex:1,justifyContent: 'center',alignItems:'center',borderRadius:0}} onPress={()=>this.addCart()}
                            >
                                <Text style={{color:'white'}}>加入购物车</Text>
                            </Button>
                            <Button style={{ backgroundColor: '#3399ff', width: Dimensions.get('window').width/4, height: 40, fontSize: 20, lineHeight: 40,flex:1,justifyContent: 'center',alignItems:'center',borderRadius:0}}
                                onPress={()=>{this.setState({button:'nowbuy',modalVisible:true})
                            }}
                            >
                                <Text style={{color:'white'}}>立即购买</Text>
                            </Button>
                        </View>
                </List>
            </View>
          
          </Container>
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5'
    },
    wrapper: {
        backgroundColor: '#fff',
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
        resizeMode: 'stretch'
    },
    text: {
        color: '#fff',
        fontSize: 36,
    },
    btn:{
        width:Dimensions.get('window').width/2,
        backgroundColor: 'white', height:40, fontSize: 12, lineHeight: 40,flex:1, justifyContent: 'center', alignItems: 'center',
        display: 'flex', flexDirection: 'row'
    },
    txts:{
        fontSize:12
    },
    btns:{
        width: Dimensions.get('window').width / 6
    },
    pop:{
        width: 70, height: 25, backgroundColor: '#3399ff', lineHeight: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 5
    },
    inputbutton: {
        height: 25, width: 25, borderRadius: 50, lineHeight: 25, backgroundColor: '#f5f5f5', color: '#8d8d8d',
        fontSize: 18, textAlign: 'center'
    },
    inactiveColor:{
        backgroundColor:'#ccc'
    }
});


const CounterContainer = connect(mapStateToProps, { tocarts,todetails,addbuy})(Details);
export default CounterContainer;