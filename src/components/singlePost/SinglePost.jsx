import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {Link}from "react-router-dom";
import { Context } from "../../context/Context";
import axios from 'axios';
import "./singlePost.css";

const SinglePost = () => {
    const { pathname } = useLocation();
    const path = pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = `${process.env.REACT_APP_API}/images/`;
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [categories, setCategories] = useState([]);
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`/api/posts/` + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setCategories(res.data.categories);
        };
        getPost();
    }, [path]);

    const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/posts/${post._id}`, {
                data: {
                    username: user.username
                },
            });
            window.location.replace("/");
        } catch(err) {}
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
                categories
            });
            setUpdateMode(false)
        } catch(err) {}
    };

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img src={PF + post.photo} alt="" className="singlePostImg" />
                )}
                {updateMode ? (
                    <input 
                        type="text"
                        value={title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i 
                                    className="singlePostIcon far fa-edit"
                                    onClick={() => setUpdateMode(true)}
                                ></i>
                                <i
                                    className="singlePostIcon far fa-trash-alt"
                                    onClick={handleDelete}
                                ></i>
                            </div>
                        )} 
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author: 
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">
                        {new Date(post.createdAt).toDateString()}
                    </span>
                </div>
                {updateMode ? (
                    <textarea
                        className="singlePostDescInput"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ) : (
                    <p className="singlePostDesc">{desc}</p>
                )}
                {updateMode ? (
                    <input
                        type="text"
                        className="singlePostCategoryInput"
                        value={categories}
                        onChange={(e) =>
                            setCategories(
                                e.target.value
                                .split(",")
                                .map((item) => capitalizeFirstLetter(item.trim()))
                        )
                    }
                />
                ) : (
                    <div className="singlePostCategory">
                        {categories.map((c,i) => (
                            <span key={i} className="singleCat">
                            <Link to={`/?cat=${c}`} className="link">
                                {c}
                            </Link>
                        </span>
                        ))}
            </div>
                )}
                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                    Update
                    </button>
                )}
            </div>
        </div>
    );
};

export default SinglePost;