import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCityMoreInfo } from "../redux/slices/cities";
import { IoMdArrowRoundBack } from 'react-icons/io';
import "./More.css";

export default function Card() {

    const params: any = useLocation().search;
    const dispatch: any = useDispatch();
    const city: any = useSelector((state: any) => state.cities.moreInfo);
    const navigate: any = useNavigate();
    console.log(params)
    useEffect(() => {
        dispatch(addCityMoreInfo(params));
    }, [dispatch]);

    function onBack(): void {
        navigate(`/`);
    }

    return (
        <div className="container-fluid">
            <div className="col d-flex justify-content-center flex-wrap">
                <div className="card cardWeather">
                    <IoMdArrowRoundBack className="moreBtnBack" onClick={onBack} />
                    <div className="card-body">
                        {/* <img id="cardImg" src={"http://openweathermap.org/img/wn/"+city.img+"@2x.png"} alt="404"></img>
                <h1 className={city.name.length < 15 ? "cardTitle" : "cardTitle cardTxt16"}>{city.name}</h1>
                <span id="cardMax">{city.max}°C</span>
                <span id="cardMin">{city.min}°C</span>
                <p>{city.description}</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

