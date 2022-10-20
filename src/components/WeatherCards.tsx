import { useEffect } from "react";
import WeatherCard from "./WeatherCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteById } from "../redux/slices/cities";
import NotResults from "./NotResults";
import { setViewScrollY } from "../utils/scroll";

export default function WeatherCards() {

  const cities = useSelector((state: any) => state.cities);
  const savedScrollY : number = cities.scrollY;
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if(savedScrollY !== 0){
      setViewScrollY(savedScrollY);
    }
  }, []);

  function onClose(id: number): void {
    dispatch(deleteById(id));
  }

  return (
    <div className="container-fluid">
      <div className="col d-flex justify-content-center flex-wrap">
        {cities.list?.map((c: any) =>
          <WeatherCard
            key={c.id}
            tempMax={c.tempMax}
            tempMin={c.tempMin}
            name={c.name}
            description={c.description}
            icon={c.icon}
            id={c.id}
            onClose={() => onClose(c.id)}
          />
        )}
        <NotResults cities={cities.list}/>
      </div>
    </div>
  );
}