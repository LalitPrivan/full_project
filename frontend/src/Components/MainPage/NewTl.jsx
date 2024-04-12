import React, { useState, useRef, useEffect } from 'react';
import { Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { Col, Button, Row } from 'react-bootstrap';
import "./MainPage.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import 'plyr/dist/plyr.css';
import ReactTooltip from 'react-tooltip';
import Hls from 'hls.js';
import Plyr from 'plyr';
import { AiOutlineFullscreen } from 'react-icons/ai'; // Import the resize icon
// import Filter from "./Filter";
import { faBackward, faPause, faPlay, faForward, faExpand, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./main.css";
import Location from "./Location";
import { Offcanvas } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import './Filter.css'; // Import the CSS file
import './Responsive.css'; // Import the CSS file
import { Modal, Form } from 'react-bootstrap';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

// import Location from './Location';
const New = () => {
    const [groupId, setGroupId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [videoDuration, setVideoDuration] = useState(0);
    const [timelineData, setTimelineData] = useState([]);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [showInput, setShowInput] = useState(false);
    const videoRef = useRef(null);
    const [selectedMatchTime, setSelectedMatchTime] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const timelineRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [marksGroupA, setMarksGroupA] = useState([]);
    const [marksGroupB, setMarksGroupB] = useState([]);
    const [matchPeriod, setMatchPeriod] = useState(null);
    const [selectedSubAction, setSelectedSubAction] = useState(null);
    const [selectedfoulAction, setSelectedFoulAction] = useState(null);
    const [assistNo, setAssistNo] = useState("");
    const [jerseyNo, setJerseyNo] = useState("");
    const [DefjerseyNo, setDefJerseyNo] = useState("");
    const [jerseyBNo, setJerseyBNo] = useState("");
    const [teamAPoints, setTeamAPoints] = useState([]);
    const [teamBPoints, setTeamBPoints] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null);
    const [shotType, setShotType] = useState("");
    const [missoffdefjn, setmissoffdefjn] = useState("");
    const [missType, setMissType] = useState("");
    const [reboundType, setReboundType] = useState("");
    const [locationVisible, setLocationVisible] = useState(false);
    const [clickedButton, setClickedButton] = useState(null);
    const [isButtonContainerOpen, setIsButtonContainerOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(1200); // 20 minutes in seconds
    const [time, setTime] = useState();
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    // State to track if data has been fetched
    const [currentTime, setCurrentTime] = useState('0:00.000');
    const [inputTime, setInputTime] = useState(0);
    // const [locationVisible, setLocationVisible] = useState(false);
    const [savedCoordinates, setSavedCoordinates] = useState(null); // State to store saved coordinates
    const [savedorCoordinates, setSavedorCoordinates] = useState(null); // State to store saved coordinates
    const [is2PCheckedTeamA, setIs2PCheckedTeamA] = useState(false);
    const [is3PCheckedTeamA, setIs3PCheckedTeamA] = useState(false);
    const [isFreeThrowCheckedTeamA, setIsFreeThrowCheckedTeamA] = useState(false);
    const [selectedShotTypesTeamA, setSelectedShotTypesTeamA] = useState([]);
    const [selectedJerseyNumbersTeamA, setSelectedJerseyNumbersTeamA] = useState([]);
    const [is2PCheckedTeamB, setIs2PCheckedTeamB] = useState(false);
    const [is3PCheckedTeamB, setIs3PCheckedTeamB] = useState(false);
    const [isFreeThrowCheckedTeamB, setIsFreeThrowCheckedTeamB] = useState(false);
    const [selectedShotTypesTeamB, setSelectedShotTypesTeamB] = useState([]);
    const [selectedJerseyNumbersTeamB, setSelectedJerseyNumbersTeamB] = useState([]);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [marksA, setMarksA] = useState([]);
    const [marksB, setMarksB] = useState([]);
    const [isFreeThrowChecked, setIsFreeThrowChecked] = useState(false);
    const [showStartButton, setShowStartButton] = useState(true);
    const [marksAData, setMarksAData] = useState([]);
    const [marksBData, setMarksBData] = useState([]);
    const [matchTime, setMatchTime] = useState('');
    const [a, setA] = useState([1, 2, 3, 4, 5]);
    const [b, setB] = useState([6, 7, 8, 9, 10]);
    const [latestPlayerIn, setLatestPlayerIn] = useState(null);
    const [latestPlayerOut, setLatestPlayerOut] = useState(null);

    const [formData, setFormData] = useState({
        match_time: 0,
        game_time: '',
        quarter: '',
        tag: '',
        shot: '',
        shot_type: '',
        sjn: '',
        ajn: '',
        miss_type: '',
        reb_type: '',
        miss_off_jn: '',
        miss_def_jn: '',
        made_assist: '',
        turnover_type: '',
        sloc: '',
        or_jn: '',
        dr_jn: '',
        foul_type: '',
        djn: ''

    });




    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    // Handle changes to form fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        fetchMarksData();
    }, [showModal]); // Adjust dependencies as needed

    const fetchedData = {
        ajn: "9",
        game_time: "00:20:00",
        match_time: 0,
        miss_type: "",
        quarter: "1ST QTR",
        reb_type: "",
        shot: "Made",
        shot_type: "Jump",
        sjn: "",
        sloc: { x: 445.5625, y: 171.671875 },
        tag: "2P"
    };
    const filteredData = {
        match_time: fetchedData.match_time,
        sjn: fetchedData.sjn,
    };


    // Handle form submission
    //    -----------------------------update all code here ------------------------
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const updateEndpoint = `http://127.0.0.1:8000/api/match/TeamA/update/?match_time=${formData.match_time}`;

    //         // Send a PUT request to update the existing data
    //         const response = await axios.put(updateEndpoint, formData);
    //         console.log('Data updated successfully:', response.data);

    //         // Fetch updated data after submission
    //         // await fetchMarksData();

    //         // Reset the form data with fetched values
    //         setFormData({
    //             match_time: response.data.match_time || '',
    //             game_time: response.data.game_time || '',
    //             quarter: response.data.quarter || '',
    //             tag: response.data.tag || '',
    //             shot: response.data.shot || '',
    //             shot_type: response.data.shot_type || '',
    //             sjn: response.data.sjn || '',
    //             ajn: response.data.ajn || '',
    //             miss_type: response.data.miss_type || '', // Add missing fields here
    //             reb_type: response.data.reb_type || '',   // Add missing fields here
    //             made_assist: response.data.made_assist || '', // Add missing fields here
    //             turnover_type: response.data.turnover_type || '', // Add missing fields here
    //             miss_off_jn: response.data.miss_off_jn || '',
    //             miss_def_jn: response.data.miss_def_jn || '',
    //             sloc: response.data.sloc || ''
    //             // Add other fields as needed
    //         });
    //         setShowModal(false);
    //     } catch (error) {
    //         console.error('Error updating data:', error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("this is groupId submit button", groupId);
            let updateEndpoints = []; // Initialize as an array instead of a string

            // Check the groupId and set the appropriate update endpoint
            if (groupId === 0) {
                updateEndpoints.push(`http://127.0.0.1:8000/api/match/TeamA/update/?match_time=${formData.match_time}`);
            } else if (groupId === 1) {
                updateEndpoints.push(`http://127.0.0.1:8000/api/match/TeamB/update/?match_time=${formData.match_time}`);
            }

            // If no valid update endpoint is found, log an error and return
            if (updateEndpoints.length === 0) { // Check if the array is empty
                console.error('Invalid groupId:', groupId);
                return;
            }

            // Send PUT requests to update data for all endpoints
            await Promise.all(updateEndpoints.map(async (updateEndpoint) => {
                try {
                    const response = await axios.put(updateEndpoint, formData);
                    console.log('Data updated successfully:', response.data);
                    // Assuming response.data contains updated data for both teams
                    setFormData({
                        match_time: response.data.match_time || '',
                        game_time: response.data.game_time || '',
                        quarter: response.data.quarter || '',
                        tag: response.data.tag || '',
                        shot: response.data.shot || '',
                        shot_type: response.data.shot_type || '',
                        sjn: response.data.sjn || '',
                        ajn: response.data.ajn || '',
                        miss_type: response.data.miss_type || '',
                        reb_type: response.data.reb_type || '',
                        made_assist: response.data.made_assist || '',
                        turnover_type: response.data.turnover_type || '',
                        miss_off_jn: response.data.miss_off_jn || '',
                        miss_def_jn: response.data.miss_def_jn || '',
                        sloc: response.data.sloc || '',
                        foul_type: response.data.foul_type || '',
                        djn: response.data.djn || '',
                        or_jn:response.data.or_jn||'',
dr_jn:response.data.dr_jn||'',

                        // Add other fields as needed
                    });
                } catch (error) {
                    console.error('Error updating data:', error);
                }
            }));

            setShowModal(false);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    const handleTimeClick = (matchTime) => {
        if (videoRef.current) {
            const timeInSeconds = matchTime / 1000; // Convert milliseconds to seconds
            videoRef.current.currentTime = timeInSeconds;
        }
    };


    const handleSaveLocation = (coordinates) => {
        // Handle the saved coordinates here
        console.log("Saved coordinates:", coordinates);
        // let loca=coordinates;
        setSavedCoordinates(coordinates); // Save coordinates to state
    };
    const handleToggleOffcanvas = () => {
        setShowOffcanvas(!showOffcanvas);
    };

    let scale = 1; // Initial scale
    let offsetX = 0;
    let offsetY = 0;
    const maxScale = 5; // Maximum allowed scale
    const minScale = 0.5; // Minmum allowed scale
    const zoomVideo = () => {
        const video = videoRef.current;
        if (video) {
            const rect = video.getBoundingClientRect();
            const mousePositionX = offsetX - rect.left;
            const mousePositionY = offsetY - rect.top;
            const transformOriginX = `${(mousePositionX / rect.width) * 100}%`;
            const transformOriginY = `${(mousePositionY / rect.height) * 100}%`;
            video.style.transform = `scale(${scale})`;
            video.style.transformOrigin = `${transformOriginX} ${transformOriginY}`;
            video.style.transition = 'transform 1s';
        }
    };
    const [customTime, setCustomTime] = useState(0);

    // match quater time code
    const startTimer = () => {
        setIsTimerRunning(true); // Start the game timer
        if (videoRef.current) {
            videoRef.current.play(); // Start video playback
        }
    };

    // Modify stopTimer to stop both the game timer and video playback
    const stopTimer = () => {
        setIsTimerRunning(false); // Stop the game timer
        if (videoRef.current) {
            videoRef.current.pause(); // Pause video playback
        }
    };

    const resetTimer = () => {
        setTimer(20 * 60);
        setIsTimerRunning(false);
    };

    useEffect(() => {
        let intervalId;

        if (isTimerRunning && timer > 0) {
            // Calculate the interval duration based on the playback speed
            const intervalDuration = 1000 / playbackSpeed;

            intervalId = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        setIsTimerRunning(false); // Stop the timer when it reaches 0
                        return 0;
                    } else {
                        return prevTimer - 1;
                    }
                });
            }, intervalDuration);
        } else {
            clearInterval(intervalId);
        }

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [isTimerRunning, playbackSpeed, timer]);


   
      useEffect(() => {
        if (selectedItemId !== null) {
          // Find the selected item in the timelineData
          const selectedItem = timelineData.find(item => item.id === selectedItemId);
          if (selectedItem && selectedItem.game_time) {
            // Set the timer to the game_time of the selected item
            const game_time_seconds = selectedItem.game_time.split(':').reduce((acc, val) => acc * 60 + (+val), 0);
            setTimer(game_time_seconds);
          }
        }
      }, [selectedItemId, timelineData]);
    


      const moveTimeBackward = () => {
        setTimer(prevTimer => {
            // Check if the timer is already at 0 seconds
            if (prevTimer <= 0) {
                return 0; // If so, keep it at 0
            } else {
                // Move time back by 1 second
                return prevTimer - 1;
            }
        });
    };
    
    const moveTimeForward = () => {
        setTimer(prevTimer => {
            // Check if the timer has reached 20 minutes (1200 seconds)
            if (prevTimer >= 1200) {
                return 1200; // If so, keep it at 20 minutes
            } else {
                // Move time forward by 1 second
                return prevTimer + 1;
            }
        });
    };
    

    const handleKeyPress = (event) => {
        if (event.code === 'KeyW') {
            // Handle 's' key press: Move time back by 5 seconds
            moveTimeBackward();
        } else if (event.code === 'KeyR') {
            // Handle 'f' key press: Move time forward by 5 seconds
            moveTimeForward();
        }
    };

    useEffect(() => {
        // Add event listener for keydown event on the document
        document.addEventListener('keydown', handleKeyPress);

        // Clean up event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []); // Empty dependency array means this effect runs only once, on mount


     // useEffect(() => {
    //     // Update timer every second when video is playing
    //     const interval = setInterval(() => {
    //       if (!videoRef.current.paused && timer > 0) {
    //         setTimer(timer - 1);
    //       }
    //     }, 1000);
    
    //     // Clear interval on component unmount
    //     return () => clearInterval(interval);
    //   }, [timer]);
    
      // const formatTime = (time) => {
      //   const minutes = Math.floor(time / 60);
      //   const seconds = time % 60;
      //   return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      // };
      
    //   const formatTime = (time) => {
    //     const hours = Math.floor(time / 3600);
    //     const minutes = Math.floor((time % 3600) / 60);
    //     const seconds = Math.floor(time % 60);
    //     return `${hours.toString().padStart(2, "0")}:${minutes
    //       .toString()
    //       .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    //   };


    const handleWheel = (event) => {
        event.preventDefault();
        if (event.deltaY > 0) {
            // Zoom out on scrolling down
            scale = Math.max(minScale, scale / 1.2);
        } else {
            // Zoom in on scrolling up
            scale = Math.min(maxScale, scale * 1.2);
        }
        zoomVideo();
    };

    const handleMouseMoveVideo = (event) => {
        const video = videoRef.current;
        if (video) {
            offsetX = event.clientX;
            offsetY = event.clientY;
        }
    };

    const handleResizeIconClick = () => {
        // Reset the scale to 1
        scale = 1;
        zoomVideo();
    };

    useEffect(() => {
        const video = videoRef.current;
        const source = "https://vz-2123d255-4a7.b-cdn.net/7b2caa36-b50c-4cea-a67c-20d7f47971c2/playlist.m3u8";

        const defaultOptions = {};

        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(source);

            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                const availableQualities = hls.levels.map((l) => l.height);

                defaultOptions.controls = ['restart', 'rewind', 'play', 'fast-forward', 'progress', 'current-time', 'mute', 'volume', 'settings', 'pip', 'airplay', 'fullscreen'];

                defaultOptions.quality = {
                    default: availableQualities[0],
                    options: availableQualities,
                    forced: true,
                    onChange: (e) => updateQuality(e)
                };

                const plyrInstance = new Plyr(video, defaultOptions);

                // Set pointer-events for Plyr poster
                const plyrPoster = document.querySelector('.plyr__poster');
                if (plyrPoster) {
                    plyrPoster.style.pointerEvents = 'none';
                }

                // Intercept double-click event to prevent fullscreen
                video.addEventListener('dblclick', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                });

                // Add event listener to reset scale when exiting fullscreen
                document.addEventListener('fullscreenchange', function () {
                    if (!document.fullscreenElement) {
                        scale = 1; // Reset scale
                        video.style.transform = 'scale(1)';
                    }
                });

                // Add event listeners
                video.addEventListener('wheel', handleWheel);
                video.addEventListener('mousemove', handleMouseMoveVideo);
            });

            hls.attachMedia(video);
            window.hls = hls;
        }

        const updateQuality = (newQuality) => {
            window.hls.levels.forEach((level, levelIndex) => {
                if (level.height === newQuality) {
                    window.hls.currentLevel = levelIndex;
                }
            });
        };

        return () => {
            // Cleanup logic if needed
            // e.g., remove event listeners, dispose Plyr instance, etc.
            video.removeEventListener('wheel', handleWheel);
            video.removeEventListener('mousemove', handleMouseMoveVideo);
        };
    }, []);
    const handlePlayerInSelection = (playerIn) => {
        if (a.includes(playerIn) && b.length < 6) {
            const filteredA = a.filter(player => player !== playerIn);
            setB([...b, playerIn]);
            setA(filteredA);
            setLatestPlayerIn(playerIn);
        }
    };

    const handlePlayerOutSelection = (playerOut) => {
        if (b.includes(playerOut) && a.length < 5) {
            const filteredB = b.filter(player => player !== playerOut);
            setA([...a, playerOut]);
            setB(filteredB);
            setLatestPlayerOut(playerOut);
        }
    };



    // Render buttons in the UI with the modified arrays






    const toggleLocation = () => {
        setLocationVisible(!locationVisible);
    };

    const toggleButtonContainer = () => {
        setIsButtonContainerOpen(!isButtonContainerOpen);
    };

    // const renderButtons = (numbers, array) => {
    //     return numbers.map((number, index) => (
    //         <button key={index} onClick={() => onClick(array, index)}>
    //             {number}
    //         </button>
    //     ));
    // };


    // const handleNestedInputChange = (e, key, nestedKey) => {
    //     // Implement the logic to handle nested input changes
    //     // For example, you might update the state based on the nested key-value pair
    // };

    // const handleInputChange = (e, key) => {
    //     const { value } = e.target;
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [key]: value
    //     }));
    // };
    const handleInputChange = (e, key) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };


    useEffect(() => {
        if (!dataFetched) {
            fetchMarksData();
        }
    }, []);


    const handleNestedInputChange = (e, key, nestedKey) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                [nestedKey]: value
            }
        }));
    };



    useEffect(() => {
        if (!dataFetched) {
            fetchMarksData();
        }
    }, []);

    useEffect(() => {
        if (timelineData.length > 0 && videoDuration > 0) {
            initializeTimeline();
        }
    }, [timelineData, videoDuration]);



    const fetchMarksData = async (selectedShotTypesTeamA = [], selectedJerseyNumbersTeamA = [], selectedShotTypesTeamB = [], selectedJerseyNumbersTeamB = []) => {
        try {
            let apiUrlA = 'http://127.0.0.1:8000/api/match/TeamA/fetch/';
            let apiUrlB = 'http://127.0.0.1:8000/api/match/TeamB/fetch/';


            // Initialize query string for Team A and Team B separately
            let queryStringA = '';
            let queryStringB = '';

            // Append shot type query parameter for each selected shot type for Team A
            if (selectedShotTypesTeamA.length > 0) {
                selectedShotTypesTeamA.forEach((type, index) => {
                    queryStringA += `${index === 0 ? '?' : '&'}tag=${type}`;
                });
            }

            // Append sjn query parameter for Team A
            if (selectedJerseyNumbersTeamA.length > 0) {
                selectedJerseyNumbersTeamA.forEach((number, index) => {
                    queryStringA += `${index === 0 && selectedShotTypesTeamA.length === 0 ? '?' : '&'}sjn=${number}`;
                });
            }

            // Append shot type query parameter for 'Made', 'Miss', and 'Block' shots for Team A
            if (selectedShotTypesTeamA.includes('Made') || selectedShotTypesTeamA.includes('Miss') || selectedShotTypesTeamA.includes('Block')) {
                const shotTypes = ['Made', 'Miss', 'Block'].filter(type => selectedShotTypesTeamA.includes(type));
                queryStringA += `${queryStringA ? '&' : '?'}shot=${shotTypes.join('&shot=')}`;
            }

            // Append sjn query parameter for Team B
            if (selectedJerseyNumbersTeamB.length > 0) {
                selectedJerseyNumbersTeamB.forEach((number, index) => {
                    queryStringB += `${index === 0 && selectedShotTypesTeamB.length === 0 ? '?' : '&'}sjn=${number}`;
                });
            }

            // Append shot type query parameter for each selected shot type for Team B
            if (selectedShotTypesTeamB.length > 0) {
                selectedShotTypesTeamB.forEach((type, index) => {
                    queryStringB += `${index === 0 ? '?' : '&'}tag=${type}`;
                });
            }

            // Append shot type query parameter for 'Made', 'Miss', and 'Block' shots for Team B
            if (selectedShotTypesTeamB.includes('Made') || selectedShotTypesTeamB.includes('Miss') || selectedShotTypesTeamB.includes('Block')) {
                const shotTypes = ['Made', 'Miss', 'Block'].filter(type => selectedShotTypesTeamB.includes(type));
                queryStringB += `${queryStringB ? '&' : '?'}shot=${shotTypes.join('&shot=')}`;
            }

            // Concatenate query string to API URLs for Team A and Team B
            apiUrlA += queryStringA;
            apiUrlB += queryStringB;

            const responseA = await axios.get(apiUrlA);
            const responseB = await axios.get(apiUrlB);

            console.log('Response A:', responseA.data);
            console.log('Response B:', responseB.data);

            if (responseA && responseA.data && responseB && responseB.data) {
                const processMarks = (marks, group) => {
                    const updatedTimelineData = [];
                    marks.forEach(mark => {
                        const { match_time, game_time, quarter, tag, shot, shot_type, sjn, djn, ajn, miss_type, reb_type, foul_type, shot_foul, turnover_type, player_in_jn, player_out_jn } = mark;
                        let fullData = `Match Time: ${match_time}<br>Game Time: ${game_time}<br>Quarter: ${quarter}<br>Tag: ${tag}`;
                        const fields = [
                            `Shot: ${shot}`,
                            `Shot Type: ${shot_type}`,
                            `Shooter: ${sjn}`,
                            `Defender: ${djn}`,
                            `Assist: ${ajn}`,
                            `Player In: ${player_in_jn}`,
                            `Player Out: ${player_out_jn}`,
                            `Miss Type: ${miss_type}`,
                            `Rebound Type: ${reb_type}`,
                            `Foul Type: ${foul_type}`,
                            `Shot Foul: ${shot_foul}`,
                            `Turnover Type: ${turnover_type}`,
                        ];

                        fields.forEach(field => {
                            const value = field.split(":")[1].trim();
                            if (value !== "undefined" && value !== "null" && value !== "") {
                                fullData += `<br>${field}`;
                            }
                        });

                        const id = uuidv4();
                        if (!uniqueMarks.has(id)) {
                            uniqueMarks.add(id);
                            let content = tag;
                            if ((tag !== "Jump Ball" && tag !== "End Game" && tag !== "FOUL" && shot !== "OFFENSIVE") || tag === "TURNOVER") {
                                if (tag === "TURNOVER") {
                                    content += " " + turnover_type;
                                } else {
                                    content += " " + shot;
                                }
                            }
                            updatedTimelineData.push({
                                id: id,
                                start: match_time,
                                end: match_time + 100,
                                content: content,
                                group,
                                editable: false,
                                title: fullData,
                                game_time: game_time, 
                            });
                        }
                    });
                    return updatedTimelineData;
                };

                const marksA = responseA.data;
                const marksB = responseB.data;
                const uniqueMarks = new Set();
                const updatedTimelineData = [
                    ...processMarks(marksA, 0),
                    ...processMarks(marksB, 1)
                ];

                setTimelineData(updatedTimelineData);
                setDataFetched(true);
                setMarksAData(marksA);
                setMarksBData(marksB);
            } else {
                console.error('Invalid response or missing marks data.');
            }
        } catch (error) {
            console.error('Error fetching marks data:', error);
        }
    };

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                // Fetch data for Team A and Team B
                await fetchMarksData(selectedShotTypesTeamA, selectedJerseyNumbersTeamA, selectedShotTypesTeamB, selectedJerseyNumbersTeamB);

                // You can add more functions or code here if needed after fetching data
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error, if needed
            }
        };

        // Fetch data when the component mounts or when matchPeriod, selectedShotTypes, or selectedJerseyNumbers change
        fetchPoints();
    }, [matchPeriod, selectedShotTypesTeamA, selectedJerseyNumbersTeamA, selectedShotTypesTeamB, selectedJerseyNumbersTeamB]);


    const handleButtonClick = (index) => {
        if (assistNo === index + 1) {
            // If the same button is clicked again, reset the assistNo
            setAssistNo(null);
            setClickedButton(null);
        } else {
            setAssistNo(index + 1);
            setClickedButton(index + 1);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleSpaceKeyPress);
        return () => {
            document.removeEventListener('keydown', handleSpaceKeyPress);
        };
    }, []);

    // Function to handle space bar key press
    const handleSpaceKeyPress = (event) => {
        if (event.code === 'Space') {
            // Prevent default behavior (e.g., scrolling the page)
            event.preventDefault();
            // Toggle play/pause state of the video
            handlePlayPause();

            // Toggle the game timer based on video playback state
            if (videoRef.current) {
                if (videoRef.current.paused) {
                    setIsTimerRunning(false); // Pause the game timer
                } else {
                    setIsTimerRunning(true); // Start the game timer
                }
            }
        }
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    const formatDuration = (durationInSeconds) => {
        if (!isNaN(durationInSeconds)) {
            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);
            const seconds = Math.floor(durationInSeconds % 60);
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return "Loading..."; // Or any other default message when duration is not available
        }
    };

    const handleInputTimeChange = (e) => {
        const inputValue = parseInt(e.target.value);
        if (!isNaN(inputValue)) {
            // Adjust the scale when setting the video current time
            videoRef.current.currentTime = inputValue / 50;
            setTime(inputValue / 50);
            setInputTime(inputValue);
        }

    };


    const initializeTimeline = () => {
        if (!timelineRef.current) {
            const container = document.getElementById('timeline-container');
            const options = {
                start: 0,
                end: videoDuration * 1000,
                orientation: 'top',
                editable: {
                    add: false,
                    updateTime: false,
                    updateGroup: false,
                    remove: true,
                    overrideItems: false,
                },
                showCurrentTime: false,
                showMajorLabels: false,
                showMinorLabels: true,
                zoomMax: 30000,
                zoomMin: 1199,
                dataAttributes: [],
            };

            timelineRef.current = new Timeline(container, timelineData, options);

            timelineRef.current.on('dragstart', () => {
                setIsDragging(true);
            });
            timelineRef.current.on('dragend', () => {
                setIsDragging(false);
            });
            timelineRef.current.on("click", (properties) => {
                if (properties.item) {
                  const selectedItem = timelineRef.current.itemsData.get(properties.item);
                  if (selectedItem) {
                    const startTimeInSeconds = selectedItem.start / 1000;
                    videoRef.current.currentTime = startTimeInSeconds;
              
                    // Check if game_time is defined before splitting
                    if (selectedItem.game_time) {
                      // Convert game_time from seconds to minutes and seconds
                      const game_time_seconds = selectedItem.game_time.split(':').reduce((acc, val) => acc * 60 + (+val), 0);
                      const formattedGameTime = formatTime(game_time_seconds);
                      setTimer(game_time_seconds); // Update timer with game_time
                      console.log("Game Time in seconds:", game_time_seconds);
                      console.log("Formatted Game Time:", formattedGameTime);
                    } else {
                      console.error("Game time is not defined for the selected item.");
                      // You might want to handle this case differently, e.g., keep the timer unchanged or display an error message
                    }
              
                    setSelectedItemId(selectedItem.id); // Store the selected item ID
                    // setSelectedTeam(selectedItem.group === 0 ? "Team A" : "Team B");
                 
                  }
                }
              });

            // Context menu event handler
            timelineRef.current.on('contextmenu', (properties) => {
                handleContextMenu(properties);
            });

            timelineRef.current.setGroups([
                { id: 0, content: 'Team A' },
                { id: 1, content: 'Team B' }
            ]);

            updateTimelinePosition();
        } else {
            // If timeline container already exists, just update the data
            timelineRef.current.setItems(timelineData);
        }
    };
    const getVideoDuration = () => {
        if (videoRef.current && videoRef.current.duration) {
            setVideoDuration(Math.floor(videoRef.current.duration));
        }
    };

    const updateVideoTime = (newTime) => {
        if (!isDragging && videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
    };

    const updateTimelinePosition = () => {
        if (timelineRef.current) {
            const currentTime = videoRef.current.currentTime;
            timelineRef.current.moveTo(currentTime * 1000);
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('timeupdate', updateTimelinePosition);
        }
        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('timeupdate', updateTimelinePosition);
            }
        };
    }, []);

    // const handleEditClick = async () => {
    //     try {
    //         if (selectedItemId) {
    //             const selectedItem = timelineData.find(item => item.id === selectedItemId);

    //             if (!selectedItem) {
    //                 console.error('Selected item not found.');
    //                 return;
    //             }

    //             // const fetchEndpoint = `http://127.0.0.1:8000/api/match/TeamA/fetch/?match_time=${selectedItem.start}`;
    //             const fetchEndpoint = `http://127.0.0.1:8000/api/match/TeamA/fetch/?match_time=${selectedItem.start}`;
    //             const response = await axios.get(fetchEndpoint);

    //             console.log('Fetched Data for Editing:', response.data);
    //             const firstItem = response.data[0];

    //             // Set the fetched data to the formData state variable
    //             setFormData({
    //                 match_time: firstItem.match_time || 0,
    //                 game_time: firstItem.game_time || '',
    //                 quarter: firstItem.quarter || '',
    //                 tag: firstItem.tag || '',
    //                 shot: firstItem.shot || '',
    //                 shot_type: firstItem.shot_type || '',
    //                 sjn: firstItem.sjn || '',
    //                 ajn: firstItem.ajn || '',
    //                 miss_type: firstItem.miss_type || '',
    //                 reb_type: firstItem.reb_type || '',
    //                 made_assist: firstItem.made_assist || '',
    //                 miss_off_jn: firstItem.miss_off_jn || '',
    //                 miss_def_jn: firstItem.miss_def_jn || '',
    //                 turnover_type: firstItem.turnover_type || '',
    //                 sloc: firstItem.sloc || ''
    //                 // Add other fields as needed
    //             });

    //             // Show the modal
    //             setShowModal(true);
    //         } else {
    //             console.error('No item selected.');
    //         }
    //     } catch (error) {
    //         console.error('Error handling edit:', error);
    //     }
    // };

    const handleEditClick = async () => {
        try {
            if (!selectedItemId) {
                console.error('No item selected.');
                return;
            }

            const selectedItem = timelineData.find(item => item.id === selectedItemId);

            console.log('selectedItem: ', selectedItem);
            if (!selectedItem) {
                console.error('Selected item not found.');
                return;
            }

            // console.log(selectedItem.group)
            setGroupId(selectedItem.group);

            let fetchEndpoints = [];
            if (selectedItem.group === 0) {
                fetchEndpoints = [`http://127.0.0.1:8000/api/match/TeamA/fetch/?match_time=${selectedItem.start}`];
            } else if (selectedItem.group === 1) {
                fetchEndpoints = [`http://127.0.0.1:8000/api/match/TeamB/fetch/?match_time=${selectedItem.start}`];
            }

            const responseData = [];

            // Fetch data from the selected endpoint
            await Promise.all(fetchEndpoints.map(async (fetchEndpoint) => {
                try {
                    const response = await axios.get(fetchEndpoint);
                    responseData.push(response.data[0]); // Assuming you only need the first item
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }));

            console.log('Fetched Data for Editing:', responseData);

            // Merge data from multiple endpoints if needed
            const mergedData = responseData.reduce((acc, curr) => ({ ...acc, ...curr }), {});

            // Set the fetched data to the formData state variable
            setFormData({
                match_time: mergedData.match_time || 0,
                game_time: mergedData.game_time || '',
                quarter: mergedData.quarter || '',
                tag: mergedData.tag || '',
                shot: mergedData.shot || '',
                shot_type: mergedData.shot_type || '',
                sjn: mergedData.sjn || '',
                ajn: mergedData.ajn || '',
                miss_type: mergedData.miss_type || '',
                reb_type: mergedData.reb_type || '',
                made_assist: mergedData.made_assist || '',
                miss_off_jn: mergedData.miss_off_jn || '',
                miss_def_jn: mergedData.miss_def_jn || '',
                turnover_type: mergedData.turnover_type || '',
                sloc: mergedData.sloc || '',
                foul_type: mergedData.foul_type || '',
                djn: mergedData.djn || '',
                or_jn:mergedData.or_jn||'',
                dr_jn:mergedData.dr_jn||'',
                // Add other fields as needed
            });

            // Show the modal
            setShowModal(true);
        } catch (error) {
            console.error('Error handling edit:', error);
        }
    };


    const handleStartButtonClick = () => {
        setShowStartButton(false);
    };

    const handleJumpBallButtonClick = async () => {
      const currentTime = Math.floor(videoRef.current.currentTime * 1000); // Convert to milliseconds
      const newItems = [
          {
              id: uuidv4(),
              start: currentTime,
              end: currentTime + 100, // Adjust this if needed
              content: 'Jump Ball',
              group: 0,
              editable: false
          },
          {
              id: uuidv4(),
              start: currentTime,
              end: currentTime + 100, // Adjust this if needed
              content: 'Jump Ball',
              group: 1,
              editable: false
          }
      ];
  
      try {
          // Send POST requests to save jump ball marks for both Team A and Team B
          await axios.post('http://127.0.0.1:8000/api/match/TeamA/', {
              match_time: currentTime,
              quarter: matchPeriod,
              game_time: formatTime(timer),
              content: newItems[0].content,
              editable: newItems[0].editable,
              end: newItems[0].end,
              group: newItems[0].group,
              id: newItems[0].id,
              tag: newItems[0].content,
  
          });
  
          await axios.post('http://127.0.0.1:8000/api/match/TeamB/', {
              match_time: currentTime,
              quarter: matchPeriod,
              game_time: formatTime(timer),
              content: newItems[1].content,
              editable: newItems[1].editable,
              end: newItems[1].end,
              group: newItems[1].group,
              id: newItems[1].id,
              tag: newItems[1].content,
          });
  
          console.log('Jump ball marks saved successfully.');
  
          // After successfully saving, fetch updated data
          await fetchMarksData();
  
          // Play the video
          videoRef.current.play();
          setIsTimerRunning(true);
          // Start the timer if needed
          // startTimer(); // Uncomment and implement startTimer function if needed
          setTimer(1200); // 
  
      } catch (error) {
          console.error('Error saving jump ball marks:', error);
      }
  };

    const handleEndButtonClick = async () => {
        const currentTime = Math.floor(videoRef.current.currentTime * 1000); // Convert to milliseconds
        const newItems = [
            {
                id: uuidv4(),
                start: currentTime,
                end: currentTime + 100, // Adjust this if needed
                content: 'End Game',
                group: 0,
                editable: false
            },
            {
                id: uuidv4(),
                start: currentTime,
                end: currentTime + 100, // Adjust this if needed
                content: 'End Game',
                group: 1,
                editable: false
            }
        ];

        try {
            // Send POST requests to save jump ball marks for both Team A and Team B
            await axios.post('http://127.0.0.1:8000/api/match/TeamA/', {
                match_time: currentTime,
                quarter: matchPeriod,
                game_time: formatTime(timer),
                content: newItems[0].content,
                editable: newItems[0].editable,
                end: newItems[0].end,
                group: newItems[0].group,
                id: newItems[0].id,
                tag: newItems[0].content,

            });

            await axios.post('http://127.0.0.1:8000/api/match/TeamB/', {
                match_time: currentTime,
                quarter: matchPeriod,
                game_time: formatTime(timer),
                content: newItems[1].content,
                editable: newItems[1].editable,
                end: newItems[1].end,
                group: newItems[1].group,
                id: newItems[1].id,
                tag: newItems[1].content,
            });

            console.log('Jump ball marks saved successfully.');

            // After successfully saving, fetch updated data
            await fetchMarksData();

        } catch (error) {
            console.error('Error saving jump ball marks:', error);
        }
    };

    // const handleContextMenu = (properties) => {
    //     properties.event.preventDefault();
    //     setSelectedItemId(properties.item);

    //     // Show the context menu at the mouse position
    //     const contextMenu = document.getElementById('context-menu');
    //     contextMenu.style.display = 'block';
    //     contextMenu.style.left = `${properties.event.pageX}px`;
    //     contextMenu.style.top = `${properties.event.pageY}px`;
    // };

    const handleContextMenu = (properties) => {
        properties.event.preventDefault();
        setSelectedItemId(properties.item);

        // Show the context menu at the top of the screen
        const contextMenu = document.getElementById('context-menu');
        const mouseX = properties.event.pageX;
        const mouseY = properties.event.pageY;
        const menuHeight = contextMenu.offsetHeight;
        const windowHeight = window.innerHeight;
        const topPosition = mouseY - menuHeight > 0 ? mouseY - menuHeight : mouseY;

        contextMenu.style.display = 'block';
        contextMenu.style.left = `${mouseX}px`;
        contextMenu.style.top = `${topPosition}px`;
    };


    const handleOptionClick = (option) => {
        switch (option) {
            case 'edit':
                // Implement edit functionality here
                handleEditClick();
                break;
            case 'delete':
                handleDeleteOptionClick();
                break;
            default:
                break;
        }
        // Hide the context menu after clicking any option
        hideContextMenu();
    };

    const hideContextMenu = () => {
        const contextMenu = document.getElementById('context-menu');
        contextMenu.style.display = 'none';
    };


    useEffect(() => {
        if (timelineRef.current) {
            timelineRef.current.on('contextmenu', handleContextMenu);
        }

        return () => {
            if (timelineRef.current) {
                timelineRef.current.off('contextmenu', handleContextMenu);
            }
        };
    }, []);

    useEffect(() => {
        // Add click event listener to the document to handle clicks outside the context menu
        const handleClickOutsideContextMenu = (event) => {
            const contextMenu = document.getElementById('context-menu');
            if (contextMenu && !contextMenu.contains(event.target)) {
                // If the clicked element is not inside the context menu, hide the context menu
                hideContextMenu();
            }
        };

        document.addEventListener('click', handleClickOutsideContextMenu);

        return () => {
            document.removeEventListener('click', handleClickOutsideContextMenu);
        };
    }, []);


    const handleDeleteOptionClick = async () => {
        try {
            // Find the item in timelineData that matches the selected match time
            const itemToDelete = timelineData.find(item => item.id === selectedItemId);

            if (!itemToDelete) {
                console.error('Item not found.');
                return;
            }

            // Determine the endpoint based on the group (Team A or Team B)
            let deleteEndpoint = '';
            console.log(itemToDelete.group);
            if (itemToDelete.group === 0) {
                // Delete the item from Group A
                deleteEndpoint = 'http://127.0.0.1:8000/api/match/TeamA/delete/';
            } else if (itemToDelete.group === 1) {
                // Delete the item from Group B
                deleteEndpoint = 'http://127.0.0.1:8000/api/match/TeamB/delete/';
            }

            // Perform delete operation on the backend using match time in the request body
            await axios.delete(deleteEndpoint, {
                data: { match_time: itemToDelete.start }
            });

            // Update timelineData by removing the deleted item
            const updatedTimelineData = timelineData.filter(item => item.id !== itemToDelete.id);
            setTimelineData(updatedTimelineData);

            // If the deleted item is a jump ball mark, delete it from the other group as well
            if (itemToDelete.content.startsWith('Jump Ball')) {
                // Determine the other group
                const otherGroup = itemToDelete.group === 0 ? 1 : 0;

                // Find the corresponding item in the other group
                const correspondingItem = timelineData.find(item => item.group === otherGroup && item.start === itemToDelete.start);

                if (correspondingItem) {
                    // Delete the corresponding item from the other group
                    await axios.delete(deleteEndpoint === 'http://127.0.0.1:8000/api/match/TeamA/delete/' ? 'http://127.0.0.1:8000/api/match/TeamB/delete/' : 'http://127.0.0.1:8000/api/match/TeamA/delete/', {
                        data: { match_time: correspondingItem.start }
                    });

                    // Update timelineData by removing the deleted corresponding item
                    const updatedTimelineDataWithoutCorrespondingItem = timelineData.filter(item => item.id !== correspondingItem.id);
                    setTimelineData(updatedTimelineDataWithoutCorrespondingItem);
                }
            }

            setSelectedItemId(null); // Clear the selected item ID
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    const handleNumberCheckboxChange = (event) => {
        const number = parseInt(event.target.value);
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedJerseyNumbersTeamA(prevNumbers => [...prevNumbers, number]);
        } else {
            setSelectedJerseyNumbersTeamA(prevNumbers => prevNumbers.filter(num => num !== number));
        }
    };
    const handleTeamAShotTypeChange = (event) => {
        const shotType = event.target.value;
        const isChecked = event.target.checked;

        // Update the state variables based on the checkbox value
        if (shotType === "2P") {
            setIs2PCheckedTeamA(isChecked);
        } else if (shotType === "3P") {
            setIs3PCheckedTeamA(isChecked);
        } else if (shotType === "FT") {
            setIsFreeThrowCheckedTeamA(isChecked);
        }

        // Continue with your existing logic here
        // For example, updating the selected shot types array for Team A
        if (isChecked) {
            // Add the shot type to the selected types array for Team A
            setSelectedShotTypesTeamA(prevSelected => [...prevSelected, shotType]);
        } else {
            // Remove the shot type from the selected types array for Team A
            setSelectedShotTypesTeamA(prevSelected => prevSelected.filter(type => type !== shotType));
        }
    };



    // team B filter code here ---------------------------------------------------
    const handleTeamBShotTypeChange = (event) => {
        const shotType = event.target.value;
        const isChecked = event.target.checked;

        // Update the state variables based on the checkbox value for Team B
        if (shotType === "2P") {
            setIs2PCheckedTeamB(isChecked);
        } else if (shotType === "3P") {
            setIs3PCheckedTeamB(isChecked);
        } else if (shotType === "FT") {
            setIsFreeThrowCheckedTeamB(isChecked);
        }

        // Continue with your existing logic here
        // For example, updating the selected shot types array for Team B
        if (isChecked) {
            // Add the shot type to the selected types array for Team B
            setSelectedShotTypesTeamB(prevSelected => [...prevSelected, shotType]);
        } else {
            // Remove the shot type from the selected types array for Team B
            setSelectedShotTypesTeamB(prevSelected => prevSelected.filter(type => type !== shotType));
        }
    };

    const handleNumberCheckboxChangeTeamB = (event) => {
        const number = parseInt(event.target.value);
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedJerseyNumbersTeamB(prevNumbers => [...prevNumbers, number]);
        } else {
            setSelectedJerseyNumbersTeamB(prevNumbers => prevNumbers.filter(num => num !== number));
        }
    };


    //---------------------------------------- both team filter code here ---------------------------------------------------
    const handleShotTypeChangeBoth = (event) => {
        const shotType = event.target.value;
        const isChecked = event.target.checked;

        // Update the state variables based on the checkbox value for both teams
        if (shotType === "2P") {
            setIs2PCheckedTeamA(isChecked);
            setIs2PCheckedTeamB(isChecked);
        } else if (shotType === "3P") {
            setIs3PCheckedTeamA(isChecked);
            setIs3PCheckedTeamB(isChecked);
        } else if (shotType === "FT") {
            setIsFreeThrowCheckedTeamA(isChecked);
            setIsFreeThrowCheckedTeamB(isChecked);
        }

        // Continue with your existing logic here
        // For example, updating the selected shot types array for both teams
        if (isChecked) {
            // Add the shot type to the selected types array for both teams
            setSelectedShotTypesTeamA(prevSelected => [...prevSelected, shotType]);
            setSelectedShotTypesTeamB(prevSelected => [...prevSelected, shotType]);
        } else {
            // Remove the shot type from the selected types array for both teams
            setSelectedShotTypesTeamA(prevSelected => prevSelected.filter(type => type !== shotType));
            setSelectedShotTypesTeamB(prevSelected => prevSelected.filter(type => type !== shotType));
        }
    };

    const handleNumberCheckboxChangeBoth = (event) => {
        const number = parseInt(event.target.value);
        const isChecked = event.target.checked;

        // Update the selected jersey numbers array based on the checkbox value for both teams
        if (isChecked) {
            setSelectedJerseyNumbersTeamA(prevNumbers => [...prevNumbers, number]);
            setSelectedJerseyNumbersTeamB(prevNumbers => [...prevNumbers, number]);
        } else {
            setSelectedJerseyNumbersTeamA(prevNumbers => prevNumbers.filter(num => num !== number));
            setSelectedJerseyNumbersTeamB(prevNumbers => prevNumbers.filter(num => num !== number));
        }
    };
    const handleSaveButtonClick = async () => {
        const currentTime = Math.floor(videoRef.current.currentTime * 1000); // Convert to milliseconds

        // Check if an item already exists at the current time position
        const existingItem = timelineData.find(item => item.start === currentTime);

        // If an item already exists at the current time position, do not add a new one
        if (existingItem) {
            console.log('An item already exists at this time position.');
            return;
        }

        const newItem = {
            id: Date.now(),
            start: currentTime,
            end: currentTime + 100, // Adjust this if needed
            content: ` ${selectedAction} ${selectedSubAction}`, // Include selectedAction in content
            group: currentGroup,
            editable: false
        };
        resetOptions();

        try {
            let endpoint = '';
            if (currentGroup === 0) {
                endpoint = 'http://127.0.0.1:8000/api/match/TeamA/';
            } else if (currentGroup === 1) {
                endpoint = 'http://127.0.0.1:8000/api/match/TeamB/';
            }

            // Send a POST request to save the match_period to the backend
            await axios.post(endpoint, {
                match_time: currentTime,  // Assuming the backend expects time in milliseconds
                quarter: matchPeriod,
                content: newItem.content,
                editable: newItem.editable,
                end: newItem.end,
                group: newItem.group,
                id: newItem.id,
                game_time: formatTime(timer),
                tag: selectedAction,
                shot: selectedAction === 'TURNOVER' ? null : selectedSubAction,
                // shot: selectedAction === 'FOUL' ? null : selectedSubAction.endsWith('1') ? selectedSubAction.slice(0, -1) : selectedSubAction,
                // shot: selectedAction === 'FT' ? null : selectedSubAction.endsWith('1') ? selectedSubAction.slice(0, -1) : selectedSubAction,
                sjn: selectedSubAction === 'Made' ? jerseyNo : null,
                sjn: jerseyNo,
                made_assist: selectedSubAction === 'Made' ? 'yes' : null,
                ajn: selectedSubAction === 'Made' ? assistNo : null,
                ajn: assistNo,
                djn: missType === 'ReBound' ? null : DefjerseyNo,

                shot_type: shotType,
                miss_type: missType,
                reb_type: reboundType,
                miss_off_jn: selectedSubAction === 'Miss' && missType === 'ReBound' && reboundType === 'OR' ? jerseyNo : null,
                miss_def_jn: selectedSubAction === 'Miss' && missType === 'ReBound' && reboundType === 'DR' ? jerseyNo : null,
                foul_type: selectedfoulAction,
                turnover_type: selectedAction === 'TURNOVER' ? selectedSubAction : null,
                sloc: savedCoordinates,
                or_jn: reboundType === 'OR' ? DefjerseyNo : null,
                or_loc: reboundType === 'OR' ? savedorCoordinates : null,
                dr_jn: reboundType === 'DR' ? DefjerseyNo : null,
                dr_loc: reboundType === 'DR' ? savedorCoordinates : null,
                player_in_jn: latestPlayerOut, // Assuming selectedPlayerInJN holds the selected jersey number for player in
                player_out_jn: latestPlayerIn, // Assuming
            });

            // After successfully saving, fetch updated data
            await fetchMarksData();

        } catch (error) {
            console.error('Error saving match period:', error);
        }
    };


    const handleTimeUpdate = () => {
        if (!isDragging && videoRef.current) {
            setTime(videoRef.current.currentTime);
        }
    };

    useEffect(() => {
        const handleTimeUpdateForInput = () => {
            if (videoRef.current) {
                const currentTime = videoRef.current.currentTime;
                setTime(currentTime);
                // Adjust the scale for display in the input field
                setInputTime(Math.round(currentTime * 50));
            }
        };

        if (videoRef.current) {
            videoRef.current.addEventListener("timeupdate", handleTimeUpdateForInput);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener("timeupdate", handleTimeUpdateForInput);
            }
        };
    }, []); // Empty dependency array means this effect runs only once, on mount

    const handleTeamAClick = () => {
        setCurrentGroup(0);
        setSelectedTeam('Team A');

    };

    const handleTeamBClick = () => {
        setCurrentGroup(1);
        setSelectedTeam('Team B');

    };
    useEffect(() => {
        fetchMarksData();
    }, []); // Runs once when component mounts


    // const handleInputChange = (e, key) => {
    //     const { value } = e.target;
    //     setFormData(prevData => ({
    //         ...prevData,
    //         [key]: value
    //     }));
    // };
    const handleMatchPeriodClick = (period) => {
        setMatchPeriod(period);
        if (period === 'Start Game' || period === 'END GAME') {
            setSelectedSubAction(null);
            setAssistNo("");
            setJerseyNo("");
            setJerseyBNo("");
            setTeamAPoints([]);
            setTeamBPoints([]);
            setShotType("");
        }
    };
    const handleSubActionSelect = (subAction) => {
        setSelectedSubAction(subAction);
    };
    const handleFoulActionSelect = (foulAction) => {
        setSelectedFoulAction(foulAction);
    };

    const handleActionSelect = (action) => {
        setSelectedAction(action);
        setSelectedSubAction(null);
        setAssistNo("");
        setJerseyNo("");
        setJerseyBNo("");
    };

    const resetOptions = () => {
        //  setSelectedTeam(null);
        setSelectedAction(null);
        setSelectedSubAction(null);
        setAssistNo("");
        setJerseyNo("");
        setJerseyBNo("");
        // setMatchPeriod(null);
        setShotType("");
        setMissType("");
        setmissoffdefjn("");
        setReboundType("");
        setSelectedMatchTime("");
        setDefJerseyNo("");
        setSelectedPosition("");
        setSavedCoordinates("");
        setLatestPlayerOut("");
        setLatestPlayerIn("");
    };
    const changePlaybackSpeed = (speed) => {
        setPlaybackSpeed(speed);
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
        }
    };
    const handleProgressBarChange = (value) => {
        const video = videoRef.current;
        const currentTime = video.duration * value;
        video.currentTime = currentTime;
        setCurrentTime(formatTime(currentTime));
    };
    useEffect(() => {
        const handleDeleteKeyPress = async (event) => {
            if (event.keyCode === 46) { // Check if the pressed key is the delete key
                const selectedItem = timelineRef.current.getSelection();
                if (selectedItem.length > 0) {
                    try {
                        const itemId = selectedItem[0]; // Get the ID of the selected item
                        const itemToDelete = timelineData.find(item => item.id === itemId);
                        if (itemToDelete) {
                            // Determine the endpoint based on the group (Team A or Team B)
                            let deleteEndpoint = '';
                            if (itemToDelete.group === 0) {
                                deleteEndpoint = 'http://127.0.0.1:8000/api/match/TeamA/delete/';
                            } else if (itemToDelete.group === 1) {
                                deleteEndpoint = 'http://127.0.0.1:8000/api/match/TeamB/delete/';
                            }

                            // Perform delete operation on the backend using match time in the request body
                            await axios.delete(deleteEndpoint, {
                                data: { match_time: itemToDelete.start }
                            });

                            // Update timelineData by removing the deleted item
                            const updatedTimelineData = timelineData.filter(item => item.id !== itemId);
                            setTimelineData(updatedTimelineData);
                        } else {
                            console.error('Item not found.');
                        }
                    } catch (error) {
                        console.error('Error deleting item:', error);
                    }
                }
            }
        };

        document.addEventListener('keydown', handleDeleteKeyPress);

        return () => {
            document.removeEventListener('keydown', handleDeleteKeyPress);
        };
    }, [timelineData]);


    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const handleBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 5;
            setTime(videoRef.current.currentTime);
        }
    };

    const handleForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 5;
            setTime(videoRef.current.currentTime);
        }
    };



    return (
        <div>
            <Row className='tagPanel'>
                <Col className='col-one' xs={12} md={9}>

                    {/* <Row className='vTop'> */}
                    <div id="player-container" style={{ position: 'relative' }}>
                        <video className='videosize' ref={videoRef} onLoadedMetadata={getVideoDuration}></video>
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '5%', // Position the div at the horizontal center
                                transform: 'translateX(-50%)', // Move the div back by half of its width to center it
                                margin: '10px',
                                cursor: 'pointer',
                                color: 'white',
                                backgroundColor: 'rgba(128, 128, 128, 0.5)',
                                padding: '8px',
                                borderRadius: '50%',
                            }}
                            onClick={handleResizeIconClick}
                        >
                            <AiOutlineFullscreen size={24} />
                        </div>

                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: '50%', // Position the div at the horizontal center
                                transform: 'translateX(-50%)', // Move the div back by half of its width to center it
                                color: "white",
                                fontSize: "30px",
                                backgroundColor: 'gray',
                                display: 'block',
                                padding: '8px',
                                borderRadius: '4px',
                            }}
                        >
                            {formatTime(timer)}
                        </div>
                    </div>
                    {/* </Row> */}
                    <div className="videocontrols" style={{ paddingLeft: '50px' }}>
                        {/* <FontAwesomeIcon
                            icon={faBackward}
                            onClick={handleBackward}
                            style={{ marginRight: "10px", color: "white" }}
                        />
                        <FontAwesomeIcon
                            icon={isPlaying ? faPause : faPlay}
                            onClick={handlePlayPause}
                            style={{ marginRight: "10px", color: "white" }}
                        />
                        <FontAwesomeIcon
                            icon={faForward}
                            onClick={handleForward}
                            style={{ marginRight: "20px", color: "white" }}
                        /> */}

                        {/* <input type="range" min="0" max="1" step="0.01" style={{ width: "40%" }}
                            value={
                                videoRef.current
                                    ? videoRef.current.currentTime / videoRef.current.duration || 0 : 0}
                            onChange={(e) => handleProgressBarChange(e.target.value)}
                        /> */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <span style={{ color: 'white', marginRight: '15px', fontSize: '12px' }}>
                                {currentTime ? formatTime(time) : '00:00'}
                            </span>
                            <span style={{ color: 'white', marginRight: '15px', fontSize: '12px' }}>
                                {formatDuration(videoRef.current ? videoRef.current.duration : NaN)}
                            </span>

                            <input
                                type="number"
                                placeholder="Enter time in seconds"
                                value={inputTime}
                                onChange={handleInputTimeChange}
                            />
                            <div style={{ marginRight: '15px', fontSize: '18px', marginLeft: '2px' }}>
                                <select
                                    value={playbackSpeed}
                                    onChange={(e) => changePlaybackSpeed(parseFloat(e.target.value))}
                                >
                                    <option value="0.5">0.5x</option>
                                    <option value="1">1x</option>
                                    <option value="2">2x</option>
                                    <option value="4.5">4x</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    {/* ------------------------------------------------------------timeline reel code is here ----------------------------------- */}
                    {/* <Row className='tBottom'> */}
                    {/* <div id="timeline-container" style={{ height: '150px',backgroundColor:'black', paddingTop:'5px', color:'white' }}></div> */}
                    <div id="timeline-container" style={{ height: '200px', backgroundColor: 'black', padding: '10px', paddingTop: '5px', color: 'white', position: 'relative', marginTop: "2%" }}>
                        <div className="vertical-line"></div>
                    </div>
                    <div id="context-menu" style={{ position: 'absolute', display: 'none', backgroundColor: '#f8f9fa', border: '1px solid #ced4da', boxShadow: '0 2px 4px rgba(0,0,0,.1)', borderRadius: '4px', padding: '5px', zIndex: '1000' }}>
                        <ul style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
                            <li style={{ cursor: 'pointer', padding: '8px 12px', borderBottom: '1px solid #e9ecef' }} onClick={() => handleEditClick('edit')}>
                                Edit
                            </li>
                            <li style={{ cursor: 'pointer', padding: '8px 12px' }} onClick={() => handleOptionClick('delete')}>
                                Delete
                            </li>
                        </ul>
                    </div>


                    {/* ----------------------------------------------timeline seconds here --------------------------- */}

                    {/* </Row> */}
                </Col>
                <Col xs={6} md={3} className="col-tow" style={{ maxHeight: '100%', overflowY: 'auto' }}>

                    {/* --------------------------------------------------------- buttons code is here ----------------------------------------- */}
                    <Offcanvas show={showOffcanvas} onHide={handleToggleOffcanvas} placement="end">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Filter</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Accordion defaultActiveKey={['0']} alwaysOpen className="custom-accordion">
                                {/* <Accordion.Item eventKey="0">
                                    <Accordion.Header className="custom-accordion">All Teams</Accordion.Header >
                                    <Accordion.Body> */}

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Team A</Accordion.Header>
                                    <Accordion.Body>
                                        <Accordion.Item eventKey="5">
                                            <Accordion.Header>Jersey No</Accordion.Header>
                                            <Accordion.Body>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
                                                        <label key={number} style={{ marginBottom: '5px', marginRight: '10px' }}>
                                                            <input type="checkbox" value={number} onChange={handleNumberCheckboxChange} />
                                                            {number}
                                                        </label>
                                                    ))}
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <div className="label-container">
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <label style={{ marginBottom: '5px', }}>
                                                    <input type="checkbox" value="Jump Ball" onChange={handleTeamAShotTypeChange} />
                                                    Jump Ball
                                                </label>
                                                <label style={{ marginBottom: '5px', }}>
                                                    <input type="checkbox" value="End Game" onChange={handleTeamAShotTypeChange} />
                                                    End Game
                                                </label>
                                                <label style={{ marginBottom: '5px', }}>
                                                    <input type="checkbox" value="2P" onChange={handleTeamAShotTypeChange} />
                                                    2P
                                                </label>
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="3P" onChange={handleTeamAShotTypeChange} />
                                                    3P
                                                </label>

                                                <div style={{ marginBottom: '5px', display: is2PCheckedTeamA || is3PCheckedTeamA || isFreeThrowCheckedTeamA ? 'flex' : 'none', flexDirection: 'row' }}>
                                                    <label style={{ marginRight: '10px' }}>
                                                        <input type="checkbox" value="Made" onChange={handleTeamAShotTypeChange} />
                                                        MADE
                                                    </label>
                                                    <label style={{ marginRight: '10px' }}>
                                                        <input type="checkbox" value="Miss" onChange={handleTeamAShotTypeChange} />
                                                        MISS
                                                    </label>
                                                    {!isFreeThrowChecked && (
                                                        <label>
                                                            <input type="checkbox" value="Block" onChange={handleTeamAShotTypeChange} />
                                                            BLOCK
                                                        </label>
                                                    )}
                                                </div>


                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="FT" onChange={handleTeamAShotTypeChange} />
                                                    FT
                                                </label>
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="FOUL" onChange={handleTeamAShotTypeChange} />
                                                    FOUL
                                                </label>
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="TEAM REBOUND" onChange={handleTeamAShotTypeChange} />
                                                    TEAM REBOUND
                                                </label>
                                                {/* <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="INBOUND" onChange={handleTeamAShotTypeChange} />
                                                    INBOUND
                                                </label> */}
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="TURNOVER" onChange={handleTeamAShotTypeChange} />
                                                    TURNOVER
                                                </label>
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="SUBSTITUTION" onChange={handleTeamAShotTypeChange} />
                                                    SUBSTITUTION
                                                </label>
                                                {/* Add more checkboxes as needed */}
                                            </div>
                                            {/* <div className="button-group">
                                                    <Button onClick={handleApplyButtonClick} style={{ marginBottom: '10px', marginRight: '10px' }}>
                                                        Clear Filter
                                                    </Button>
                                                    <Button onClick={handleApplyButtonClick} style={{ marginBottom: '10px', marginRight: '10px' }}>
                                                        Apply
                                                    </Button>
                                                </div> */}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>


                                {/* team b code --------------------------------------------- */}

                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Team B</Accordion.Header>
                                    <Accordion.Body>
                                        <Accordion.Item eventKey="6">
                                            <Accordion.Header>Jersey No</Accordion.Header>
                                            <Accordion.Body>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
                                                        <label key={number} style={{ marginBottom: '5px', marginRight: '10px' }}>
                                                            <input type="checkbox" value={number} onChange={handleNumberCheckboxChangeTeamB} />
                                                            {number}
                                                        </label>
                                                    ))}
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <div className="label-container">
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <label style={{ marginBottom: '5px', }}>
                                                    <input type="checkbox" value="Jump Ball" onChange={handleTeamBShotTypeChange} />
                                                    Jump Ball
                                                </label>
                                                <label style={{ marginBottom: '5px', }}>
                                                    <input type="checkbox" value="End Game" onChange={handleTeamBShotTypeChange} />
                                                    End Game
                                                </label>
                                                <label style={{ marginBottom: '5px', }}>
                                                    <input type="checkbox" value="2P" onChange={handleTeamBShotTypeChange} />
                                                    2P
                                                </label>
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="3P" onChange={handleTeamBShotTypeChange} />
                                                    3P
                                                </label>

                                                <div style={{ marginBottom: '5px', display: is2PCheckedTeamB || is3PCheckedTeamB || isFreeThrowCheckedTeamB ? 'flex' : 'none', flexDirection: 'row' }}>
                                                    <label style={{ marginRight: '10px' }}>
                                                        <input type="checkbox" value="Made" onChange={handleTeamBShotTypeChange} />
                                                        MADE
                                                    </label>
                                                    <label style={{ marginRight: '10px' }}>
                                                        <input type="checkbox" value="Miss" onChange={handleTeamBShotTypeChange} />
                                                        MISS
                                                    </label>
                                                    {!isFreeThrowChecked && (
                                                        <label>
                                                            <input type="checkbox" value="Block" onChange={handleTeamBShotTypeChange} />
                                                            BLOCK
                                                        </label>
                                                    )}
                                                </div>

                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="FT" onChange={handleTeamBShotTypeChange} />
                                                    FT
                                                </label>
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="FOUL" onChange={handleTeamBShotTypeChange} />
                                                    FOUL
                                                </label>
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="TEAM REBOUND" onChange={handleTeamBShotTypeChange} />
                                                    TEAM REBOUND
                                                </label>
                                                {/* <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="INBOUND" onChange={handleTeamBShotTypeChange} />
                                                    INBOUND
                                                </label> */}
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="TURNOVER" onChange={handleTeamBShotTypeChange} />
                                                    TURNOVER
                                                </label>
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="SUBSTITUTION" onChange={handleTeamBShotTypeChange} />
                                                    SUBSTITUTION
                                                </label>
                                                {/* Add more checkboxes as needed */}
                                            </div>
                                            {/* <div className="button-group">
                <Button onClick={handleApplyButtonClick} style={{ marginBottom: '10px', marginRight: '10px' }}>
                    Clear Filter
                </Button>
                <Button onClick={handleApplyButtonClick} style={{ marginBottom: '10px', marginRight: '10px' }}>
                    Apply
                </Button>
            </div> */}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>

                                {/* both team data code =------------------------------------------------------ */}
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Both Team</Accordion.Header>
                                    <Accordion.Body>
                                        <Accordion.Item eventKey="7">
                                            <Accordion.Header>Jersey No</Accordion.Header>
                                            <Accordion.Body>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
                                                        <label key={number} style={{ marginBottom: '5px', marginRight: '10px' }}>
                                                            <input type="checkbox" value={number} onChange={handleNumberCheckboxChangeBoth} />
                                                            {number}
                                                        </label>
                                                    ))}
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <div className="label-container">
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>

                                                <label style={{ marginBottom: '5px', }}>
                                                    <input type="checkbox" value="2P" onChange={handleShotTypeChangeBoth} />
                                                    2P
                                                </label>
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="3P" onChange={handleShotTypeChangeBoth} />
                                                    3P
                                                </label>

                                                <div style={{ marginBottom: '5px', display: is2PCheckedTeamB || is3PCheckedTeamB || isFreeThrowCheckedTeamB ? 'flex' : 'none', flexDirection: 'row' }}>
                                                    <label style={{ marginRight: '10px' }}>
                                                        <input type="checkbox" value="Made" onChange={handleShotTypeChangeBoth} />
                                                        MADE
                                                    </label>
                                                    <label style={{ marginRight: '10px' }}>
                                                        <input type="checkbox" value="Miss" onChange={handleShotTypeChangeBoth} />
                                                        MISS
                                                    </label>
                                                    {!isFreeThrowChecked && (
                                                        <label>
                                                            <input type="checkbox" value="Block" onChange={handleTeamBShotTypeChange} />
                                                            BLOCK
                                                        </label>
                                                    )}
                                                </div>

                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="FT" onChange={handleTeamBShotTypeChange} />
                                                    FT
                                                </label>
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="FOUL" onChange={handleTeamBShotTypeChange} />
                                                    FOUL
                                                </label>
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="TEAM REBOUND" onChange={handleTeamBShotTypeChange} />
                                                    TEAM REBOUND
                                                </label>
                                                {/* <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="INBOUND" onChange={handleTeamBShotTypeChange} />
                                                    INBOUND
                                                </label> */}
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="TURNOVER" onChange={handleTeamBShotTypeChange} />
                                                    TURNOVER
                                                </label>
                                                <label style={{ marginBottom: '5px' }}>
                                                    <input type="checkbox" value="SUBSTITUTION" onChange={handleTeamBShotTypeChange} />
                                                    SUBSTITUTION
                                                </label>
                                                {/* Add more checkboxes as needed */}
                                            </div>
                                            {/* <div className="button-group">
                <Button onClick={handleApplyButtonClick} style={{ marginBottom: '10px', marginRight: '10px' }}>
                    Clear Filter
                </Button>
                <Button onClick={handleApplyButtonClick} style={{ marginBottom: '10px', marginRight: '10px' }}>
                    Apply
                </Button>
            </div> */}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                {/* </Accordion.Body>
                                </Accordion.Item> */}


                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>Result</Accordion.Header>
                                    <Accordion.Body>
                                        <div>

                                            <h4 style={{ textAlign: 'center' }}>Team A Marks</h4>

                                            {marksAData.map((mark, index) => (

                                                <div key={index} style={{ backgroundColor: '#7AA2E3', padding: '20px', border: '2px solid black', borderRadius: '10px', marginBottom: '10px', cursor: "pointer" }}>
                                                    <div onClick={() => handleTimeClick(mark.match_time)} >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <span style={{ fontWeight: '700' }}>MT: {mark.match_time}</span>
                                                            <span style={{ fontWeight: '700' }}>GT: {mark.game_time}</span> <br />
                                                        </div>
                                                        <span style={{ marginRight: '20px' }}>Tag: {mark.tag}</span>
                                                        <span>Shot: {mark.shot}</span>
                                                        {/* <hr /> */}

                                                    </div>
                                                    {/* <Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>{' '}
                                                    <Button variant="success" ><FontAwesomeIcon icon={faPenToSquare} /></Button>{' '} */}
                                                </div>
                                            ))}

                                        </div>
                                        <div>
                                            <h4 style={{ textAlign: 'center' }}>Team B Marks</h4>
                                            {marksBData.map((mark, index) => (
                                                <div key={index} onClick={() => handleTimeClick(mark.match_time)} style={{ backgroundColor: '#97E7E1', padding: '20px', border: '2px solid black', borderRadius: '10px', marginBottom: '10px', cursor: "pointer" }}>
                                                    <div onClick={() => handleTimeClick(mark.match_time)} >
                                                        <span style={{ marginRight: '20px', fontWeight: '700' }}>MT: {mark.match_time}</span>
                                                        <span style={{ fontWeight: '700' }}>GT: {mark.game_time}</span> <br />
                                                        <span style={{ marginRight: '20px' }}>Tag: {mark.tag}</span>
                                                        <span>Shot: {mark.shot}</span>

                                                        {/* <hr /> */}
                                                    </div>
                                                    {/* <Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>{' '}
                                                    <Button variant="success"><FontAwesomeIcon icon={faPenToSquare} /></Button>{' '} */}
                                                </div>

                                            ))}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>




                            </Accordion>
                        </Offcanvas.Body>
                    </Offcanvas>
                    <div>

                        <div style={{ display: "flex", float: "left" }}>
                            <Button onClick={handleToggleOffcanvas}><FontAwesomeIcon icon={faFilter} style={{ color: "#a3bdb4", }} /></Button>
                        </div><br /> <br />


                        <div className='text-center'>
                            <button className={`btn btn-info ${matchPeriod === 'Start Game' ? 'active' : ''}`} onClick={() => handleMatchPeriodClick('Start Game')}>Start Game</button>
                            {(matchPeriod !== null) && (
                                <div className="match-period-buttons">

                                    <button className={`btn btn-info ${matchPeriod === '1ST QTR' ? 'active' : ''}`} onClick={() => handleMatchPeriodClick('1ST QTR')}>1ST QTR</button>
                                    <button className={`btn btn-info ${matchPeriod === '2ND QTR' ? 'active' : ''}`} onClick={() => handleMatchPeriodClick('2ND QTR')}>2ND QTR</button>
                                    <button className={`btn btn-info ${matchPeriod === '3RD QTR' ? 'active' : ''}`} onClick={() => handleMatchPeriodClick('3RD QTR')}>3RD QTR</button>
                                    <button className={`btn btn-info ${matchPeriod === '4TH QTR' ? 'active' : ''}`} onClick={() => handleMatchPeriodClick('4TH QTR')}>4TH QTR</button>
                                    <button className={`btn btn-info ${matchPeriod === 'OT' ? 'active' : ''}`} onClick={() => handleMatchPeriodClick('OT')}>OT</button>

                                </div>
                            )}
                            {((matchPeriod !== 'Start Game' && matchPeriod !== 'END GAME' && matchPeriod !== 'Jump Ball' && selectedAction === null && matchPeriod !== null) || selectedAction === '2P' ||
                                selectedAction === '3P' || selectedAction === 'FT' || selectedAction === 'FOUL' || selectedAction === 'TEAM REBOUND' || selectedAction === 'INBOUND' ||
                                selectedAction === 'TURNOVER' || selectedAction === 'SUBSTITUTION') && (
                                    <div className="team-selection">
                                        <button className={`btn btn-secondary ${matchPeriod === 'Jump Ball' ? 'active' : ''}`} onClick={() => handleJumpBallButtonClick('Jump Ball')}>Jump Ball</button>
                                        <button className={`btn btn-secondary ${selectedTeam === 'Team A' ? 'active' : ''}`} onClick={handleTeamAClick}>Team A</button>
                                        <button className={`btn btn-secondary ${selectedTeam === 'Team B' ? 'active' : ''}`} onClick={handleTeamBClick}>Team B</button>
                                        <button className={`btn btn-secondary ${matchPeriod === 'END GAME' ? 'active' : ''}`} onClick={() => handleEndButtonClick('END GAME')}>END GAME</button>
                                        <button className="btn btn-secondary mt-2" onClick={() => handleActionSelect(null)}  > Back </button>
                                    </div>
                                )}
                            {((selectedTeam !== null && matchPeriod !== 'Start Game' && matchPeriod !== 'END' && matchPeriod !== 'Jump Ball' && selectedAction === null) || selectedAction === '2P' ||
                                selectedAction === '3P' || selectedAction === 'FT' || selectedAction === 'FOUL' || selectedAction === 'TEAM REBOUND' || selectedAction === 'INBOUND' ||
                                selectedAction === 'TURNOVER' || selectedAction === 'SUBSTITUTION') && (
                                    <div className="actions">
                                        <button className="btn btn-2p" onClick={() => handleActionSelect('2P')}>2P</button>
                                        <button className="btn btn-3p" onClick={() => handleActionSelect('3P')}>3P</button>
                                        <button className="btn btn-free-throw" onClick={() => handleActionSelect('FT')}>FREE THROW</button>
                                        <button className="btn btn-foul" onClick={() => handleActionSelect('FOUL')}>FOUL</button>
                                        {/* <button className="btn btn-team-rebound" onClick={() => handleActionSelect('TEAM REBOUND')}>TEAM REBOUND</button> */}
                                        {/* <button className="btn btn-inbound" onClick={() => handleActionSelect('INBOUND')}>INBOUND</button> */}
                                        <button className="btn btn-turnover" onClick={() => handleActionSelect('TURNOVER')}>TURNOVER</button>
                                        <button className="btn btn-substitution" onClick={() => handleActionSelect('SUBSTITUTION')}>SUBSTITUTION</button>
                                    </div>
                                )}
                            {selectedAction === "2P" && (
                                <React.Fragment>
                                    <button className="btn btn-primary" onClick={() => handleSubActionSelect("Made")}>Made</button>
                                    <button className="btn btn-primary" onClick={() => handleSubActionSelect("Miss")}>Miss</button>
                                    <button className="btn btn-primary" onClick={() => handleSubActionSelect("Block")}>Block</button>

                                </React.Fragment>
                            )}
                            {selectedAction === "3P" && (
                                <React.Fragment>
                                    <button className="btn btn-primary" onClick={() => handleSubActionSelect("Made")}>Made</button>
                                    <button className="btn btn-primary" onClick={() => handleSubActionSelect("Miss")}>Miss</button>
                                    <button className="btn btn-primary" onClick={() => handleSubActionSelect("Block")}>Block</button>
                                </React.Fragment>
                            )}
                            {selectedAction === "FT" && (
                                <React.Fragment>
                                    <button className="btn btn-primary" onClick={() => handleSubActionSelect("Made1")}>Made</button>
                                    <button className="btn btn-primary" onClick={() => handleSubActionSelect("Miss1")}>Miss</button>
                                </React.Fragment>
                            )}
                            {selectedAction === "FOUL" && (
                                <React.Fragment>
                                    <button className="btn btn-primary"
                                        onClick={() => handleFoulActionSelect("DEFENSIVE")}
                                    >
                                        DEFENSIVE
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleFoulActionSelect("OFFENSIVE")}
                                    >
                                        OFFENSIVE
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleFoulActionSelect("TECHNICAL FOUL")}
                                    >
                                        TECHNICAL FOUL
                                    </button>
                                </React.Fragment>
                            )}
                            {selectedAction === "TEAM REBOUND" && (
                                <React.Fragment>
                                    <button className="btn btn-primary" onClick={() => handleSubActionSelect("DEFENSIVE")}>DEFENSIVE</button>
                                    <button className="btn btn-primary" onClick={() => handleSubActionSelect("OFFENSIVE")}>OFFENSIVE</button>
                                </React.Fragment>
                            )}
                            {selectedAction === "TURNOVER" && (
                                <React.Fragment>
                                    <button className="btn btn-primary" onClick={() => handleSubActionSelect("VOILATION")}>VOILATION</button>
                                    <button className="btn btn-primary" onClick={() => handleSubActionSelect("STEAL")}>STEAL</button>
                                    <button className="btn btn-primary" onClick={() => handleSubActionSelect("OUTOFCOURT")}>OUT OF COURT</button>
                                </React.Fragment>
                            )}
                            {selectedAction === "SUBSTITUTION" && (
                                <React.Fragment>
                                    <div className="container">
                                        <h1 style={{ color: 'white' }}>In</h1>
                                        <div className="button-container">
                                            {a.map((playerIn, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handlePlayerInSelection(playerIn)}
                                                >
                                                    {playerIn}
                                                </button>
                                            ))}
                                        </div>
                                        <h1 style={{ color: 'white' }}>Out</h1>
                                        <div className="button-container">
                                            {b.map((playerOut, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handlePlayerOutSelection(playerOut)}
                                                >
                                                    {playerOut}
                                                </button>
                                            ))}
                                        </div>
                                    </div><div>
                                        <button onClick={handleSaveButtonClick} className="btn btn-primary">Save</button></div>
                                </React.Fragment>
                            )}
                            {selectedfoulAction === "OFFENSIVE" && (
                                <div>
                                    <h6 className="text-white mt-2"> Player Jersey No. </h6>
                                    {/* <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)}> */}
                                    <h6 className="text-white  mt-2">Jersy No.</h6>
                                    <div className="mt-2">
                                        {[...Array(10)].map((_, index) => (
                                            <button
                                                key={index}
                                                className={`btn ${jerseyNo === index + 1
                                                    ? "btn-success"
                                                    : "btn-outline-secondary"
                                                    } me-2`}
                                                onClick={() => {
                                                    setJerseyNo(index + 1);
                                                    console.log(`Button ${index + 1} clicked`);
                                                }}
                                            >
                                                {index + 1}{" "}
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={handleSaveButtonClick}>Save</button>
                                </div>
                            )}

                            {selectedfoulAction === "DEFENSIVE" && (
                                <div>
                                    {/* Displaying the "Made" button */}
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleSubActionSelect("Mades")}
                                    >
                                        Made
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleSubActionSelect("Miss")}
                                    >
                                        Miss
                                    </button>
                                </div>
                            )}
                            {selectedfoulAction === "TECHNICAL FOUL" && (
                                <div>
                                    {/* <h6 className="text-white mt-2">  Player Jersey No. </h6>
                    <h6 className="text-white  mt-2">Jersy No.</h6>
                    <div className="mt-2">
                        {[...Array(10)].map((_, index) => (
                            <button
                                key={index}
                                className={`btn ${jerseyNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2`}
                                onClick={() => {
                                    setJerseyNo(index + 1); console.log(`Button ${index + 1} clicked`);
                                }}>
                                {index + 1} </button>
                        ))}
                    </div> */}
  <button onClick={handleSaveButtonClick} className="btn btn-primary">Save</button>
                                </div>
                            )}

                            {selectedSubAction && (
                                <div>
                                    {selectedSubAction === "Made" && (
                                        <div>
                                            <h6 className="text-white  mt-2">Jersy No.</h6>

                                            <div className="mt-2">

                                                {[...Array(10)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn ${jerseyNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2 text-white`}
                                                        onClick={() => {
                                                            setJerseyNo(index + 1);
                                                            console.log(`Button ${index + 1} clicked`);
                                                        }}>  {index + 1}
                                                    </button>
                                                ))}
                                            </div>
                                            {/* </select> */}
                                            <button
                                                className="btn btn-primary mt-2 me-2"
                                                onClick={toggleLocation}>{" "} Location{" "} </button>{" "}
                                            {/* Toggle Location button */}
                                            <h6 className="text-white  mt-2">Assist No.</h6>
                                            {/* <select */}
                                            <div className="mt-2">
                                                {[...Array(10)].map((_, index) => (
                                                    <button key={index} className={`btn ${assistNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2 text-white`}
                                                        onClick={() => handleButtonClick(index)}> {index + 1} </button>
                                                ))}
                                            </div>
                                            {/* </select> */}
                                            <h6 className="text-white  mt-2">Shot Type</h6>
                                            <select
                                                className="form-select mt-2"
                                                onChange={(e) => setShotType(e.target.value)}  >
                                                <option value="">Select Shot Type</option>
                                                <option value="Layup">Layup</option>
                                                <option value="Jump">Jump</option>
                                                <option value="Tip">Tip</option>
                                            </select>
                                        </div>
                                    )}
                                    {selectedSubAction === "Miss" && (
                                        <div>
                                            <h6 className="text-white ">Jersy No.</h6>

                                            <div >

                                                {[...Array(10)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn ${jerseyNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2 text-white`}
                                                        onClick={() => {
                                                            setJerseyNo(index + 1);
                                                            console.log(`Button ${index + 1} clicked`);
                                                        }}>  {index + 1}
                                                    </button>
                                                ))}<div>
                                                    <h6 className="text-white  mt-2">Shot Type</h6>
                                                    <select
                                                        className="form-select mt-2"
                                                        onChange={(e) => setShotType(e.target.value)}  >
                                                        <option value="">Select Shot Type</option>
                                                        <option value="Layup">Layup</option>
                                                        <option value="Jump">Jump</option>
                                                        <option value="Tip">Tip</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <button
                                                        className="btn btn-primary mt-2 me-2"
                                                        onClick={toggleLocation}>{" "} Location{" "} </button>{" "}</div>
                                            </div>
                                            <div className="btn-group mt-2" role="group" aria-label="Miss Type">
                                                <button className="btn btn-primary" onClick={() => setMissType("Outofcourt")}>Out Of Court</button>
                                                <button className="btn btn-primary" onClick={() => setMissType("ReBound")}>ReBound</button>
                                            </div>
                                            {missType === "ReBound" ? (
                                                <div className="mt-2">
                                                    <div className="btn-group" role="group" aria-label="Rebound Type">
                                                        <button className="btn btn-primary" onClick={() => setReboundType("OR")}>O.R. - Offensive Rebound</button>
                                                        <button className="btn btn-primary" onClick={() => setReboundType("DR")}>D.R. - Defensive Rebound</button>
                                                    </div>
                                                </div>
                                            ) : null}
                                            {(missType === "ReBound" && (reboundType === "OR" || reboundType === "DR")) ? (
                                                <div>
                                                    <h6 className="text-white mt-2">Rebound Jersey No.</h6>
                                                    <div className="mt-2">
                                                        {[...Array(10)].map((_, index) => (
                                                            <button
                                                                key={index}
                                                                className={`btn ${DefjerseyNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2 text-white`}
                                                                onClick={() => {
                                                                    setDefJerseyNo(index + 1);
                                                                    console.log(`Button ${index + 1} clicked`);
                                                                }}>
                                                                {index + 1}
                                                            </button>
                                                        ))}
                                                        <div>
                                                            <button className="btn btn-primary" onClick={toggleLocation}>Location</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    )}
                                    {selectedSubAction === "Block" && (
                                        <div>
                                            <h6 className="text-white  mt-2">Jersy No.</h6>
                                            <div className="mt-2">
                                                {[...Array(10)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn ${jerseyNo === index + 1
                                                            ? "btn-success"
                                                            : "btn-outline-secondary"
                                                            } me-2 text-white`}
                                                        onClick={() => {
                                                            setJerseyNo(index + 1);
                                                            console.log(`Button ${index + 1} clicked`);
                                                        }}
                                                    >
                                                        {" "}
                                                        {index + 1}
                                                    </button>
                                                ))}
                                            </div>
                                            {/* </select> */}

                                        </div>
                                    )}
                                    {selectedSubAction === "Foul" && (
                                        <div>
                                            <h6>Team A Jersey No.</h6>
                                            {/* <select */}
                                            <h6 className="text-white  mt-2">Team A Jersey No.</h6>
                                            <div className="mt-2">
                                                {[...Array(10)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn ${jerseyNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2`}
                                                        onClick={() => {
                                                            setJerseyNo(index + 1);
                                                            console.log(`Button ${index + 1} clicked`);
                                                        }} >  {index + 1} </button>
                                                ))}
                                            </div>
                                            {/* </select> */}
                                            <button className="btn btn-primary mt-2 me-2" onClick={toggleLocation}  >{" "}  Location{" "}</button>
                                            <h6>Team B Jersey No.</h6>
                                            {/* <select */}
                                            <h6 className="text-white  mt-2">Team B Jersey No.</h6>
                                            <div className="mt-2">
                                                {[...Array(10)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn ${jerseyBNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2`}
                                                        onClick={() => { setJerseyBNo(index + 1); console.log(`Button ${index + 1} clicked`); }}>
                                                        {index + 1}
                                                    </button>
                                                ))}
                                            </div>
                                            {/* </select> */}
                                            <button className="btn btn-primary mt-2 me-2" onClick={toggleLocation}  >{" "} Location </button>
                                        </div>
                                    )}
                                    {selectedSubAction === "Made1" && (
                                        <div>
                                            <h6 className="text-white  mt-2">Jersy No.</h6>
                                            <div className="mt-2">
                                                {[...Array(10)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn ${jerseyNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2`}
                                                        onClick={() => { setJerseyNo(index + 1); console.log(`Button ${index + 1} clicked`); }}  >
                                                        {index + 1}  </button>
                                                ))}
                                            </div>
                                            {/* </select> */}
                                        </div>
                                    )}
                                    {selectedSubAction === "Miss1" && (
                                        <div>
                                            <h6 className="text-white">Jersy No.</h6>
                                            <div>
                                                {[...Array(10)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn ${jerseyNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2 text-white`}
                                                        onClick={() => {
                                                            setJerseyNo(index + 1);
                                                            console.log(`Button ${index + 1} clicked`);
                                                        }}>
                                                        {index + 1}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="btn-group mt-2" role="group" aria-label="Miss Type">
                                                <button className="btn btn-primary" onClick={() => setMissType("Outofcourt")}>Out Of Court</button>
                                                <button className="btn btn-primary" onClick={() => setMissType("ReBound")}>ReBound</button>
                                            </div>
                                            {missType === "ReBound" ? (
                                                <div className="mt-2">
                                                    <div className="btn-group" role="group" aria-label="Rebound Type">
                                                        <button className="btn btn-primary" onClick={() => setReboundType("OR")}>O.R. - Offensive Rebound</button>
                                                        <button className="btn btn-primary" onClick={() => setReboundType("DR")}>D.R. - Defensive Rebound</button>
                                                    </div>
                                                </div>
                                            ) : null}
                                            {(missType === "ReBound" && (reboundType === "OR" || reboundType === "DR")) ? (
                                                <div>
                                                    <h6 className="text-white mt-2">Rebound Jersey No.</h6>
                                                    <div className="mt-2">
                                                        {[...Array(10)].map((_, index) => (
                                                            <button
                                                                key={index}
                                                                className={`btn ${DefjerseyNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2 text-white`}
                                                                onClick={() => {
                                                                    setDefJerseyNo(index + 1);
                                                                    console.log(`Button ${index + 1} clicked`);
                                                                }}>
                                                                {index + 1}
                                                            </button>
                                                        ))}
                                                        <div>
                                                            <button className="btn btn-primary" onClick={toggleLocation}>Location</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    )}




                                    {/* Render additional options when "Made" button is clicked,
but only show them if the selectedSubAction is not "DEFENSIVE" */}
                                    {selectedSubAction === "Mades" && (
                                        <div>
                                            <h6 className="text-white mt-2">Jersey No.</h6>
                                            <div className="mt-2">
                                                {[...Array(10)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn ${jerseyNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2 text-white`}
                                                        onClick={() => {
                                                            setJerseyNo(index + 1);
                                                            console.log(`Button ${index + 1} clicked`);
                                                        }}>
                                                        {index + 1}
                                                    </button>
                                                ))}
                                            </div>
                                            <button className="btn btn-primary mt-2 me-2" onClick={toggleLocation}>Location</button>

                                            <h6 className="text-white  mt-2">Assist  No.</h6>

                                            <div className="mt-2">

                                                {[...Array(10)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn ${assistNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2 text-white`}
                                                        onClick={() => {
                                                            setAssistNo(index + 1);
                                                            console.log(`Button ${index + 1} clicked`);
                                                        }}>  {index + 1}
                                                    </button>
                                                ))}
                                            </div>
                                            {/* </select> */}

                                            <h6 className="text-white mt-2">Defensive Jersey No.</h6>
                                            <div className="mt-2">
                                                {[...Array(10)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn ${DefjerseyNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2 text-white`}
                                                        onClick={() => {
                                                            setDefJerseyNo(index + 1);
                                                            console.log(`Button ${index + 1} clicked`);
                                                        }}>  {index + 1}
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                className="btn btn-primary mt-2 me-2"
                                                onClick={toggleLocation}>{" "} Location{" "} </button>{" "}
                                            {/* Hide shot type and its select options */}
                                        </div>
                                    )}


                                    {selectedSubAction === "VOILATION" && (
                                        <div>
                                            <h6 className="text-white mt-2">  Player Jersey No. </h6>
                                            {/* <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)}> */}
                                            <h6 className="text-white  mt-2">Jersy No.</h6>
                                            <div className="mt-2">

                                                {[...Array(10)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn ${jerseyNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2`}
                                                        onClick={() => {
                                                            setJerseyNo(index + 1); console.log(`Button ${index + 1} clicked`);
                                                        }}  >
                                                        {index + 1} </button>
                                                ))}
                                            </div>
                                            {/* </select> */}
                                        </div>
                                    )}
                                    {selectedSubAction === "STEAL" && (
                                        <div>
                                            <h6 className="text-white mt-2">  Player Jersey No. </h6>
                                            {/* <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)}> */}
                                            <h6 className="text-white  mt-2">Jersy No.</h6>
                                            <div className="mt-2">

                                                {[...Array(10)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn ${jerseyNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2`}
                                                        onClick={() => { setJerseyNo(index + 1); console.log(`Button ${index + 1} clicked`); }}  >
                                                        {index + 1}
                                                    </button>
                                                ))}
                                            </div>
                                            {/* </select> */}
                                        </div>
                                    )}
                                    {selectedSubAction === "OUT OF COURT" && (
                                        <div>
                                            <h6 className="text-white mt-2">  Player Jersey No. </h6>
                                            {/* <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)}> */}
                                            <h6 className="text-white  mt-2">Jersy No.</h6>
                                            <div className="mt-2">
                                                {[...Array(10)].map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn ${jerseyNo === index + 1 ? 'btn-success' : 'btn-outline-secondary'} me-2`}
                                                        onClick={() => { setJerseyNo(index + 1); console.log(`Button ${index + 1} clicked`); }}  >
                                                        {index + 1}</button>
                                                ))}
                                            </div>
                                            {/* </select> */}
                                        </div>
                                    )}
                                    <Button className="mt-2 me-4" onClick={handleSaveButtonClick}>  Save{" "} </Button>
                                    <button className="btn btn-secondary mt-2" onClick={() => handleActionSelect(null)} >  Cancel  </button>
                                </div>
                            )}
                        </div>
                    </div>

                </Col>
            </Row>
            {
                showInput && (
                    <>
                        <input type="text" value={inputValue} onChange={handleInputChange} />
                        <button onClick={handleSaveButtonClick}>Save</button>
                    </>
                )
            }
            {locationVisible && <Location onSave={handleSaveLocation} />}






            {/* ________________________________________________________________modal code is here _______________________________________________ */}


            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                <Form.Group controlId="matchTime">
                                    <Form.Label>Match Time:</Form.Label>
                                    <Form.Control type="number" name="match_time" value={formData.match_time} onChange={handleChange} readOnly />
                                </Form.Group>
                            </div>
                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                <Form.Group controlId="gameTime">
                                    <Form.Label>Game Time:</Form.Label>
                                    <Form.Control type="text" name="game_time" value={formData.game_time} onChange={handleChange} readOnly />
                                </Form.Group>
                            </div>
                            {formData.quarter !== null && formData.quarter !== '' && (
                                <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                    <Form.Group controlId="quarter">
                                        <Form.Label>quarter:</Form.Label>
                                        <Form.Control as="select" name="quarter" value={formData.quarter} onChange={handleChange} required>
                                            <option value="1ST QTR">1ST QTR</option>
                                            <option value="2ND QTR">2ND QTR</option>
                                            <option value="3RD QTR">3RD QTR</option>
                                            <option value="4TH QTR">4TH QTR</option>

                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            )}
                            {/* Render other fields similarly */}
                            {formData.tag !== null && formData.tag !== '' && (
                                <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                    <Form.Group controlId="tag">
                                        <Form.Label>tag:</Form.Label>
                                        <Form.Control as="select" name="tag" value={formData.tag} onChange={handleChange} required>
                                            <option value="Jump Ball">Jump Ball</option>
                                            <option value="End Game">End Game</option>
                                            <option value="2P">2P</option>
                                            <option value="3P">3P</option>
                                            <option value="FT">Free Throw</option>
                                            <option value="FOUL">FOUL</option>
                                            {/* <option value="TEAM REBOUND">TEAM REBOUND</option> */}
                                            <option value="TURNOVER">TURNOVER</option>
                                            <option value="SUBSTITUTION">SUBSTITUTION</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            )}
                            {formData.tag && (
                                <>
                                    {/* 2p Here -----------------------------------------------------------------------------------*/}
                                    {(formData.tag === '2P' || formData.tag === '3P') && (
                                        <>
                                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                <Form.Group controlId="additionalField" >
                                                    <Form.Label>Shot:</Form.Label>
                                                    <Form.Control as="select" name="shot" value={formData.shot} onChange={handleChange}>
                                                        <option value="">Select Shot</option>
                                                        <option value="Made">Made</option>
                                                        <option value="Miss">Miss</option>
                                                        <option value="Block">Block</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                            {formData.shot !== null && formData.shot !== '' && formData.shot === 'Made' && (
                                                <>
                                                    <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                        <Form.Group controlId="additionalField">
                                                            <Form.Label>{formData.shot} sub options:</Form.Label>
                                                            <Form.Control as="select" name="shot_type" value={formData.shot_type} onChange={handleChange} >
                                                                <option value="">Select Shot</option>
                                                                <option value="Jump">Jump</option>
                                                                <option value="LayUp">LayUp</option>
                                                                <option value="Tip">Tip</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </div>
                                                    <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                        <Form.Group controlId="sjn">
                                                            <Form.Label>sjn:</Form.Label>
                                                            <Form.Control as="select" name="sjn" value={formData.sjn} onChange={handleChange} >
                                                                <option value="">Select shooter No</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5 ">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </div>
                                                    <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                        <Form.Group controlId="ajn">
                                                            <Form.Label>ajn:</Form.Label>
                                                            <Form.Control as="select" name="ajn" value={formData.ajn} onChange={handleChange} >
                                                                <option value="">Select assistNo</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5 ">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </div>
                                                    {/* <button className="btn btn-primary " onClick={toggleLocation}> Location </button> */}
                                                    {formData.sloc !== null && formData.sloc !== '' && (
                                                        <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                            <Form.Group controlId="sloc">
                                                                <Form.Label>sloc:</Form.Label>

                                                                {Object.keys(formData.sloc).map(key => (
                                                                    <div key={key}>
                                                                        <span>{key}: </span>
                                                                        <span>{formData.sloc[key]}</span>
                                                                    </div>
                                                                ))}
                                                            </Form.Group>
                                                        </div>
                                                    )}

                                                    {/* Add other form fields as needed */}
                                                </>

                                            )}
                                            {formData.shot !== null && formData.shot !== '' && formData.shot === 'Miss' && (
                                                <>
                                                    <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                        <Form.Group controlId="msjn">
                                                            <Form.Label>sjn:</Form.Label>
                                                            <Form.Control as="select" name="sjn" value={formData.sjn} onChange={handleChange} >
                                                                <option value="">Select shooterNo</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5 ">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </div>
                                                    {formData.shot !== null && formData.shot !== '' && formData.shot === 'Miss' && (
                                                        <>
                                                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                <Form.Group controlId="additionalField" >
                                                                    <Form.Label>Miss Type:</Form.Label>
                                                                    <Form.Control as="select" name="miss_type" value={formData.miss_type} onChange={handleChange}>
                                                                        <option value="">Select miss type</option>
                                                                        <option value="Outofcourt">Out Of Court</option>
                                                                        <option value="ReBound">ReBound</option>
                                                                    </Form.Control>
                                                                </Form.Group>
                                                            </div>
                                                            {formData.miss_type === 'ReBound' && (
                                                                <>
                                                                    <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                        <Form.Group controlId="reboundType" >
                                                                            <Form.Label>Rebound Type:</Form.Label>
                                                                            <Form.Control as="select" name="reb_type" value={formData.reb_type} onChange={handleChange}>
                                                                                <option value="">Select miss type</option>
                                                                                <option value="OR">O.R</option>
                                                                                <option value="DR">D.R</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </div>
                                                                    {formData.reb_type === 'OR' && (
                                                                        <>
                                                                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                                <Form.Group controlId="msjn">
                                                                                    <Form.Label>OR gsjn:</Form.Label>
                                                                                    <Form.Control as="select" name="or_jn" value={formData.or_jn} onChange={handleChange} >
                                                                                        <option value="">Select shooterNo</option>
                                                                                        <option value="1">1</option>
                                                                                        <option value="2">2</option>
                                                                                        <option value="3">3</option>
                                                                                        <option value="4">4</option>
                                                                                        <option value="5 ">5</option>
                                                                                        <option value="6">6</option>
                                                                                        <option value="7">7</option>
                                                                                        <option value="8">8</option>
                                                                                        <option value="9">9</option>
                                                                                        <option value="10">10</option>
                                                                                    </Form.Control>
                                                                                </Form.Group>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                    {formData.reb_type === 'DR' && (
                                                                        <>
                                                                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                                <Form.Group controlId="msjn">
                                                                                    <Form.Label>DR sjn:</Form.Label>
                                                                                    <Form.Control as="select" name="dr_jn" value={formData.dr_jn} onChange={handleChange} >
                                                                                        <option value="">Select shooterNo</option>
                                                                                        <option value="1">1</option>
                                                                                        <option value="2">2</option>
                                                                                        <option value="3">3</option>
                                                                                        <option value="4">4</option>
                                                                                        <option value="5 ">5</option>
                                                                                        <option value="6">6</option>
                                                                                        <option value="7">7</option>
                                                                                        <option value="8">8</option>
                                                                                        <option value="9">9</option>
                                                                                        <option value="10">10</option>
                                                                                    </Form.Control>
                                                                                </Form.Group>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        </>
                                                    )}


                                                </>
                                            )}
                                        </>
                                    )}
                                    {/* Free throw here ------------------------------------------------------------------------------------ */}
                                    {formData.tag === 'FT' && (
                                        <>
                                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                <Form.Group controlId="additionalField">
                                                    <Form.Label>Shot:</Form.Label>
                                                    <Form.Control as="select" name="shot" value={formData.shot} onChange={handleChange}>
                                                        <option value="">Select Shot</option>
                                                        <option value="Made1">Made</option>
                                                        <option value="Miss1">Miss</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                            {formData.shot !== null && formData.shot !== '' && formData.shot === 'Made1' && (
                                                <>
                                                    <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                        <Form.Group controlId="sjn">
                                                            <Form.Label>sjn:</Form.Label>
                                                            <Form.Control as="select" name="sjn" value={formData.sjn} onChange={handleChange} >
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5 ">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </div>
                                                </>
                                            )}
                                            {formData.shot !== null && formData.shot !== '' && formData.shot === 'Miss1' && (
                                                <>
                                                    <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                        <Form.Group controlId="msjn">
                                                            <Form.Label>sjn:</Form.Label>
                                                            <Form.Control as="select" name="sjn" value={formData.sjn} onChange={handleChange} >
                                                                <option value="">Select shooterNo</option>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5 ">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </div>
                                                    {formData.shot !== null && formData.shot !== '' && formData.shot === 'Miss1' && (
                                                        <>
                                                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                <Form.Group controlId="miss_type" >
                                                                    <Form.Label>Miss Type:</Form.Label>
                                                                    <Form.Control as="select" name="miss_type" value={formData.miss_type} onChange={handleChange}>
                                                                        <option value="">Select miss type</option>
                                                                        <option value="Outofcourt">Out Of Court</option>
                                                                        <option value="ReBound">ReBound</option>
                                                                    </Form.Control>
                                                                </Form.Group>
                                                            </div>
                                                            {formData.miss_type === 'ReBound' && (
                                                                <>
                                                                    <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                        <Form.Group controlId="reb_type" >
                                                                            <Form.Label>Rebound Type:</Form.Label>
                                                                            <Form.Control as="select" name="reb_type" value={formData.reb_type} onChange={handleChange}>
                                                                                <option value="">Select miss type</option>
                                                                                <option value="OR">O.R</option>
                                                                                <option value="DR">D.R</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </div>
                                                                    {formData.reb_type === 'OR' && (
                                                                        <>
                                                                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                                <Form.Group controlId="or_jn">
                                                                                    <Form.Label>OR jn:</Form.Label>
                                                                                    <Form.Control as="select" name="or_jn" value={formData.or_jn} onChange={handleChange} >
                                                                                        <option value="">Select shooterNo</option>
                                                                                        <option value="1">1</option>
                                                                                        <option value="2">2</option>
                                                                                        <option value="3">3</option>
                                                                                        <option value="4">4</option>
                                                                                        <option value="5 ">5</option>
                                                                                        <option value="6">6</option>
                                                                                        <option value="7">7</option>
                                                                                        <option value="8">8</option>
                                                                                        <option value="9">9</option>
                                                                                        <option value="10">10</option>
                                                                                    </Form.Control>
                                                                                </Form.Group>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                    {formData.reb_type === 'DR' && (
                                                                        <>
                                                                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                                <Form.Group controlId="msjn">
                                                                                    <Form.Label>DR sjn:</Form.Label>
                                                                                    <Form.Control as="select" name="dr_jn" value={formData.dr_jn} onChange={handleChange} >
                                                                                        <option value="">Select shooterNo</option>
                                                                                        <option value="1">1</option>
                                                                                        <option value="2">2</option>
                                                                                        <option value="3">3</option>
                                                                                        <option value="4">4</option>
                                                                                        <option value="5 ">5</option>
                                                                                        <option value="6">6</option>
                                                                                        <option value="7">7</option>
                                                                                        <option value="8">8</option>
                                                                                        <option value="9">9</option>
                                                                                        <option value="10">10</option>
                                                                                    </Form.Control>
                                                                                </Form.Group>
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        </>
                                                    )}


                                                </>
                                            )}
                                        </>
                                    )}
                                    {formData.tag === 'FOUL' && (
                                        <>
                                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                <Form.Group controlId="foul_type">
                                                    <Form.Label>Shot:</Form.Label>
                                                    <Form.Control as="select" name="foul_type" value={formData.foul_type} onChange={handleChange}>
                                                        <option value="">Select Shot</option>
                                                        <option value="DEFENSIVE">DEFENSIVE</option>
                                                        <option value="OFFENSIVE">OFFENSIVE</option>
                                                        <option value="TECHNICAL FOUL">TECHNICAL FOUL</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                            {formData.foul_type === 'DEFENSIVE' && (
                                                <>
                                                    <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                        <Form.Group controlId="shot">
                                                            <Form.Label>Defensive Shot:</Form.Label>
                                                            <Form.Control as="select" name="shot" value={formData.shot} onChange={handleChange}>
                                                                <option value="">Select Offensive Shot</option>
                                                                <option value="Made">Made</option>
                                                                <option value="Miss">Miss</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </div>
                                                    <>
                                                        {formData.shot === 'Made' && (
                                                            <>
                                                                {/* Show additional options when 'Made' is selected */}
                                                                <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                    <Form.Group controlId="sjn">
                                                                        <Form.Label>sjn:</Form.Label>
                                                                        <Form.Control as="select" name="sjn" value={formData.sjn} onChange={handleChange}>
                                                                            <option value="">Select shooter No</option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>
                                                                            <option value="6">6</option>
                                                                            <option value="7">7</option>
                                                                            <option value="8">8</option>
                                                                            <option value="9">9</option>
                                                                            <option value="10">10</option>
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                </div>
                                                                <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                    <Form.Group controlId="ajn">
                                                                        <Form.Label>ajn:</Form.Label>
                                                                        <Form.Control as="select" name="ajn" value={formData.ajn} onChange={handleChange}>
                                                                            <option value="">Select assistNo</option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>
                                                                            <option value="6">6</option>
                                                                            <option value="7">7</option>
                                                                            <option value="8">8</option>
                                                                            <option value="9">9</option>
                                                                            <option value="10">10</option>
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                </div>
                                                                <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                    <Form.Group controlId="djn">
                                                                        <Form.Label>djn:</Form.Label>
                                                                        <Form.Control as="select" name="djn" value={formData.djn} onChange={handleChange}>
                                                                            <option value="">Select djn</option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>
                                                                            <option value="6">6</option>
                                                                            <option value="7">7</option>
                                                                            <option value="8">8</option>
                                                                            <option value="9">9</option>
                                                                            <option value="10">10</option>
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                </div>
                                                            </>
                                                        )}
                                                        {formData.shot === 'Miss' && (
                                                            <>
                                                                <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                    <Form.Group controlId="sjn">
                                                                        <Form.Label>sjn:</Form.Label>
                                                                        <Form.Control as="select" name="sjn" value={formData.sjn} onChange={handleChange}>
                                                                            <option value="">Select shooter No</option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>
                                                                            <option value="6">6</option>
                                                                            <option value="7">7</option>
                                                                            <option value="8">8</option>
                                                                            <option value="9">9</option>
                                                                            <option value="10">10</option>
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                </div>
                                                                <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                    <Form.Group controlId="shot_type">
                                                                        <Form.Label>{formData.shot} sub options:</Form.Label>
                                                                        <Form.Control as="select" name="shot_type" value={formData.shot_type} onChange={handleChange} >
                                                                            <option value="">Select Shot</option>
                                                                            <option value="Jump">Jump</option>
                                                                            <option value="Layup">LayUp</option>
                                                                            <option value="Tip">Tip</option>
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                </div>

                                                                <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                    <Form.Group controlId="additionalField" >
                                                                        <Form.Label>Miss Type:</Form.Label>
                                                                        <Form.Control as="select" name="miss_type" value={formData.miss_type} onChange={handleChange}>
                                                                            <option value="">Select miss type</option>
                                                                            <option value="Outofcourt">Out Of Court</option>
                                                                            <option value="ReBound">ReBound</option>
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                </div>
                                                                {formData.miss_type === 'ReBound' && (
                                                                    <>
                                                                        <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                            <Form.Group controlId="reboundType" >
                                                                                <Form.Label>Rebound Type:</Form.Label>
                                                                                <Form.Control as="select" name="reb_type" value={formData.reb_type} onChange={handleChange}>
                                                                                    <option value="">Select miss type</option>
                                                                                    <option value="OR">O.R</option>
                                                                                    <option value="DR">D.R</option>
                                                                                </Form.Control>
                                                                            </Form.Group>
                                                                        </div>
                                                                        {formData.reb_type === 'OR' && (
                                                                            <>
                                                                                <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                                    <Form.Group controlId="or_jn">
                                                                                        <Form.Label>OR sjn:</Form.Label>
                                                                                        <Form.Control as="select" name="or_jn" value={formData.or_jn} onChange={handleChange} >
                                                                                            <option value="">Select shooterNo</option>
                                                                                            <option value="1">1</option>
                                                                                            <option value="2">2</option>
                                                                                            <option value="3">3</option>
                                                                                            <option value="4">4</option>
                                                                                            <option value="5">5</option>
                                                                                            <option value="6">6</option>
                                                                                            <option value="7">7</option>
                                                                                            <option value="8">8</option>
                                                                                            <option value="9">9</option>
                                                                                            <option value="10">10</option>
                                                                                        </Form.Control>
                                                                                    </Form.Group>
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                        {formData.reb_type === 'DR' && (
                                                                            <>
                                                                                <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                                                    <Form.Group controlId="msjn">
                                                                                        <Form.Label>DR sjn:</Form.Label>
                                                                                        <Form.Control as="select" name="dr_jn" value={formData.dr_jn} onChange={handleChange} >
                                                                                            <option value="">Select shooterNo</option>
                                                                                            <option value="1">1</option>
                                                                                            <option value="2">2</option>
                                                                                            <option value="3">3</option>
                                                                                            <option value="4">4</option>
                                                                                            <option value="5 ">5</option>
                                                                                            <option value="6">6</option>
                                                                                            <option value="7">7</option>
                                                                                            <option value="8">8</option>
                                                                                            <option value="9">9</option>
                                                                                            <option value="10">10</option>
                                                                                        </Form.Control>
                                                                                    </Form.Group>
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </>
                                                                )}

                                                            </>
                                                        )}
                                                    </>

                                                </>
                                            )}

                                            {formData.foul_type === 'OFFENSIVE' && (
                                                <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                    <Form.Group controlId="msjn">
                                                        <Form.Label>sjn:</Form.Label>
                                                        <Form.Control as="select" name="sjn" value={formData.sjn} onChange={handleChange} >
                                                            <option value="">Select shooterNo</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5 ">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </div>
                                            )}

                                        </>
                                    )}
                                    {formData.tag === 'TURNOVER' && (
                                        <>
                                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                <Form.Group controlId="turnover_type">
                                                    <Form.Label>Turnover :</Form.Label>
                                                    <Form.Control as="select" name="turnover_type" value={formData.turnover_type} onChange={handleChange}>
                                                        <option value="">Select Turnover</option>
                                                        <option value="VOILATION">VOILATION</option>
                                                        <option value="STEAL">STEAL</option>
                                                        <option value="Outofcourt">OUT OF COURT</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                            {formData.turnover_type !== null && formData.turnover_type !== '' && (formData.turnover_type === 'VOILATION' || formData.turnover_type === 'STEAL') && (
                                                <>
                                                    <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                        <Form.Group controlId="sjn">
                                                            <Form.Label>sjn:</Form.Label>
                                                            <Form.Control as="select" name="sjn" value={formData.sjn} onChange={handleChange} >
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5 ">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </div>
                                                </>
                                            )}

                                        </>
                                    )}
                                    {formData.tag === 'SUBSTITUTION' && (
                                        <>
                                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                <Form.Group controlId="player_in_jn">
                                                    <Form.Label>In player :</Form.Label>
                                                    <Form.Control as="select" name="player_in_jn" value={formData.player_in_jn} onChange={handleChange}>
                                                        <option value="">Select In Player</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5 ">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        {/* <option value="">Select In Player</option>
                                                        {[...Array(10)].map((_, index) => (
                                                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                                                        ))} */}
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                            <div style={{ flex: '0 0 40%', marginBottom: '10px', marginRight: '10px' }}>
                                                <Form.Group controlId="player_out_jn">
                                                    <Form.Label>Out Plyaer :</Form.Label>
                                                    <Form.Control as="select" name="player_out_jn" value={formData.player_out_jn} onChange={handleChange}>
                                                        <option value="">Select Out Player</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5 ">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        {/* <option value="player_out_jn">Select Out Player No</option>
                                                        {[...Array(10)].map((_, index) => (
                                                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                                                        ))} */}
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                            {/* Render other fields as needed */}
                        </div>
                        <Button variant="primary" type="submit">Submit</Button>
                        <Button type="reset" value="Reset">Reset</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default New;
