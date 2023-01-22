
import { useState, useEffect } from "react";
import React from 'react';
import YouTube from 'react-youtube';
import { Readers } from "./data/reader_videos";
import styles from '../styles/reader_videos.module.css';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useContext } from "react";





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
        if (Readers[event.target.value]) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPlaylistId, nextPageToken]);
    const handlePagination = async () => {
        callAPI();
    }
    const handleClick = (videoId, videoTitle) => {
        console.log(videoId, videoTitle)
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
            {<button onClick={handleDataFetch} className={styles.button}>عرض قائمه السور </button>}
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
                                    <td key={index} className="text-center border border-slate-300 ">
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

            {/* <Dialog open={open} onClose={handleClose}>
            <h1>hi</h1>
            {console.log("hi")}
            
             <h1>{currentTitle}</h1>
            <div>
                <YouTube videoId={currentVideoId} opts={{width: '500px', height: '500px'}} className="youtube-video"/>
            </div>
            <div>
                <button onClick={handleClose} color="primary">
                    Close
                </button>
            </div> 
        </Dialog> */}
            <Transition.Root show={open} as={Fragment} >
                <Dialog
                    as="div"
                    className="relative z-10"
                   
                    onClose={handleClose}

                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto text-xl">
                        <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 "
                                enterTo="opacity-100 translate-y-0 "
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 "
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 "
                            >
                                <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-2xl sm:my-8 sm:w-full sm:max-w-md">
                                    {/* <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4"> */}
                                    <div className="w-full p-8 bg-white border-solid shadow-2xl rounded-3xl">
                                        <button
                                            onClick={close}
                                            className="float-left border-2 border-gray-400 border-solid rounded hover:border-3 hover:border-gray-700"
                                        >
                                            ❌
                                        </button>


                                        <h1>{currentTitle}</h1>
                                        <div>
                                            <YouTube videoId={currentVideoId} opts={{ width: '350px', height: '500px' }} className="youtube-video" />
                                        </div>
                                        <div>
                                            <button onClick={handleClose} color="primary">
                                                Close
                                            </button>

                                        </div>
                                        </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

        </div>
    )
}


