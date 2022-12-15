import { useContext, useState } from "react";
import axios from "axios";
import {Context} from "../../context/Context";
import "./write.css"

const Write = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [photo, setPhoto] = useState("");
    const [categories, setCategories] = useState([]);
    const { user } = useContext(Context);

    const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

    const uploadImage = (image) => {
        setFile(image);
        if(image){
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "notezipper");
            data.append("cloud_name", "karan-346");
            fetch("https://api.cloudinary.com/v1_1/karan-346/image/upload", {
                method: "post",
                body: data,
            })
            .then((res) => res.json())
            .then((data) => {
                setPhoto(data.url.toString());
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            setPhoto(`${process.env.REACT_APP_API}/images/default_post.jpg`);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
            categories,
            photo
        };

        try {
            const res = await axios.post(`/api/posts`, newPost);
            window.location.replace(`/post/` + res.data._id);
        } catch(err) {}
    };

    return (
        <div className="write">
            {file && (
                <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style= {{ display: "none" }}
                        onChange={(e) => uploadImage(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <input
                        type="text"
                        placeholder="Enter categories seperated by ','"
                        className="writeInput categories"
                        onChange={(e) =>
                            setCategories(
                                e.target.value
                                .split(",")
                                .map((item) => capitalizeFirstLetter(item.trim()))
                            )
                        }
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea   
                        placeholder="Tell Your Story.."
                        type="text"
                        className="writeInput writeText"
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
};

export default Write;