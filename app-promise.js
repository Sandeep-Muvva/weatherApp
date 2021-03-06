
const yargs=require('yargs');
const axios=require('axios');


const argv=yargs
  .options({
    a:{
      demand:true,
      alias:'address',
      describe:'address to fetch weather for',
      string:true
    }
})
.help()
.alias('help','h')
.argv;

var encodedAddress=encodeURIComponent(argv.address);
var geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCbuKFfQjKczJHEpQmXpb6CajeSHm1YJPg`;

axios.get(geocodeUrl).then((response)=>{
  if(response.data.status==='ZERO_RESULTS'){
    throw new Error('unable to find that address');
  }
var latitude=response.data.results[0].geometry.location.lat;
var longitude=response.data.results[0].geometry.location.lng;
  var weatherUrl=`https://api.darksky.net/forecast/a4403fcc599bc96cda54c427c0648d30/${latitude},${longitude}`;
console.log(response.data.results[0].formatted_address);
return axios.get(weatherUrl);
}).then((response)=>{
  var temperature=response.data.currently.temperature;
  var apparentTemperature=response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
//  console.log(response.data);
}).catch((e)=>{
  if(e.code==='ENOTFOUND'){
    console.log("unable to connect to api servers");
  }else {
    console.log(e.message);
  }

});
