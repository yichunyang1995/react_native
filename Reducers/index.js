import {combineReducers} from 'redux'
import {showdetails,tab} from './details'
import {showcarts} from './carts'
import {addbuy,dingdanlist} from './buy'

export default combineReducers({
    showdetails,
    showcarts,
    addbuy,
    dingdanlist,
    tab
})