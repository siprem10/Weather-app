import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import icon from "../assets/weather_icon.png";
import { addCity } from "../redux/slices/cities";
import { alert, wordNormalize } from "../utils/utils";
import { FiMenu } from 'react-icons/fi';

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
      
      if (!checkIfExists(search)) {
         dispatch(addCity(search));
      } else {
         alert('Oops...', 'The city was already added!');
      }
      onCleanSearch();
   }

   function checkIfExists(search: string): boolean {
      return cities.list.find((c: any) => wordNormalize(c.search) === wordNormalize(search));
   }

   return (
      <nav className="navbar navbar-dark navbar-expand-lg">
         <div className="container">
            <div className="navbar-brand">
               <Link to="/">
                  <img className="navIcon" src={icon} alt="404"></img>
               </Link>
               <span className="navTitle me-1">Weather App</span>
               <SocialIcon target="_blank" rel="noreferrer" url="https://www.linkedin.com/in/rami-dominguez-full-stack/" fgColor="#fff" className="navIcon"></SocialIcon>
               <SocialIcon target="_blank" rel="noreferrer" url="https://github.com/siprem10" fgColor="#fff" className="navIcon"></SocialIcon>
            </div>
            <button className="navbar-toggler navbtnMenu" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <FiMenu className="navIconMenu" />
            </button>
            <div className="collapse show navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                  </li>
               </ul>
               <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                  <input
                     className="form-control me-2 navSearchbar"
                     type="search"
                     placeholder="Find city..."
                     aria-label="Search"
                     value={search}
                     onChange={onSearch}
                  />
                  <button
                     disabled={!search.length}
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