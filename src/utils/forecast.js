const request = require('request');


const forecast=(latitude,longitude,callback)=>{
    const URL="https://api.darksky.net/forecast/dbfa0c6df19c9093701a2ab0ea024f6f/"+latitude+","+longitude+"";
    request({uri:URL,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to darksky API",undefined);
        }else if(response.body.error){
            callback("Whether info not available for gives geocodes, try for other location",undefined);
        }else{
            callback(undefined,response.body);
        }
    })
}

module.exports=forecast