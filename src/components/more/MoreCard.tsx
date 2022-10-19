import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCityMoreInfo, cleanMoreInfo } from "../../redux/slices/cities";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';
import ByHour from "./ByHour";
import ByDay from "./ByDay";

import "./MoreCard.css";

export default function MoreCard() {

    const params: any = useLocation().search;
    const dispatch: any = useDispatch();
    const moreInfo: any = useSelector((state: any) => state.cities.moreInfo);
    const navigate: any = useNavigate();
    const [isLoading, setLoading]: any = useState(false);
    
    useEffect(() => {
        dispatch(addCityMoreInfo(params, 5, setLoading));

        return () => dispatch(cleanMoreInfo());
    }, [dispatch]);

    function onBack(): void {
        navigate(`/`);
    }
    
    function isMoreInfo() : boolean{
        return !isLoading && Object.keys(moreInfo).length > 0;
    }

    return (
        <div className="col d-flex justify-content-center flex-wrap">
            <div className="cardWeather cardMore">
                <IoMdArrowRoundBack className="moreBtnBack" onClick={onBack} />
                {isLoading && <div className="d-flex flex-row align-items-center pt-2 pb-2">
                    <MdLocationOn className="moreIconLocation" />                   
                    <h1 className="moreTitle">Loading...</h1>
                </div>}
                {isMoreInfo() && <>                                    
                    <div className="d-flex flex-row align-items-center pt-2 pb-2">
                        <MdLocationOn className="moreIconLocation" />                   
                        <h1 className="moreTitle">{moreInfo.cityName}</h1>
                    </div>
                    <div className="pb-2">
                        <ByHour list={moreInfo.listByHour}></ByHour>
                    </div>
                    <ByDay list={moreInfo.listByDay}></ByDay>                        
                </>}       
            </div>
        </div>
    )
}

