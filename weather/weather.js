const request=require('request');

var getWeather=(latitude,longitude,callback)=>{
request({
  url:`https://api.darksky.net/forecast/a4403fcc599bc96cda54c427c0648d30/${latitude},${longitude}`,
  json:true
},(error,response,body)=>{
  if(error){
    callback('unable to connect to forecast servers ');
  }
  else if(response.statusCode===400){
    callback('unable to fetch weather');
  }
  else if(response.statusCode===200){
  callback(undefined,{
    temperature:body.currently.temperature,
    apparentTemperature:body.currently.apparentTemperature
  });
}
});
};

module.exports.getWeather=getWeather;
