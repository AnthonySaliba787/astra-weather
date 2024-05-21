import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  const [location, setLocation] = useState(null);

  return (
    <>
      <div className="w-screen min-h-screen mx-auto flex flex-col justify-center items-center py-4 px-4 duration-300">
        <CurrentWeather location={location} setLocation={setLocation} />
      </div>
    </>
  );
}

export default App;
