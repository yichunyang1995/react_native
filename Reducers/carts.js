import lodash from 'lodash'

export const showcarts=function(state=[],action){
    switch(action.type){
        case "addnum":
        var pos = lodash.findIndex(state,{_id:action.payload._id})
        if(pos !== -1){
            state[pos].num=state[pos].num + action.payload.num;
            if(state[pos].num>99){
                state[pos].num=99
            }
            return [...state]
        }else{
            return [...state,{...action.payload}];
        }
        case "productjia":
        state.forEach((element,index) => {
            if(element._id===action.payload){
                
                element.num=element.num + 1
                if(element.num>99){
                    element.num = 99
                }
            }
        })
        return [...state]
        case "productjian":
        state.forEach((element,index) => {
            if(element._id===action.payload){
                element.num=element.num - 1
                if(element.num<1){
                    element.num = 1
                }
            }
        })
        return [...state]
        case "changeinput":
        state.forEach((element,index) => {
            var num =action.payload.num
            if(element._id===action.payload.id){
                if(num==''){
                    element.num=1
                }else if(num>99){
                    element.num=99
                }else{
                    element.num = parseInt(num)
                }
            }
        })
        return [...state]
        case "updated":
        state.forEach(element => {
            if(element._id===action.payload.id){
                element.num=action.payload.num
            }
        })
        return [...state]
        case "changechecked":
        
        state.forEach(element => {
            if(element._id===action.payload){
                element.checked= !element.checked
            }
        })
        return [...state]
        case "allcheck":
          
                state.forEach(element => {
                    element.checked = action.payload
                })
            
            
        return [...state]
        case "delete":
        state = lodash.filter(state,value=>value.checked===false)
        return [...state]
        case "afterdingdan":
        var arr
        action.payload.forEach(element=>{
            arr = lodash.filter(state,value=> value._id!==element._id)
            state = arr
        })
    
        return [...state]
        default:
        return state; 
    }
}


