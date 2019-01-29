
export const showdetails=function(state={},action){
    switch(action.type){
        case "todetails": 
        var a =action.payload
        return {...state,...a}
        default: 
        return state;
    }
}

export const tab=function(state=false,action){
    switch(action.type){
        case "tabbar": 
        state=true
        console.log(2)
        return state
        default: 
        return state;
    }
}




