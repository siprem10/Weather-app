import { createSlice } from "@reduxjs/toolkit";
import { wordNormalize, wordCapitalize, alert } from "../../utils/utils";

export const citySlice = createSlice({
    name: "cities",
    initialState: {
        list: [],
        moreInfo: {}
    },
    reducers: {
        setCityList: (state, action) => {
            state.list = state.list.concat(action.payload);
        },

        deleteById: (state, action) => {
            state.list = state.list.filter((c: any) => c.id !== action.payload);
        },

        setCityMoreInfo: (state, action) => {
            state.moreInfo = action.payload;
        },
    },
});

export const { setCityList, deleteById, setCityMoreInfo } = citySlice.actions;

export default citySlice.reducer;

export const addCity = (search: string) => (dispatch: any) => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then(response => response.json())
        .then((response) => {

            if (response.main !== undefined) {
                const city = {
                    search: wordNormalize(search),
                    id: response.id,
                    min: Math.round(response.main.temp_min),
                    max: Math.round(response.main.temp_max),
                    img: response.weather[0].icon,
                    wind: response.wind.speed,
                    temp: response.main.temp,
                    name: response.name,
                    country: response.sys.country,
                    weather: response.weather[0].main,
                    clouds: response.clouds.all,
                    lat: response.coord.lon,
                    lon: response.coord.lat,
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

export const addCityMoreInfo = (params: string) => (dispatch: any) => {

    fetch(`https://api.openweathermap.org/data/2.5/forecast${params}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then(response => response.json())
        .then((response) => {

            if (response.cod !== undefined) {

                const city = {
                    listByHour: getCitiesByHour(response.list, 5),
                    listByDay: getCitiesByDay(response.list),
                };
                dispatch(setCityMoreInfo(city));

            } else {
                alert('Oops...', 'Server problem!');
            }
        })
        .catch((error) => {
            console.log(error);
            alert('Oops...', 'Server problem!');
        });
};

function getCitiesByHour(list: any, quantity: number): Array<any> {
    
    const listByHour : Array<any> = [];

    for (let i = 0; i < list.length && i < quantity; i++) {

        let element = list[i];

        const city = {
            date: element.dt_txt,
            icon: element.weather[0].icon,
            max: element.main.temp,
            humidity: element.main.humidity
        };
        listByHour.push(city);
        //console.log(city.date);
    }

    return listByHour;
}

function getCitiesByDay(list: any): Array<any> {

    const date: Date = new Date();
    const currentDay: number = date.getDate();
    const listByDay : Array<any> = [];

    const city = {
        iconDay: "",
        iconNight: "",
        max: "",
        min: "",
        humidity: ""
    };

    for (let i = 0; i < list.length; i++) {

        let element = list[i];
        let elementDay: number = Number(element.dt_txt.substring(8, 10));
        let elementHour: number = Number(element.dt_txt.substring(11, 13));

        if (currentDay === elementDay || (elementHour !== 9 && elementHour !== 21)) continue;

        if (elementHour === 9) {
            city.iconDay = element.weather[0].icon;
            city.max = element.main.temp_max;
            city.humidity = element.main.humidity;
        }

        if (elementHour === 21) {
            city.iconNight = element.weather[0].icon.replace("d", "n");
            city.min = element.main.temp_min;
            listByDay.push(city);
        }
        //console.log(elementHour);
    }
    return listByDay;
}
