import axios from 'axios'
export default function (){
   return new Promise((resolve,reject)=>{
       axios.get("api/test.json").then(res=>{
           if(res.data.ret){
               resolve(res.data.list)
           }else{
               resolve([]);
           }
       }).catch(error=>{
           reject(error);
       })
   })
}
