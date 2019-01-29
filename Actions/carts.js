
export const productjia=(data)=>{
    return {
        type: 'productjia',
        payload: data
    }
}

export const productjian=(data)=>{
    return {
        type: 'productjian',
        payload: data
    }
}

export const changeinput=(num,id)=>{
   
    return {
        type: 'changeinput',
        payload: {num,id}
    }
}

export const changechecked=(id)=>{
    return {
        type: 'changechecked',
        payload: id
    }
}

export const allcheck=(allcheck)=>{
    return {
        type: 'allcheck',
        payload: allcheck
    }
}





export function addactions(data,commodity){
   commodity.num = data;
   commodity.checked = false
    return (dispatch) =>{
        dispatch(addnum(commodity))
    }
}

export const hehe=(data)=>{
    return {
        type: 'updated',
        payload: data
    }
 }

 export const shanchu=(data)=>{
    return {
        type: 'delete',
        payload: data
    }
 }

 export const haha=(data)=>{
    return {
        type: 'checked',
        payload: data
    }
 }

 export const suoyouchange=(data)=>{
    return {
        type: 'all',
        payload: data
    }
 }

 

 
 
