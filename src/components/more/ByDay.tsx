import "./ByDay.css";

export default function ByDay({list} : any){

    console.log(list)

    return (
        <div className="d-flex flex-column align-items-center">
            {list?.map((city : any, i : number) => 
                <div key={i} className="d-flex flex-row justify-content-center">
                    <span>{city.day}</span>
                    <span>{city.humidity}%</span>
                    <img src={city.iconDay} alt="404"></img>
                    <img src={city.iconNight} alt="404"></img>
                    <span>{city.tempMax}°</span>
                    <span>{city.tempMin}°</span>
                </div>
            
            )}            
        </div>
    )
}