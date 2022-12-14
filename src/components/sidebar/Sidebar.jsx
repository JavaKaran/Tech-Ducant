import { useEffect, useState } from "react";
import axios from 'axios';
import "./sidebar.css";

const Sidebar = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get(`/api/categories`);
            setCats(res.data);
        };
        getCats();
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    className="sidebarImage"
                    src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"
                    alt=""
                />
                <p>
                    Welcome, TechDucant is an application for all tech enthusiasts to write blogs of their interest and learn from other. Hope you enjoy!! 
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;