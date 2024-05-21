import CurrentWeather from "./components/CurrentWeather";

function App() {
  return (
    <>
      <div className="w-screen min-h-screen mx-auto flex flex-col justify-center items-center py-4 px-4">
        <CurrentWeather />
      </div>
    </>
  );
}

export default App;
