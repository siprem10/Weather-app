import WeatherCard from "./WeatherCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteById } from "../redux/slices/cities";
import NotResults from "./NotResults";

export default function WeatherCards() {

  const cities = useSelector((state: any) => state.cities);
  const dispatch = useDispatch<any>();

  function onClose(id: number): void {
    dispatch(deleteById(id));
  }

  return (
    <div className="container-fluid">
      <div className="col d-flex justify-content-center flex-wrap">
        {cities.list?.map((c: any) =>
          <WeatherCard
            key={c.id}
            max={c.max}
            min={c.min}
            name={c.name}
            description={c.description}
            img={c.img}
            id={c.id}
            lat={c.lat}
            lon={c.lon}
            onClose={() => onClose(c.id)}
          />
        )}
        <NotResults cities={cities.list}/>
      </div>
    </div>
  );
}