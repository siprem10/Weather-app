import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocialIcon } from "react-social-icons";
import icon from "../assets/weather_icon.png";
import { addCity } from "../redux/slices/cities";
import { alert, wordNormalize } from "../utils/utils";

import "./Navbar.css";

export default function Navbar() {

   const dispatch = useDispatch<any>();
   const [search, setSearch] = useState<string>("");
   const cities = useSelector((state: any) => state.cities);

   function onSearch(e: React.ChangeEvent<HTMLInputElement>): void {
      setSearch(e.target.value);
   }

   function onCleanSearch(): void {
      setSearch("");
   }

   function onSubmit(): void {
      if (search === "") return;

      if (!checkIfExists(search)) {
         dispatch(addCity(search));
      } else {
         alert('Oops...', 'The city was already added!');
      }
      onCleanSearch();
   }

   function checkIfExists(search: string): boolean {
      return cities.list.find((c: any) => c.search === wordNormalize(search));
   }

   return (
      <nav className="navbar navbar-expand-lg">
         <div className="container">
            <div className="navbar-brand">
               <img className="navIcon" src={icon} alt="404"></img>
               <span className="navTitle">Weather App</span>
               <span className="navSpace"></span>
                  <SocialIcon target="_blank" rel="noreferrer" url="https://www.linkedin.com/in/rami-dominguez-full-stack/" fgColor="#fff" className="navIcon"></SocialIcon>
                  <SocialIcon target="_blank" rel="noreferrer" url="https://github.com/siprem10" fgColor="#fff" className="navIcon"></SocialIcon>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                  </li>
               </ul>
               <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                  <input
                     className="form-control me-2"
                     type="search"
                     placeholder="Find city..."
                     aria-label="Search"
                     value={search}
                     onChange={onSearch}
                  />
                  <button
                     className="btn btn-primary navBtnSearch"
                     onClick={onSubmit}
                     type="submit">Search
                  </button>
               </form>
            </div>
         </div>
      </nav>
   )
}