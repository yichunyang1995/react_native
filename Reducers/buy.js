import lodash from 'lodash'

export const addbuy=function(state={list:[]},action){

    switch(action.type){
        case "addbuy":
            state=action.payload
        return [...state]
        default: 
        return state;
    }
}


export const dingdanlist=function(state=[],action){

    switch(action.type){
        case "dingdanlist":
        // var arr = []
        // if(state.length<=0){
        //     state = action.payload
        // }else{
        //     action.payload.forEach(element=>{
        //         state.push(element)
        //     })
        // }
        if(state.length>0){
            return [...state,[...action.payload]]
        }
        return [[...action.payload]]
        default: 
        return state;
    }
}


