import React from 'react';
import { StyleSheet, Text, View,Dimensions,TextInput,Image,PixelRatio,ScrollView,FlatList,ActivityIndicator} from 'react-native';
import {getalllist,getpage} from '../services/FlaListDataService.js'
import { Container, Header, Content, Card, CardItem, Thumbnail,Button, Icon, Left, Body, Title } from 'native-base';
import TimeAgo from 'react-native-timeago';
let moment = require('moment');
require('moment/locale/zh-cn')
moment.locale('zh-cn')
import FitImage from 'react-native-fit-image'





class FlaListItem extends React.Component{
  render(){
    const {content,time,img,title,stars}=this.props.item
    return(
      <Card style={{flex: 0}}>
      <CardItem>
        <Left>
          <Thumbnail source={{uri:img}} />
          <Body>
            <Text>{title}</Text>
            <Text note><TimeAgo time={time}></TimeAgo></Text>
          </Body>
        </Left>
      </CardItem>
      
      <CardItem>
           <FitImage source={{uri:img}}
            resizeMode='center'
            style = {styles.FitImage}
           />
      </CardItem>

      <CardItem>
        <Body>
          
          <Text>
            {content}
          </Text>
        </Body>
      </CardItem> 
      <CardItem>
        <Left>
          <Button transparent textStyle={{color: '#87838B'}}>
            <Icon name="logo-github" />
            <Text>{stars.number} stars</Text>
          </Button>
        </Left>
      </CardItem> 
    </Card>    
    )
  }
}




export default class List extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      listdatafromserver:[],
      page:1,
      loadmore:false,
      loading:false
    }
  }

  make = ()=>{
    this.setState({
      loadmore:true,
      loading:true
    })
  
      getpage({page:this.state.page}).then(data=>{
        this.setState({
          listdatafromserver:[...this.state.listdatafromserver,...data],
          loadmore:false
        })
      })
  }


  componentDidMount(){
    this.make() 
  }

  _key = (item,index)=>item.id.toString()

  renderHeader = ()=>{
    return (
      <View>
      <Text>顶部</Text>
    </View>
    )
  }
  renderFooter = ()=>{
    if(this.state.loadmore){
      return null
    }
    return (
         <View style={{ paddingVertical:20}}>
         <ActivityIndicator animating={true} size='small'/>
       </View>
    )
  }

  Refresh=()=>{
  
  }
  loadmore=()=>{
    if(!this.state.loadmore){
        this.setState(
          prevstate=>{
            return {
              page:prevstate.page+1
            }
          },()=>{
            this.make()
          }
        )
    }
    
  }

  render() {
    return (
      <View style={ styles.container }>
        <FlatList
          data = {this.state.listdatafromserver}
          keyExtractor = {this._key}
          refreshing={false}
          ListHeaderComponent = {this.renderHeader}
          ListFooterComponent = {this.renderFooter}
          onEndReached = {this.loadmore}
          onEndReachedThreshold = {0.1}
          onRefresh = {this.Refresh}
          renderItem = { ({item,index}) =>{
            return <FlaListItem item={item} index={index}/>
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      padding:0
  },
  FitImage:{
    borderRadius:20
  },
  FitImageWidthSize:{
    height:100,
    width:30,
  }
});
