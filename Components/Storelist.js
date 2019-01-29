import React from 'react';
import { StyleSheet, Text, View,Dimensions,TextInput,Image,PixelRatio,ScrollView,FlatList,ActivityIndicator,TouchableOpacity} from 'react-native';
import {storelist} from '../services/FlaListDataService'
import { todetails,tabbar } from '../Actions'
import { Button,Content,Container,Header,Item,Icon,Input} from 'native-base';
import { Carousel } from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import Icons from 'react-native-vector-icons/FontAwesome'
import Ceshi from './Ceshi'
import { Camera, Permissions,Constants, BarCodeScanner} from 'expo';
import axios from 'axios'


const dp2px = dp=>PixelRatio.getPixelSizeForLayoutSize(dp);
const px2dp = px=>PixelRatio.roundToNearestPixel(px);
let designSize = {width:750,height:1280}; //假设设计尺寸为：720*1280
let pxRatio = PixelRatio.get();
let win_width = Dimensions.get("window").width;
let win_height = Dimensions.get("window").height;
let width = dp2px(win_width);
let height = dp2px(win_height);
let design_scale = designSize.width/width;
height = height*design_scale
let scale = 1/pxRatio/design_scale;

class FlaListItem extends React.Component{
    render(){
    
      const baby = this.props.item
      
      const {_id,price,img,title}=this.props.item
      return (
          <TouchableOpacity onPress={()=>{Actions.details(baby)}}>
          <View key={_id} style={{ width:345,backgroundColor:'white',marginTop:20,borderRadius:20,overflow:'hidden',marginLeft:20}}>
            <Image source={{ uri:img}} style={{ width:345,height:345}}></Image>
            <View>
              <Text style={{ fontSize:22,color:'#484848',lineHeight:36,marginHorizontal:10,height:70}} numberOfLines={2}>{title}</Text>
              <View style={{ display:'flex',justifyContent:'space-between',flexDirection:'row',width:345,padding:10}}>
                  <Text style={{ fontSize:30,color:'red'}}>￥{price.toFixed(2)}</Text>
                  <Button style={{ padding:20 ,backgroundColor:'#f20',borderRadius:6 }} >
                    <Text style={{ fontSize:20,color:'white'}}>立即购买</Text>
                  </Button>    
              </View> 
            </View>
          </View>
          </TouchableOpacity>
      )
    }
  }


const mapStateToProps = (state)=>{
    return { 
      
    }
  }
class Storelist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            listdatafromserver:[],
            page:1,
            isloadmore:false,
            loading:false,
            dixian:true
        }
    }

    componentDidMount(){
        this.setState({
            atype:this.props.atype
        })
        this.makelist(this.props.atype)
    }

    
    makelist = (atype)=>{
        this.setState({ isloadmore:true,loading:true})
          storelist({page:this.state.page,atype:atype}).then(data=>{
            if(data.docs.length<1){
              this.setState({dixian:false })
            } 
        
              this.setState({
                listdatafromserver:[...this.state.listdatafromserver,...data.docs],
                isloadmore:false,
                loading:false
              })
            })
      }

      loadmore=()=>{
        if(!this.state.isloadmore){
            this.setState(prevState=>{
                return {
                  page:prevState.page + 1
                }
            },()=>{
                this.makelist(this.props.atype)
            })  
        }    
    }

    renderFooter = ()=>{
        if(!this.state.dixian){
          return (
            <View><Text style={{width:750,textAlign:'center',fontSize:30,paddingVertical:30,marginBottom:240,textAlign:"center"}}>我也是有底线的</Text></View>
          )
        }
        if(this.state.loading){
          return null
        }
        return (
            <View style={{width:750,paddingVertical:30,marginBottom:240,textAlign:'center'}}>
             <ActivityIndicator animating={true} size='large'/>
           </View>
        )
      }

    _key = (item,index)=>item._id
    render(){
        const data = this.state.listitem
      return(
          <View style={styles.container}>
           <Container style={{height:"100%",width:750}}>
            <FlatList
            style={{width:750,backgroundColor:'#eee'}}
                numColumns={2}
                // contentContainerStyle={{paddingHorizontal:}}
                  data = {this.state.listdatafromserver}
                  keyExtractor = {this._key}
                  refreshing={false}
                //   ListHeaderComponent = {this.renderHeader}
                  ListFooterComponent = {this.renderFooter}
                  onEndReached = {this.loadmore}
                  onEndReachedThreshold = {0.1}
                  onRefresh = {this.Refresh}
                  renderItem = { ({item,index}) =>{
                    return <FlaListItem item={item} index={index}/>
                  }}
                />
           </Container>
          </View>
      )
    }
  }

  const CounterContainer = connect(mapStateToProps)(Storelist);
  export default CounterContainer

  const styles = StyleSheet.create({
    container: {
        width: width,
        height:height,
        transform: [{translateX: -width * .5}, {translateY: -height * .5}, {scale: scale}, {translateX: width * .5}, {translateY: height * .5}]   
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
