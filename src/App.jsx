import { useState, useEffect } from 'react';
import Post from './components/Post';
import './App.css'

function App() {
  const [posts, setPosts] = useState(() => {
      const saved = localStorage.getItem('posts');
      return saved ? JSON.parse(saved) : [{
      id: 1,
      author: 'Денис',
      text: 'Отличная идея - стать програмистом в 44 года!',
      likes: 0,
      liked: false,
      comments: []
    },
    {
      id: 2,
      author: 'Егор',
      text: 'Это лучше чем на заводе',
      likes: 0,
      liked: false,
      comments: []
    },
    {
      id: 3,
      author: 'Алёна',
      text: 'Обажаю програмистов!',
      likes: 0,
      liked: false,
      comments: []
    }];
  });
  
  useEffect(() => {
      localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);
  const [input, setInput] = useState('');      
  const [author, setAuthor] = useState('');  

  function toggleLike(id) {
    const updated = posts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          liked: !item.liked,
          likes: item.liked ? item.likes - 1 : item.likes + 1,
        };
      }
      return item;
    });
    setPosts(updated);
  }

  function addComment(postId, text) {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, text],
        };
      }
      return post;
    });
    setPosts(updated);
  }

  function addPost() {
    if (!input.trim() || !author.trim()) return;
    setPosts([...posts, { id:Date.now(), author:author, text:input, likes: 0, liked: false, comments: [] }])
    setInput('')                                                   
    setAuthor('')
  } 

  function deletePost(id) {
    const updated = posts.filter((post) => post.id !== id);
    setPosts(updated);
  }

  return (
    <>
      <div className="app-container">
        <div className="post-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Новый пост"
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Ваше имя"
          />
          <button onClick={addPost}>Добавить</button>
        </div>

        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            toggleLike={toggleLike}
            addComment={addComment}
            deletePost={deletePost}
          />
        ))}
      </div>
    </>
  );
}

export default App
