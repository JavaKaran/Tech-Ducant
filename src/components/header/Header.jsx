import "./header.css";

const Header = () => {
    return(
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleLg">TechDucant</span>
            </div>
            <img className="headerImg"
                 src="https://cdn.pixabay.com/photo/2017/10/10/21/47/laptop-2838921_960_720.jpg"
                 alt=""
            />     
        </div>
    );
};

export default Header;