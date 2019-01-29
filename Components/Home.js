import React from 'react';
import { StyleSheet, Text, View,Dimensions,TextInput,Image,PixelRatio,ScrollView,FlatList,ActivityIndicator,TouchableWithoutFeedback} from 'react-native';
import {getalllist} from '../services/FlaListDataService'
import { todetails,tabbar } from '../Actions'
import { Button,Content,Container,Header,Item,Icon,Input} from 'native-base';
import { Carousel } from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import Icons from 'react-native-vector-icons/FontAwesome'
import Ceshi from './Ceshi'
import { Camera, Permissions,Constants, BarCodeScanner} from 'expo';

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


const mapStateToProps = (state)=>{
  return { 
    
  }
}



class FlaListItem extends React.Component{
  render(){
  
    const baby = this.props.item
    
    const {_id,price,img,title}=this.props.item
    return (
      <TouchableWithoutFeedback  onPress={()=>{Actions.details(baby)}}>
        <View style={{ width:345,backgroundColor:'white',marginTop:20,borderRadius:20,overflow:'hidden',marginLeft:20}}>
          <Image source={{ uri:img}} style={{ width:345,height:345}}></Image>
          <View>
            <Text style={{ fontSize:22,color:'#484848',lineHeight:30,marginHorizontal:10,height:60}} numberOfLines={2}>{title}</Text>
            <View style={{ display:'flex',justifyContent:'space-between',flexDirection:'row',width:345,padding:10}}>
                <Text style={{ fontSize:30,color:'red'}}>￥{price.toFixed(2)}</Text>
                <Button style={{ padding:20,backgroundColor:'#f20',borderRadius:6 }} onPress={()=>{Actions.details(baby)}}>
                  <Text style={{ fontSize:20,color:'white'}}>立即购买</Text>
                </Button>    
            </View> 
          </View>
        </View>
        </TouchableWithoutFeedback>
    )
  }
}

class Home extends React.Component {
  
 constructor(props){
    super(props)
    this.state={
      hasCameraPermission:false,
      listdatafromserver:[],
      isShowCamera:false,
      page:1,
      isMounted:false,
      jiazai:false,
      isloadmore:false,
      loading:false,
      erweima:false,
      dixian:true,        //照相机权限
        type: Camera.Constants.Type.back,       //照相机类型
        isShowCamera: false,                    //是否开启照相机
        uri: '',
      fenleiimg:[
        [require('../public/images/feilei0.png'),1],
        [require('../public/images/feilei1.png'),2],
        [require('../public/images/feilei2.png'),3],
        [require('../public/images/feilei3.png'),7],
        [require('../public/images/feilei4.png'),6],
        [require('../public/images/feilei5.png'),4],
        [require('../public/images/feilei6.png'),8],
        [require('../public/images/feilei7.png'),5],
      ],
      fenleititle:['男装新品','女装专区','女人世界','母婴玩具','水果生鲜','烟酒糖茶','生活家居','数码产品'],
      atype:[1,2,3,7,6,4,8,5]
    }
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    // this.setState({
    //   hasCameraPermission: status === 'granted',
    // });
  };

