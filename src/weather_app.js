// e3b6a992217b45f6ee834fd3de7eb0a2 forecast
//pk.eyJ1IjoiaGFyc2g5MCIsImEiOiJjazN0dnkyNjkwNnFhM21wc2U3N3h5ZzcyIn0.9guaucCZSdz0hK2EBG7K0A
const geocode = require('./geocode1')
const forecast = require('./forecast1')

const address= process.argv[2]
if(!address)
{
  console.log('please provide an address')
}
else{
  geocode(address,(error,{longitude,latitude,location}) =>{
    if(error){
     console.log('error',error)
     // console.log('data',data)
    }
    
      forecast(latitude,longitude, (error ,forecastdata) =>
    {
      if(error){
        console.log('error',error)
      }
      console.log(location)
      console.log(forecastdata)
        
    })
    })
    
    

}
