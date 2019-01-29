import React from 'react'
import axios from 'axios'

const urlPrefix = 'http://134.175.21.24:1000/native/list/atype';
// const api = `http://192.168.1.102:3000/product/?_sort=id&_order=desc`


export const storelist = async(params={page:1,atype:1})=>{
    var postData = {limit:10,page:1};
    try{
        let response = await fetch(urlPrefix,{
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `limit=10&page=${params.page}&atype=${params.atype}`
          });
        let responsedata = await response.json()
        return responsedata
    }catch(err){
        console.log(err)
    }
}


export const getalllist = async(params={page:1})=>{
    var postData = {limit:10,page:1};
    try{
        let response = await axios({
            url:'http://134.175.21.24:1000/native/list',
            method: 'POST',
            data:{
                limit:10,
                page:params.page
            }
          });
        let responsedata = await response.data
        return responsedata
    }catch(err){
        console.log(err)
    }
}


// export const storelist = async(params={page:1,atype:1})=>{
//     console.log(2233)
//     try{
//         let response = await axios({
//             url:'http://134.175.21.24:1000/native/list/atype',
//             method: 'POST',
//             data:{
//                 atype:3,
//                 limit:10,
//                 page:1,
                
//             }
//           });
//         let responsedata = await response.data
//         console.log(responsedata)
//         return responsedata
//     }catch(err){
//         console.log(err)
//     }
// }






// export const getpage = async(params={page:1})=>{
//     try {
//         let response = await fetch(urlPrefix+'product?_limit=5&_page='+params.page);
//         let responsedata = await response.json()
//         return responsedata
//     } catch (error) {
        
//     }
// }


// var opt= {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: JSON.stringify(postData)
//   }