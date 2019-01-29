import axios from 'axios';

export const tocarts=(data)=>{
    return {
        type: 'addnum',
        payload: data
    }
}



export function detailshuode(data){
    return {
        type:'todetails',
        payload:data
    }
}


export function todetails(id){
    return (dispatch) =>{
        const url = `http://134.175.21.24:1000/native/data/${id}`;
        axios({
            url:url,
            method:'get'
        }).then(res=>{
            dispatch(detailshuode(res.data))
        })
    }
}


