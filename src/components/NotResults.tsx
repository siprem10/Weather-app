
import notResults from "../assets/notResults.png";
import "./NotResults.css";

export default function NotResults({ cities }: any) {

    return (
        <>
            {cities.length === 0 &&
                <div className="cardWeather">
                    <div>
                        <img id="notResultsImg" src={notResults} alt="404"></img>
                        <h5 className="txtPurple">Hello, search for a city to see the forecast...</h5>
                    </div>
                </div>}
        </>
    );
}