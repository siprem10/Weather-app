import { createSlice } from "@reduxjs/toolkit";
import {wordNormalize, wordCapitalize, alert } from "../../utils/utils";

export const citySlice = createSlice({
    name: "cities",
    initialState: {
        list: [],
    },
    reducers: {
        setCityList: (state, action) => {
            state.list = state.list.concat(action.payload);
        },
        
        deleteById: (state, action) => {
            state.list = state.list.filter((c : any) => c.id !== action.payload);
        }
    },
});

export const { setCityList, deleteById } = citySlice.actions;

export default citySlice.reducer;

export const addCity = (search: string) => (dispatch: any) => {
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then(response => response.json())
        .then((response) => {

            if (response.main !== undefined) {
                const city = {
                    search: wordNormalize(search),
                    min: Math.round(response.main.temp_min),
                    max: Math.round(response.main.temp_max),
                    img: response.weather[0].icon,
                    id: response.id,
                    wind: response.wind.speed,
                    temp: response.main.temp,
                    name: response.name,
                    country: response.sys.country,
                    weather: response.weather[0].main,
                    clouds: response.clouds.all,
                    latitud: response.coord.lat,
                    longitud: response.coord.lon,
                    description: wordCapitalize(response.weather[0].description)
                };
                dispatch(setCityList(city));
            } else {
                alert('Oops...', 'The city you are looking for does not exist!');
            }
        })
        .catch((error) => {
            console.log(error);
            alert('Oops...', 'Server problem!');
        });
};