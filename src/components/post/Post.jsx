import "./post.css";
import {Link} from "react-router-dom";

const Post = ({post}) => {
    return (
        <div className="post">
            {post.photo && <img className="postImg" src={post.photo} alt="" />}
            <div className="postInfo">
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle">{post.title}</span>
                </Link>
                <hr />
                <span className="postDate">
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>
            <p className="postDesc">{post.desc}</p> 
            <Link to={`/?user=${post.username}`} className="link">
                <span className="postSub">Author: {post.username}</span>
            </Link>    
            <div className="postCats">
                {post.categories.map((c, i) => (
                    <span key={i} className="postCat">
                        <Link to={`/?cat=${c}`} className="link">
                            {c}
                        </Link>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Post;