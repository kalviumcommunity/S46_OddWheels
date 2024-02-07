import carData from "./carsData.json";
import "./App.css";

function App() {
  console.log(carData);
  return (
    <>
      {carData.map((data) => (
        <div
          key={data._id}
          className="flex flex-col justify-center items-center"
        >
          <p>{data._id}</p>
          <img
            src={data.images}
            alt={`Car ${data._id}`}
            className="h-auto w-10/12"
          />
        </div>
      ))}
    </>
  );
}

export default App;
