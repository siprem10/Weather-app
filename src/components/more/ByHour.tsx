import "./ByHour.css";

export default function ByHour({ list }: any) {

    return (
        <div className="d-flex flex-row justify-content-center">
            {list?.map((city: any, i: number) =>
                <div key={i} className="d-flex flex-column align-items-center">
                    <span className="">{city.hour}</span>
                    <img className="byHourIcon" src={city.icon} alt="404"></img>
                    <span className="">{city.temp}°</span>
                    <span className="">{city.humidity}%</span>
                </div>
            )}
        </div>
    )
}