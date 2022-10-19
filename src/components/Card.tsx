import { useNavigate } from "react-router-dom";
import { IoMdClose } from 'react-icons/io';
import "./Card.css";

export default function Card(city: any){

    const navigate : any = useNavigate();

    function onMoreInfo() : void {
        navigate(`/more?lat=${city.lat}&lon=${city.lon}`);
    }

    function onClose(e : any) : void {
        e.stopPropagation();
        city.onClose(city.id);
    }

    return (
        <div className="cardWeather pointer" onClick={onMoreInfo}>
            <IoMdClose className="moreBtnBack" onClick={onClose} />
            <div>
                <div className="pt-4 pb-1">   
                    <img className="cardImg" src={"http://openweathermap.org/img/wn/"+city.img+"@2x.png"} alt="404"></img>
                </div>
                <div className="ps-3 pe-3">                    
                    <h1 className={city.name.length < 15 ? "cardTitle" : "cardTitle cardTxt16"}>{city.name}</h1>
                    <span id="cardMax">{city.max}°C</span>
                    <span id="cardMin">{city.min}°C</span>
                    <p>{city.description}</p>
                </div>
            </div>
        </div>
    )
}

