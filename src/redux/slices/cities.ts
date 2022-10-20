import { createSlice } from "@reduxjs/toolkit";
import { wordNormalize, wordCapitalize, alert } from "../../utils/utils";

export const citySlice = createSlice({
    name: "cities",
    initialState: {
        list: [],
        moreInfo: {},
        scrollY: 0
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

        cleanMoreInfo: (state) => {
            state.moreInfo = {};
        },

        setScrollY: (state, action) => {
            state.scrollY = action.payload;
        },
    },
});

export const { setCityList, deleteById, setCityMoreInfo, cleanMoreInfo } = citySlice.actions;

export default citySlice.reducer;

export const addCity = (search: string) => (dispatch: any) => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then(response => response.json())
        .then((response) => {

            if (response.main !== undefined) {
                const city = {
                    search: wordNormalize(search),
                    id: response.id,
                    tempMin: Math.round(response.main.temp_min),
                    tempMax: Math.round(response.main.temp_max),
                    icon: `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
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

export const addCityMoreInfo = (params: string, quantityByHour : number, setLoading : CallableFunction) => (dispatch: any) => {

    setLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/forecast${params}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then(response => response.json())
        .then((response) => {

            if (response.cod !== "404") {

                const city = {
                    cityName: response.city.name,
                    listByHour: getCitiesByHour(response.list, quantityByHour),
                    listByDay: getCitiesByDay(response.list),
                };
                dispatch(setCityMoreInfo(city));
            }
        })
        .catch((error) => {
            console.log(error);
            alert('Oops...', 'Server problem!');
        }).finally(() => setTimeout(() => setLoading(false), 200));
};

function getCitiesByHour(list: any, quantity: number): Array<any> {
    
    const listByHour : Array<any> = [];

    for (let i = 0; i < list.length && i < quantity; i++) {

        let element = list[i];

        const city = {
            date: element.dt_txt,
            hour: element.dt_txt.substring(11, 16),            
            icon: `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`,
            temp: Math.round(element.main.temp),
            pop: element.pop * 100
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
        day: "",
        iconDay: "",
        iconNight: "",
        tempMax: 0,
        tempMin: 0,
        pop: 0
    };

    for (let i = 0; i < list.length; i++) {

        const element = list[i];
        const elementDay: number = Number(element.dt_txt.substring(8, 10));
        const elementHour: number = Number(element.dt_txt.substring(11, 13));
        const day = new Date(element.dt_txt).toLocaleString('en-us', {  weekday: 'long' });

        if (currentDay === elementDay || (elementHour !== 12 && elementHour !== 21)) continue;

        if (elementHour === 12) {
            city.day = day;
            city.iconDay = `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`;
            city.tempMax = Math.round(element.main.temp_max);
            city.pop = element.pop * 100;
        }

        if (elementHour === 21) {
            city.iconNight = `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`;
            city.tempMin = Math.round(element.main.temp_min);

            if(city.tempMin > city.tempMax){
                [city.tempMin, city.tempMax] = [city.tempMax, city.tempMin];
            }

            listByDay.push({...city});
        }
        //console.log(elementHour);
    }

    return listByDay;
}