  _handleBarCodeRead = data => {
    Alert.alert(
      'Scan successful!',
      JSON.stringify(data)
    );
  };
  isMounted=false
  make = ()=>{
    this.setState({ isloadmore:true,loading:true})
    
      getalllist({page:this.state.page}).then(data=>{
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
  // 
  loadmore=()=>{
      if(!this.state.isloadmore){
        this.setState(prevState=>{
          return {
            page:prevState.page + 1
          }
        },()=>{
          this.make()
        })  
      } 
  }


  componentDidMount() {
    this.make()
}

componentWillUnmount() {
  this.setState = () => {
    return
  }
}


  xunhuanfenlei(){
    var arr=[]
    this.state.fenleiimg.map((element,index)=>(
      arr.push(
        <TouchableWithoutFeedback key={index} onPress={()=>{Actions.storelist({atype:this.state.atype[index]});console.log(this.state.fenleiimg[index][1])}}>
        <View  >
          <Image source={this.state.fenleiimg[index][0]} style={{ width:150,height:152 }}  />
          <Text style={{ fontSize:19,height:57,lineHeight:57,textAlign:"center"}}>{this.state.fenleititle[index]}</Text>
        </View>
        </TouchableWithoutFeedback> 
      )  
    ))
  
    return arr
  }

  renderFooter = ()=>{
    if(!this.state.dixian){
      return (
        <View><Text style={{width:750,textAlign:'center',fontSize:30,paddingVertical:30,marginBottom:80,textAlign:"center"}}>我也是有底线的</Text></View>
      )
    }
    if(this.state.loading){
      return null
    }
    return (
        <View style={{width:750,paddingVertical:30,marginBottom:80,textAlign:'center'}}>
         <ActivityIndicator animating={true} size='large'/>
       </View>
    )
  }

  renderHeader = ()=>{
    return (
      <View style={styles.flexbox}>

       

        <View style={{width:750,marginBottom:10}}>
          <Carousel
            style={styles.wrapper}
            selectedIndex={1}
            autoplay
            infinite
            afterChange={this.onHorizontalSelectedIndexChange}
          >
          <View style={[styles.containerHorizontal]}>
              <Image  source={require('../public/images/lunbo2.jpg')}  style={{ height:460 ,width:'100%'}} resizeMode='cover'  />
            </View>
            <View style={[styles.containerHorizontal, { backgroundColor: 'red' }]}>
              <Image  source={require('../public/images/lunbo3.jpg')}  style={{ height:460 ,width:'100%'}} resizeMode='cover'  />
            </View>
            <View style={[styles.containerHorizontal]}>
              <Image  source={require('../public/images/lunbo4.jpg')}  style={{ height:460 ,width:'100%'}} resizeMode='cover'  />
            </View>
            <View style={[styles.containerHorizontal]}>
              <Image  source={require('../public/images/模型图_10.png')}  style={{ height:460 ,width:'100%'}} resizeMode='cover'  />
            </View>
            <View style={[styles.containerHorizontal]}>
              <Image  source={require('../public/images/lunbo1.jpg')}  style={{ height:460 ,width:'100%'}} resizeMode='cover'  />
            </View>
          </Carousel>
        </View>       
        
        <View style={{ backgroundColor:'#f3f3f3',width:750,padding:15}}>
          
          <View style={styles.flexbox}>
           {this.xunhuanfenlei()}
          </View>
          
        </View>

        <View style={{ overflow:'hidden',display:'flex',flexDirection: 'row'}}>
          <View >
            <Image source={require('../public/images/模型图2_02.jpg')} style={{ width:365,height:312 }} />
          </View>
          <View >
            <Image source={require('../public/images/模型图2_03.jpg')} style={{ width:385,height:157}} />
            <Image source={require('../public/images/模型图2_04.jpg')} style={{ width:385,height:157 }} />
          </View>
        </View>
       
    </View>
    )
  }


  _key = (item,index)=>item._id

  takePicture(){
    this.setState({
        isShowCamera: true
    })
}

async componentWillMount() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  this.setState({ hasCameraPermission: status === 'granted' });
  }
  render() {
    const { hasCameraPermission } = this.state;
    if(this.state.isShowCamera){
      return (
        <Camera 
                    style={{ flex: 1 }} 
                    type={this.state.type}
                    ref={el=>this.camera=el}      //参照官网的Methods
                  >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                            flex: 1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            }}
                            onPress={() => {
                            this.setState({
                                type: this.state.type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back,
                            });
                            }}>
                            <Text
                            style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                            {' '}Flip{' '}
                            </Text>
                        </TouchableOpacity>
                        {/* 复制一个开始拍照的点击按钮 */}
                        <TouchableOpacity
                            style={{
                            flex: 1,                    //flex为0.1改成flex为1
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            }}
                            //参照官网的Methods
                            onPress={async () => {
                                if (this.camera) {
                                    let photo = await this.camera.takePictureAsync();
                                  
                                    this.setState({
                                        isShowCamera: false,
                                        uri: photo.uri
                                    })
                                }
                            }}>
                            <Text
                            style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                            {' '}开始拍照{' '}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
      )
    }
    if(this.state.erweima){
      return (
        <View style={styles.QR}>
        <BarCodeScanner
        onBarCodeRead={this._handleBarCodeRead}
       style={styles.QR}
      >
      <Text onPress={()=>{this.setState({ erweima:false })}}>关闭</Text>
      </BarCodeScanner>
      </View>
      )
    }
    return (
      <View style={ styles.container }>
            <Container style={{width:750}}>
              <Header  style={{ backgroundColor:'red',paddingTop:60,paddingBottom:20,height:120,display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <Icons name={'search'} size={40} style={{ color:'#000',position:'absolute',left:570,top:55,zIndex:99,fontWeight:'100'}} />
                <Icons name={'camera'} size={40} style={{ color:'#eee'}} onPress={()=>{this.takePicture()}}/>
                <TextInput  placeholder='理想生活上天猫' style={{ width:550,backgroundColor:'#eee',height:60,fontSize:30,paddingHorizontal:30,borderRadius:30,borderColor:"#666",borderWidth:1,position:'relative'}}>
            
                </TextInput>
                <Icons name={'camera'} size={40} style={{ color:'#eee'}} onPress={()=>{this.setState({ erweima:true })}}/>
              </Header>
                <FlatList
                style={{ backgroundColor:'#eee' }}
                numColumns={2}
                // contentContainerStyle={{paddingHorizontal:}}
                  data = {this.state.listdatafromserver}
                  keyExtractor = {this._key}
                  // refreshing={false}
                  ListHeaderComponent = {this.renderHeader}
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
    );
  } 
}

const CounterContainer = connect(mapStateToProps,{todetails,tabbar})(Home);
export default CounterContainer

const styles = StyleSheet.create({
  container: {
      width: width,
      height:height,
      transform: [{translateX: -width * .5}, {translateY: -height * .5}, {scale: scale}, {translateX: width * .5}, {translateY: height * .5}]   
  },
  flexbox:{
    display:'flex',
    justifyContent:'space-evenly', 
    flexDirection: 'row', 
    flexWrap:'wrap'
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:460
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:460
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
  QR: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
  }
});



