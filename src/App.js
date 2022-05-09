import axios from "axios";
import { useEffect, useState } from "react";

import "./styles.css";


function App() {

  const [weather, setWeather] = useState({});
  const [temp, setTemp] = useState();
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    function success(pos) {
      var crd = pos.coords;
    
      console.log('Your current position is:');
      console.log('Latitude : ' + crd.latitude);
      console.log('Longitude: ' + crd.longitude);
      console.log('More or less ' + crd.accuracy + ' meters.');
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=84a5820e3b2a0c9f77e35baa853e8766&units=metric`)
        .then((res) => {
          setWeather(res.data);
          console.log(res);
          setTemp(res.data.main.temp)
          console.log(temp)
        })
        
    };
    
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    };
    
    
    navigator.geolocation.getCurrentPosition(success, error);
  }, [temp]);

  const changeUnit = () => {
    if(isCelsius){
      setTemp(temp * (9/5)+32);
      setIsCelsius(false);
    }else {
      setTemp((temp -32) * 5/9);
      setIsCelsius(true);
    }
      
  }

  return (
    
    <div className="App">
      
      <div className="weathercard">
        <div className="title">Weather-App</div>
        <img width="150px" height="150px" src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
        <div className="city">{weather.name}</div>
        <div className="country">{weather.sys?.country}</div>
        <div className="temp">
          {isCelsius ? `${Math.round(temp)}°C`: `${Math.round(temp*(9/5)+32)} °F`}
          </div>
        <div className="humidity">Humidity: {weather.main?.humidity} %</div>
        <div className="speed">Wind Speed: {weather.wind?.speed} (m/s)</div>
        <button onClick={changeUnit}>Change Units</button>
      </div>
    </div>
  );
}

export default App;
