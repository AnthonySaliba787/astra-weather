import axios from "axios";
import { useEffect, useState } from "react";
import { FiWind } from "react-icons/fi";
import { IoUmbrellaSharp, IoWaterSharp } from "react-icons/io5";
import Forecast from "./Forecast";

function CurrentWeather({ location, setLocation }) {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [locationName, setLocationName] = useState("");
  const [country, setCountry] = useState("");

  const [temp, setTemp] = useState(0);
  const [feels, setFeels] = useState(0);
  const [condition, setCondition] = useState("");

  const [windSpeed, setWindSpeed] = useState(0);

  const [humidity, setHumidity] = useState(0);
  const [precip, setPrecip] = useState(0);

  const defaultLatitude = 51.52; // Default latitude (London)
  const defaultLongitude = -0.11; // Default longitude (London)

  useEffect(() => {
    const fetchWeatherData = (latitude, longitude) => {
      axios
        .get(`http://api.weatherapi.com/v1/current.json`, {
          params: {
            key: apiKey,
            q: `${latitude},${longitude}`,
            aqi: "no",
          },
        })
        .then((res) => {
          const locationData = res.data.location;
          const currentData = res.data.current;

          setLocationName(locationData.name);
          setCountry(locationData.country);

          setTemp(currentData.temp_c);
          setFeels(currentData.feelslike_c);
          setCondition(currentData.condition.text);

          setWindSpeed(currentData.wind_kph);

          setHumidity(currentData.humidity);
          setPrecip(currentData.precip_mm);
        })
        .catch((err) => console.log("Error: ", err));
    };

    if (location) {
      fetchWeatherData(location.latitude, location.longitude);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
            fetchWeatherData(defaultLatitude, defaultLongitude);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        alert("Geolocation is not supported by this browser!");
        fetchWeatherData(defaultLatitude, defaultLongitude);
      }
    }
  }, [location, apiKey]);

  return (
    <>
      <div className="max-w-4xl flex flex-col justify-center items-center gap-2 bg-neutral-100 px-4 py-4 rounded-md shadow-md hover:scale-105 hover:shadow-lg duration-300">
        <h1 className="text-3xl font-bold py-2">Astra Weather</h1>
        <div className="w-full flex justify-center items-center px-4 py-2">
          <p className="text-lg text-center text-neutral-400">
            Right now in{" "}
            <span className="font-bold text-neutral-800">
              {locationName}, {country},
            </span>{" "}
            it's <span className="lowercase">{condition}.</span>
          </p>
        </div>

        <div className="w-full flex flex-col px-4 py-4 justify-center items-center">
          <div className="w-full flex flex-col justify-evenly items-center text-center gap-2">
            <p className="font-extralight text-5xl">{temp}&deg;C</p>
            <p className="font-medium text-sm pb-4">Feels like {feels}&deg;C</p>
          </div>
          <div className="w-full flex flex-row justify-evenly items-center py-4">
            <div className="w-full flex flex-col gap-1 justify-center items-center">
              <FiWind size={26} />
              <p>{windSpeed} kph</p>
            </div>
            <div className="w-full flex flex-col gap-1 justify-center items-center">
              <IoUmbrellaSharp size={26} />
              <p>{precip} mm</p>
            </div>
            <div className="w-full flex flex-col gap-1 justify-center items-center">
              <IoWaterSharp size={26} />
              <p>{humidity}%</p>
            </div>
          </div>
        </div>
        <Forecast location={location} setLocation={setLocation} />
      </div>
    </>
  );
}

export default CurrentWeather;
