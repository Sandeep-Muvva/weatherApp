
const request=require('request');
var geocodeAddress=(address,callback)=>{
request({
  url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCbuKFfQjKczJHEpQmXpb6CajeSHm1YJPg`,
  json:true
},(error,response,body)=>{
  if(error){
    callback('unable to connect to google servers');
  }
  else if(body.status==='ZERO_RESULTS'){
    callback('unable to find the address');
  }
  else if(body.status==='OK'){
    callback(undefined,{
      address:body.results[0].formatted_address,
      Latitude:body.results[0].geometry.location.lat,
      Longitude:body.results[0].geometry.location.lng
    });
}
});
}
module.exports={
geocodeAddress
};
