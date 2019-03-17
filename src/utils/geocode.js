const request = require('request');

const geocode=(location,callback)=>{
    const URL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ location +".json?access_token=pk.eyJ1IjoicmFtbG9kaGkiLCJhIjoiY2p0Ymh6eWZsMGIzZDQ1bzcxMTRoYWNiYiJ9.pPlmaitXu18pHpQRQwvMcg";
    request({uri:URL,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to mapbox API",undefined);
        }else if(response.body.features.length===0){
            callback("Location not found, try searching for other nearby location",undefined);
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                place:response.body.features[0].place_name
            });
        }
    })
}

 module.exports=geocode