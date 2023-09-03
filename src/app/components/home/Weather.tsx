import React from 'react'

const isNight = (sunrise: number, sunset: number): boolean => {return Date.now() < sunrise || Date.now() > sunset}

const ktof = (temp: number) => {
  return Math.floor((temp - 273.15) * 9/5 + 32)
}

// const descriptions = {
//   haze: 'cloudy',
//   clear: 'sunny'
// }
// const ex = Object.keys(descriptions)[0]

const Weather = async () => {

    const res = await getWeather()
    const {sys: {sunrise, sunset}, weather: obj, main: {temp, temp_min, temp_max}} = res;
    const description: string = obj[0].description;
    const rise: number = sunrise * 1000;
    const set: number = sunset * 1000;

  return (
    <>
    <div className={`weather ${description.split(' ')[0]} ${isNight(rise,set) ? 'night' : ''}`} data-desciption={description}>
      <div>
        <h2>TODAY</h2>
        <article>
          {/* {descriptions[`clear`]}
          {descriptions[ex]} */}
          <h2>{description.toUpperCase()}</h2>
          <h1 className="temp">{`${ktof(temp)}°F`}</h1>
          <p><strong>{`${ktof(temp_max)}°F `}</strong>{`${ktof(temp_min)}°F`}</p>
        </article>

      </div>
    </div>
    </>
  )
}

const getWeather = async () => {
    const res = await fetch(`http:localhost:${process.env.PORT}/api/weather`)
    return res.json();
}

export default Weather