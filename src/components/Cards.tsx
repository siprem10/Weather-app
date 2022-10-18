import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { deleteById } from "../redux/slices/cities";
import NotResults from "./NotResults";

export default function Cards() {

  const cities = useSelector((state: any) => state.cities);
  const dispatch = useDispatch<any>();

  function onClose(id: number): void {
    dispatch(deleteById(id));
  }

  return (
    <div className="row">
      <div className="col d-flex justify-content-center flex-wrap">
        {cities.list?.map((c: any) =>
          <Card
            key={c.id}
            max={c.max}
            min={c.min}
            name={c.name}
            description={c.description}
            img={c.img}
            id={c.id}
            onClose={() => onClose(c.id)}
          />
        )}
        <NotResults cities={cities.list}/>
      </div>
    </div>
  );
}