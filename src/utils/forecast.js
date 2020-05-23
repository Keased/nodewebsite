const request = require('request')

const forecast = (longitude,latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=794b1d92490d305613398c2975da9ae6&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) 

    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the weather service')
        } else if (body.error) {
            callback('Unable to find location')
        }
        else {
            callback(undefined, 'Current temperature is ' + body.current.temperature + '. But it feels like ' + body.current.feelslike + ' degrees. Wind speed is ' + body.current.wind_speed +' m/S')
        }
    }) 
} 

module.exports= forecast