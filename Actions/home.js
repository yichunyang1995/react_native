import axios from 'axios';

export const storelist=(data)=>{
    return {
        type: 'storelist',
        payload: data
    }
}

export function fetchList(){
    return (dispatch) =>{
        const url = `http://134.175.21.24:8000/store/list`;
        axios({
            url:url,
            method:'post'
        }).then(res=>{
            dispatch(storelist(res.data))
        })
    }
}

export const tabbar=(data)=>{
    return {
        type: 'tabbar',
        payload: data
    }
}