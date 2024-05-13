import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [users, setusers] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      await axios.get("http://localhost:8080/api/users", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      }).then((res)=>{
        console.log(res.data);
        setusers(res.data);
      }).catch((err)=>{
        console.log(err.message);
      })
    }
    getUsers();
  }
    , [])













  return (
    <Container>
      <Row>
        <h1>Videos</h1>
        <Button onClick={() => nav('/videos')}>Videos</Button>
        <h1>Streams</h1>
        {users.map((v)=>{
          return (<Link to={`/stream/${v.username}`}>{v.username}</Link>);
        })}
      </Row>
    </Container>
  );
}

export default Home;
