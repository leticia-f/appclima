import React, { useState } from "react";
const api ={
    key: "f516e030699204ab6d4dd94876298249",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result=> {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }
  const dateBuilder=(d) =>{
    let months=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto",
    "setembro", "outubro","novembro","dezembro"];
    let days=["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado" ];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month =months[d.getMonth()];
    let year = d.getFullYear();
    
    return `${day}, ${date} de ${month} de ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined")? ((weather.main.temp > 30) ? 'app warm' : 'app'
    && (weather.main.temp > 20 && weather.main.temp < 30) ? 'app normal' : 'app'
    && (weather.main.temp > 10 && weather.main.temp < 20) ? 'app cold' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            placeholder="Pesquisar..."
            className="Search-bar"
            onChange={e => setQuery(e.target.value)}
            value ={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined")? (
          <div>
            <div className ="location-box">
              <div className ="location">{weather.name}, {weather.sys.country}</div>
              <div className ="date">{dateBuilder(new Date())}</div>
            </div>
            <div className= "weather-box">
              <div className="temp">
                <div className>
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          </div>

        ) : ('')}
      </main>
    </div>
  );
}

export default App;
