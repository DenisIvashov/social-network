import { useState } from "react";
import './Post.css'

function Post({post, toggleLike, addComment, deletePost}) {
    const [comentInput, setComentInput] = useState ('')
    const isLiked = post.liked;

    return (
      <div className="post-card">
        <h3 className="post-author">{post.author}</h3>
        <p className="post-text">{post.text}</p>
        <div className="post-actions">
          <button
            className={`like-btn ${isLiked ? "liked" : ""}`}
            onClick={() => toggleLike(post.id)}
            type="button"
          >
            ❤️ {post.likes}
          </button>
          <button onClick={() => deletePost(post.id)}>Удалить пост</button>
        </div>
        <div className="comment-input-group">
          <input
            type="text"
            className="comment-input"
            value={comentInput}
            onChange={(e) => setComentInput(e.target.value)}
          />
          <button
            className="add-comment-btn"
            onClick={() => {
              addComment(post.id, comentInput);
              setComentInput("");
            }}
          >
            Добавить коментарий
          </button>
          
        </div>
        <div className="comments-list">
            {post.comments.map((comment, index) => (
              <p key={index} className="comment-item">
                {comment}
              </p>
            ))}
          </div>
      </div>
    );
}

export default Post;