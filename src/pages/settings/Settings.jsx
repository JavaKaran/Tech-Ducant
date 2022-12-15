import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import "./settings.css";

const Settings = () => {
    const {user, isFetching, dispatch} = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [success, setSuccess] = useState(false);
    const [profilePic, setProfilePic] = useState(user.profilePic);

    const uploadPic = (pic) => {
        setFile(pic);
        if(pic) {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "notezipper");
            data.append("cloud_name", "karan-346");
            fetch("https://api.cloudinary.com/v1_1/karan-346/image/upload", {
                method: "post",
                body: data,
            })
            .then((res) => res.json())
            .then((data) => {
                setProfilePic(data.url.toString());
                // console.log(pic);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
            profilePic
        };
        
        try {
            const res = await axios.put(`/api/users/` + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data});
            res.data && window.location.replace("/");
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img 
                            src={file ? URL.createObjectURL(file) : profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => uploadPic(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input 
                        type="text"
                        placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input 
                        type="email"
                        placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isFetching && !success && <button className="settingsSubmit" type="submit">
                        Update
                    </button>}
                    {success && (
                        <span 
                            style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                        >
                            Profile has been updated!
                        </span>
                    )}
                </form>
            </div>
            <Sidebar />
        </div>
    );
};

export default Settings;