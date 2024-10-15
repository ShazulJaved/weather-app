import React, {useEffect,useState,useRef} from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'




const Weather =() => {

const inputRef = useRef();
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState([]);

const allIcons ={
        "01d": clear_icon,
        "01n": cloud_icon,
        "02d":drizzle_icon,
        "02n": humidity_icon,
        "03d": rain_icon,
        "03n":snow_icon,
        "04d": wind_icon,
}
    const search = async (city) => {
      if(city===""){
        alert("Enter city name");
        return;
      }
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3cd67c79c6934fefcaa21a66fad520be`;

        const response = await fetch (url);
        const data = await response.json();

        if(!response.ok){
          alert(data.messagr);
          return
        }

        
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || clear_icon;
        setData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          clouds:data.clouds,
          location: data.name,
          icon: icon
        })
      } catch (error) {
                  setData(false);
                   console.log("error in api call",error)
      }
    }



useEffect(()=>{
      search("");
},[])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        
        {data?<>
        
        
        <img src={data.icon} alt="" className='weather-icon' />
        <p className='temperature'>{data.temperature}C</p>
        <p className='location'>{data.location}</p>
        <div className='weather-data'>
          <div className='col'>
            <img src={humidity_icon} alt="" />
            <div>
              <p>{data.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className='col'>
            <img src={wind_icon} alt="" />
            <div>
              <p>{data.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
          <div className='col'>
            <img src={cloud_icon} alt="" />
            <div>
              <p>{data.cloud} </p>
              <span>cloudy</span>
            </div>
          </div>
          <div className='col'>
            <img src={drizzle_icon} alt="" />
            <div>
              <p>{data.drizzle} </p>
              <span>drizzle</span>
            </div>
          </div>
          <div className='col'>
            <img src={rain_icon} alt="" />
            <div>
              <p>{data.rain} </p>
              <span>rainy</span>
            </div>
          </div>
          <div className='col'>
            <img src={snow_icon} alt="" />
            <div>
              <p>{data.snow} </p>
              <span>snow</span>
            </div>
          </div>
        </div>

        </>:<></>}

    </div>
  )
}

export default Weather