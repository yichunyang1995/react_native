import React from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

 const TabIcon = props =>{
    return (
        <Icon name={props.iconName || 'circle'}
        size={30}
        style={{  color : props.focused?'#ff3048':'#999999'}}
        />

    )
}

export default TabIcon