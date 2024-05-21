import axios from "axios";
import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";

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

  const [day1Name, setDay1Name] = useState("");
  const [day2Name, setDay2Name] = useState("");
  const [day3Name, setDay3Name] = useState("");

  useEffect(() => {
    async function fetchWeatherForecast() {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json`,
          {
            params: {
              key: apiKey,
              q: `${location.latitude},${location.longitude}`,
              days: 4,
            },
          }
        );

        const forecast = response.data.forecast.forecastday;

        setDay1Temp(forecast[1].day.avgtemp_c);
        setDay2Temp(forecast[2].day.avgtemp_c);
        setDay3Temp(forecast[3].day.avgtemp_c);

        setDay1Condition(forecast[1].day.condition.text);
        setDay2Condition(forecast[2].day.condition.text);
        setDay3Condition(forecast[3].day.condition.text);

        setDay1Icon(forecast[1].day.condition.icon);
        setDay2Icon(forecast[2].day.condition.icon);
        setDay3Icon(forecast[3].day.condition.icon);

        const today = new Date();
        setDay1Name(format(addDays(today, 1), "EEEE"));
        setDay2Name(format(addDays(today, 2), "EEEE"));
        setDay3Name(format(addDays(today, 3), "EEEE"));
      } catch (error) {
        console.error("Error fetching weather forecast:", error);
      }
    }

    if (location) {
      fetchWeatherForecast();
    }
  }, [location, apiKey]);

  return (
    <div className="w-full text-center">
      <h1 className="text-xl font-bold py-2">3 Day Forecast</h1>
      <div className="w-full flex flex-row justify-evenly items-center px-2">
        <div className="w-full flex flex-col px-4 py-4 justify-center items-center gap-2 font-medium">
          <p className="font-bold">{day1Name}</p>
          <img src={day1Icon} alt="Icon of the day's condition" />
          <p className="w-full">{day1Condition}</p>
          <p>{day1Temp}&deg;C</p>
        </div>
        <div className="w-full flex flex-col px-4 py-4 justify-center items-center gap-2 font-medium">
          <p className="font-bold">{day2Name}</p>
          <img src={day2Icon} alt="Icon of the day's condition" />
          <p className="w-full">{day2Condition}</p>
          <p>{day2Temp}&deg;C</p>
        </div>
        <div className="w-full flex flex-col px-4 py-4 justify-center items-center gap-2 font-medium">
          <p className="font-bold">{day3Name}</p>
          <img src={day3Icon} alt="Icon of the day's condition" />
          <p className="w-full">{day3Condition}</p>
          <p>{day3Temp}&deg;C</p>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
