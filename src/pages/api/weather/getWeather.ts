import React from 'react'

const getWeather = async () => {
    console.log('in getWeather function')
    const res = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Sachse&id=524901&appid=464ed89a9ab1392579b7d53c3f4f493e')
    return res.json();
}

export default getWeather