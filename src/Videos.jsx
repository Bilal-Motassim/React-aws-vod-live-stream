import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import './App.css';
import Card from "./Card";
import ReactPlayer from 'react-player';

const Videos = () => {
    const [uploading, setUpload] = useState(false);
    const [selectedfile, setfile] = useState(null);
    const [videos, setvideos] = useState([]);
    const [playingvideo, playvideo] = useState(null);

    useEffect(() => {
        const getVideos = async () => {
            axios.get(`http://localhost:8080/api/video/s3/1`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                console.log(res.data);
                setvideos(res.data);
            }).catch((err) => {
                console.log(err.message);
            })
        }
        getVideos();
    }
        , [uploading])

    const HandleFile = (e) => {
        if (e.target.files) {
            setfile(e.target.files[0]);
            console.log(e.target.files[0]);
        }
    }
    const PlayVideo = (e, id) => {
        console.log(e.target);
        console.log(id);
        playvideo(`https://d743bzjmzqzz0.cloudfront.net/assets/${id}/HLS/${id}.m3u8`);
    }
    const UploadFile = async () => {
        if (selectedfile !== null) {
            try {
                setUpload(true);
                const Data = new FormData();
                Data.append('file', selectedfile);
                await axios.post(`http://localhost:8080/api/video/s3/1`, Data, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    console.log(res.data);
                })
                    .catch((err) => {
                        console.log(err.message);
                    });
            } catch (err) {
                console.log(err);
            }
            setUpload(false);
        }
    }


    const playerRef = useRef(null);
    const [level, setlevel] = useState(null);

    const handlePlayerReady = () => {
        if (playerRef.current) {
            const hlsPlayer = playerRef.current.getInternalPlayer('hls');
            if (hlsPlayer) {

                const levels = hlsPlayer.levels;
                console.log('Available quality levels:', levels);

                setlevel(hlsPlayer.currentLevel);
            }
        }
    };

    const changeLevel = (i) => {
        if (playerRef.current) {
            setlevel(i);
            const hlsPlayer = playerRef.current.getInternalPlayer('hls');
            if (hlsPlayer) {
                hlsPlayer.currentLevel = i;
            }
        }
    }






    return (
        <Container>
            <Row style={{width:"50%"}}>
                <h1>Upload a video</h1>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Video path:</Form.Label>
                    <Form.Control id="file" accept=".mp4" type="file" onChange={HandleFile} />
                </Form.Group>
                {selectedfile && (
                    <section>
                        File details:
                        <ul>
                            <li>Name: {selectedfile.name}</li>
                            <li>Type: {selectedfile.type}</li>
                            <li>Size: {parseFloat(selectedfile.size / 1024 / 1024).toFixed(2)} MB</li>
                        </ul>
                    </section>
                )}
                {uploading ? <Button variant="success" disabled>Upload a video</Button>
                    : <Button variant="success" onClick={UploadFile}>Upload a video</Button>}

            </Row>


            <Row>
                <h1>Your Videos</h1>
                <div className="App">
                    <div className="row">
                        {videos.map((v) => {
                            return (<div style={{ maxWidth: 300 }}>
                                <Card
                                    image={`https://d743bzjmzqzz0.cloudfront.net/assets/${v.videoid}/Thumbnails/${v.videoid}.0000002.jpg`}
                                    title={v.videoname}
                                    owner="Nom du propriétaire 1"
                                />
                                <Button onClick={(event) => { PlayVideo(event, v.videoid) }} variant="outline-danger">Play</Button>
                            </div>
                            )
                        })}
                    </div>
                </div>
                {videos.map((v, i) => {
                    return
                })}
            </Row>

            <Row>
                {playingvideo && (<>
                    <ReactPlayer
                        ref={playerRef}
                        url={playingvideo}
                        controls
                        onReady={handlePlayerReady}
                    />
                    <Button style={{width:100, height:50, margin:5}} onClick={() => changeLevel(0)}>360p</Button>
                    <Button style={{width:100, height:50, margin:5}} onClick={() => changeLevel(1)}>480p</Button>
                    <Button style={{width:100, height:50, margin:5}} onClick={() => changeLevel(2)}>720p</Button>
                </>
                )}
            </Row>

        </Container>
    );
}

export default Videos;