import React from 'react';
import {View,Text,Button} from 'react-native' 
import { Title } from 'native-base';
import {Actions} from 'react-native-router-flux'




export default class Xiangqing extends React.Component{
  constructor(props){
    super(props)
    this.state={
      num:0
    }
  }

  fn = ()=>{
    this.setState({
      num:this.state.num+1 
    })
  }

  componentWillMount(){
    this.props.navigation.setParams({
      _fn : this.fn
    })
  }
  render(){
    return(
        <View>
            <Text>777</Text>
            <Text>{this.state.num}</Text>
            <Button onPress={()=>{
              this.fn()
            }} title="NUM++"><Text>num++</Text></Button>

<Button onPress={()=>{
             Actions.pop()
            }} title="返回" /> 
        </View>
    )
  }
}






