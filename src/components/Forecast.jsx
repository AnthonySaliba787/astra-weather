import axios from "axios";
import { useEffect, useState } from "react";

function Forecast({ location, setLocation }) {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [day1Temp, setDay1Temp] = useState(0);
  const [day2Temp, setDay2Temp] = useState(0);
  const [day3Temp, setDay3Temp] = useState(0);

  const [day1Condition, setDay1Condition] = useState("");
  const [day2Condition, setDay2Condition] = useState("");
  const [day3Condition, setDay3Condition] = useState("");

  const [day1Icon, setDay1Icon] = useState("");
  const [day2Icon, setDay2Icon] = useState("");
  const [day3Icon, setDay3Icon] = useState("");

  useEffect(() => {
    async function fetchWeatherForecast() {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json`,
          {
            params: {
              key: apiKey,
              q: `${location.latitude},${location.longitude}`,
              days: 3,
            },
          }
        );

        const forecast = response.data.forecast.forecastday;

        setDay1Temp(forecast[0].day.avgtemp_c);
        setDay2Temp(forecast[1].day.avgtemp_c);
        setDay3Temp(forecast[2].day.avgtemp_c);

        setDay1Condition(forecast[0].day.condition.text);
        setDay2Condition(forecast[1].day.condition.text);
        setDay3Condition(forecast[2].day.condition.text);

        setDay1Icon(forecast[0].day.condition.icon);
        setDay2Icon(forecast[1].day.condition.icon);
        setDay3Icon(forecast[2].day.condition.icon);
      } catch (error) {
        console.error("Error fetching weather forecast:", error);
      }
    }

    if (location) {
      fetchWeatherForecast();
    }
  }, [location, apiKey]);

  return (
    <div className="text-center">
      <h1 className="text-xl font-bold py-2">3 Day Forecast</h1>
      <div className="w-full flex flex-row justify-evenly items-center px-2">
        <div className="w-full flex flex-col px-4 py-4 justify-center items-center gap-2 font-medium">
          <img src={day1Icon} alt="Icon of the day's condition" />
          <p>{day1Condition}</p>
          <p>{day1Temp}&deg;C</p>
        </div>
        <div className="w-full flex flex-col px-4 py-4 justify-center items-center gap-2 font-medium">
          <img src={day2Icon} alt="Icon of the day's condition" />
          <p>{day2Condition}</p>
          <p>{day2Temp}&deg;C</p>
        </div>
        <div className="w-full flex flex-col px-4 py-4 justify-center items-center gap-2 font-medium">
          <img src={day3Icon} alt="Icon of the day's condition" />
          <p>{day3Condition}</p>
          <p>{day3Temp}&deg;C</p>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
