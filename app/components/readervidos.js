import { useState, useEffect } from "react";
import React from 'react';
import YouTube from 'react-youtube';
import { Readers } from "./data/reader_videos";
import styles from '../styles/reader_videos.module.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


export default function Readervideos() {
    const opts = {
        height: '390',
        width: '640',
    };
    
    const [data, setData] = useState([]);
    const [allVideos, setAllVideos] = useState([]);
    const [currentVideoId, setCurrentVideoId] = useState(null)
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const [nextPageToken, setNextPageToken] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedReader, setSelectedReader] = useState("");
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentTitle, setCurrentTitle] = useState("");


    const callAPI = async () => {
        const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${selectedPlaylistId}&key=AIzaSyCfgp_eSdygSeFf6MgWnItSjaHyoqrswRI&part=snippet&pageToken=${nextPageToken}`
        );
        const json = await response.json();
        setNextPageToken(json.nextPageToken);
        if (!json.items) {
            console.log("No items found in the response from the API");
            setData([]);
        } else {
            setAllVideos([...allVideos, ...json.items]);
            setData(json);
        }
        setLoading(false);
    }
    const handleReaderChange = (event) => {
        if(Readers[event.target.value]){
        setSelectedReader(event.target.value);
        setSelectedPlaylistId(Readers[event.target.value].playlistId);
        setAllVideos([]);
        setNextPageToken("");
        setIsDataFetched(false);
        }
    }
    useEffect(() => {
        if (selectedPlaylistId) {
            callAPI();
        }
    }, [selectedPlaylistId,nextPageToken]);
    const handlePagination = async () => {
        callAPI();
    }
    const handleClick = (videoId, videoTitle) => {
        const indexOfKaf = videoTitle.indexOf("كاملة");
        if (indexOfKaf === -1) {
        setCurrentVideoId(videoId);
        setCurrentTitle(videoTitle);
        setOpen(true);
        } else {
        const newTitle = videoTitle.substring(-1, indexOfKaf);
        setCurrentVideoId(videoId);
        setCurrentTitle(newTitle);
        setOpen(true);
        }
    }
        
    const videoGrid = {
         display: "grid",
        gridTemplateColumns: "repeat(3, 300px)",
        gridGap: "1em",
        margin: "0 auto",
        border: "1px solid black",
        
      };
      const handleDataFetch = () => {
        callAPI();
        setIsDataFetched(true);
    }
    



    const handleClose = () => {
        setOpen(false);
    }
    
    
    

    return (
        <div>
            <select value={selectedReader} onChange={handleReaderChange}>
            <option className={styles.option} value="">حدد القارئ </option>
            {Object.keys(Readers).map((reader, index) => {
                return (
                    <option key={index} value={reader}>{reader}</option>
                )
            })}
        </select>
        { <button onClick={handleDataFetch} className={styles.button}>عرض قائمه السور </button>}
        {isDataFetched && (
            <table className="m-auto ">
                <tbody>
                    <tr style={videoGrid}>
                        {allVideos.map((item, index) => {
                            const videoId = item.snippet.resourceId.videoId;
                            const videoTitle = item.snippet.title;
                            const indexOfKaf = videoTitle.indexOf("كاملة");
                            const newTitle = videoTitle.substring(-1, indexOfKaf);
                            return (
                                <td key={index} className="border border-slate-300 text-center ">
                                    <div onClick={() => handleClick(videoId, newTitle)}>
                                        <p>{newTitle}</p>
                                    </div>
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
            </table>
        )}
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{currentTitle}</DialogTitle>
            <DialogContent>
                <YouTube videoId={currentVideoId} opts={{width: '500px', height: '500px'}} className="youtube-video"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}


