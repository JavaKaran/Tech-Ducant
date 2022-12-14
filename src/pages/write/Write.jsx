import { useContext, useState } from "react";
import axios from "axios";
import {Context} from "../../context/Context";
import "./write.css"

const Write = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [photo] = useState("default_post.jpg")
    const [categories, setCategories] = useState([]);
    const { user } = useContext(Context);

    const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
            categories,
            photo
        };
        if(file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post(`/api/upload`, data);
            } catch(err) {}
        }

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
                        onChange={(e) => setFile(e.target.files[0])}
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