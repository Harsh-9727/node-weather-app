const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const request= require('request')

const geocode = require('./geocode1')
const forecast = require('./forecast1')
const address= process.argv[2]
const port= process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPaths=path.join (__dirname,'../templates/partial')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPaths)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'WEATHER FORECAST!',
        name: 'SODHA HARSH'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'HARSH SODHA'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
       name: 'HARSH SODHA.',
       helpText: 'this is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
      return  res.send({
            error: 'please provide an address'
      })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={}) =>{
        if(error){
         return res.send({
              error
         })
         // console.log('data',data)
        }
        
          forecast(latitude,longitude, (error ,forecastdata) =>
        {
          if(error){
            res.send({
              error
            })
          }
             res.send({
            forecast: forecastdata,location,
            address: req.query.address
          })
          //console.log(location)
          console.log(forecastdata)
            
        })
        })
})
app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name:'HARSH SODHA',
        errorMssg: 'could not find the r8 content in help page'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMssg: 'could not find the page'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})