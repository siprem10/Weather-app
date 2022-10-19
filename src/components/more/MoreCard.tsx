import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCityMoreInfo } from "../../redux/slices/cities";
import { IoMdArrowRoundBack } from 'react-icons/io';
import "./MoreCard.css";

export default function MoreCard() {

    const params: any = useLocation().search;
    const dispatch: any = useDispatch();
    const moreInfo: any = useSelector((state: any) => state.cities.moreInfo);
    const navigate: any = useNavigate();
    
    useEffect(() => {
        dispatch(addCityMoreInfo(params));
    }, [dispatch]);

    function onBack(): void {
        navigate(`/`);
    }

    return (
        <div className="container-fluid">
            <div className="col d-flex justify-content-center flex-wrap">
                <div className="cardWeather">
                    <IoMdArrowRoundBack className="moreBtnBack" onClick={onBack} />
                    <div className="">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

