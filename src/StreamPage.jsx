import React, { useEffect, useState } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';

const StreamPage = () => {
  const [comments, setComments] = useState([
    { name: 'Alice', message: 'This is really interesting!' },
    { name: 'Bob', message: 'Wow, great video. Thanks for sharing.' },
    { name: 'Charlie', message: 'Can anyone explain this part?' }
  ]);
  const [input, setInput] = useState('');
  const [url, seturl] = useState("");

  let { username } = useParams();

  useEffect(()=>{
    const getUrl = async () => {
      await axios.get(`http://localhost:8080/api/users/stream/${username}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      }).then((res)=>{
        console.log(res.data);
        seturl(res.data)
      }).catch((err)=>{
        console.log(err.message);
      })
    }
    getUrl();
  },[])

  const addComment = () => {
    if (input.trim()) {  // Check if input is not just whitespace
      const newComment = { name: "Anonymous", message: input }; // Default name as 'Anonymous'
      setComments(prevComments => [...prevComments, newComment]);
      setInput('');  // Clear the input after submitting
    }
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addComment();  // Submit comment on Enter key press
    }
  };

  return (
    <div className="stream-container">
      <div className="video-container">
        <ReactPlayer width={"100%"} height={"100%"} url={url} controls/>
      </div>
      <div className="chat-container">
        <div className="messages">
          {comments.map((comment, index) => (
            <div key={index} className="message">
              <strong>{comment.name}:</strong> {comment.message}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your comment..."
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            style={{ width: '85%' }}  // Make the input take up most of the container width
          />
          <button onClick={addComment} style={{ width: '15%' }}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default StreamPage;
