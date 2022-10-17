import "./Card.css";

export default function Card(city: any){
    return (
        <div className="col-8 col-md-6 col-lg-4">
            <div className="card cardWeather">
                <button type="button" onClick={() => city.onClose(city.id)} className="btn-close" aria-label="Close"></button>
                <div className="card-body">
                    <img id="cardImg" src={"http://openweathermap.org/img/wn/"+city.img+"@2x.png"}></img>
                    <h1 id="cardTitle">{city.name}</h1>
                    <span id="cardMax">{city.max}°C</span>
                    <span id="cardMin">{city.min}°C</span>
                    <p>{city.description}</p>
                </div>
            </div>
        </div>
    )
}

