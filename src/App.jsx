import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [location, setLocation] = useState(null);

  const [locationName, setLocationName] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  const [temp, setTemp] = useState(0);
  const [feels, setFeels] = useState(0);
  const [condition, setCondition] = useState("");
  const [conditionIcon, setConditionIcon] = useState("");

  const [windSpeed, setWindSpeed] = useState(0);
  const [windDegree, setWindDegree] = useState(0);
  const [windDirection, setWindDirection] = useState("");

  const [humidity, setHumidity] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [uv, setUv] = useState(0);
  const [precip, setPrecip] = useState(0);

  useEffect(() => {
    if (location) {
      axios
        .get(`http://api.weatherapi.com/v1/current.json`, {
          params: {
            key: apiKey,
            q: `${location.latitude},${location.longitude}`,
            aqi: "no",
          },
        })
        .then((res) => {
          const locationData = res.data.location;
          const currentData = res.data.current;

          setLocationName(locationData.name);
          setRegion(locationData.region);
          setCountry(locationData.country);

          setTemp(currentData.temp_c);
          setFeels(currentData.feelslike_c);
          setCondition(currentData.condition.text);
          setConditionIcon(currentData.condition.icon);

          setWindSpeed(currentData.wind_kph);
          setWindDegree(currentData.wind_degree);
          setWindDirection(currentData.wind_dir);

          setHumidity(currentData.humidity);
          setVisibility(currentData.vis_km);
          setUv(currentData.uv);
          setPrecip(currentData.precip_mm);
        })
        .catch((err) => console.log("Error: ", err));
    } else {
      getLocation();
    }
  }, [location, apiKey]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          if (error.code === error.PERMISSION_DENIED) {
            // If permission is denied, keep asking
            getLocation();
          }
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <div className="max-w-3xl min-h-screen mx-auto flex flex-col justify-center items-center py-4 px-4 text-neutral-800">
        <h1 className="text-3xl font-medium">Astra Weather</h1>
        <h2>{locationName}</h2>
        <h3>{region}</h3>
        <h4>{country}</h4>
        <img
          src={conditionIcon}
          alt="Icon that reflects the current weather condition"
        />
        <p>{condition}</p>
        <p>{temp} °C</p>
        <p>Feels like {feels} °C</p>
        <p>{windSpeed} kph</p>
        <p>{windDegree} degrees</p>
        <p>Wind Direction: {windDirection}</p>
        <p>{humidity} humidity</p>
        <p>{visibility} km</p>
        <p>{uv} UV</p>
        <p>{precip} mm</p>
        <button onClick={getLocation}>Update Location</button>
      </div>
    </>
  );
}

export default App;
