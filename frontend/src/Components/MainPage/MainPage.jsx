import React, { useState } from 'react'
import axios from 'axios';
import "./MainPage.css"
import { Button, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { HooksMainFunction } from './HooksMainFunction';
import { faBackward, faPause, faPlay, faForward, faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Complete.css";
import Location from './Location';
import Dropdown from 'react-bootstrap/Dropdown';
function MainPage() {
    const {
        time, setTime,
        isDragging, setIsDragging,
        isPlaying, setIsPlaying,
        teamAPoints, setTeamAPoints,
        teamBPoints, setTeamBPoints,
        selectedTeam, setSelectedTeam,
        selectedAction, setSelectedAction,
        selectedSubAction, setSelectedSubAction,
        assistNo, setAssistNo,
        jerseyNo, setJerseyNo,
        matchPeriod, setMatchPeriod,
        shotType, setShotType,
        videoRef, timelineRef,
        secondTimelineRef, isOpen,
        setIsOpen, missType,
        setMissType, reboundType,
        setReboundType, locationVisible,
        setLocationVisible, handleMouseDown,
        handleMouseMove, handleMouseUp,
        handleTimeUpdate, handlePlayPause,
        handleBackward, handleForward,
        handleTeamButtonClick, handlePointClick,
        handleActionSelect, handleSubActionSelect,
        handleSaveButtonClick, resetOptions,
        formatTime, toggleLocation,
        handleContextMenu, resetZoomLevel, transformRef, handleProgressBarChange, currentTime, duration, formData, handleChange, getButtonColor,
        filteredPoints, selectedShotType, handleShotTypeChange, changePlaybackSpeed, playbackSpeed, formatDuration, key, setKey, formatTimevideo,
        handleStartGame, startGame, formatReverseTime, handleStartGameClick, startTimer, stopTimer, resetTimer, timer,
    } = HooksMainFunction(); // Call the hook here


    return (
        <>

            <Row className='main'>
                <Col xs={12} md={9} className='col-one'>
                    <Row className='videomain'>
                        <TransformWrapper ref={transformRef} >
                            <TransformComponent className="videocompo">
                                <video src="/Video/sqmatch.mp4" muted className='video-cont' ref={videoRef} onTimeUpdate={handleTimeUpdate} />
                            </TransformComponent>
                        </TransformWrapper>
                        {/* video time code  */}
                        <div style={{ position: "absolute", color: "white", fontSize: "30px", backgroundColor: 'gray', display: 'block', width: 'auto' }}>
                            {formatTime(timer)}
                        </div>


                    </Row>

                    <div className='videocontrols'>
                        <div style={{ display: "inline-block", fontSize: "13px" }} className='me-3'>
                            {/* Select dropdown for shot type */}
                            <select value={selectedShotType} onChange={handleShotTypeChange}>
                                <option value="All">All</option>
                                <option value="2P">2P</option>
                                <option value="3P">3P</option>
                                <option value="FREE THROW">FT</option>
                                <option value="FOUL">FOUL</option>
                                <option value="TEAM REBOUND">TR</option>
                                <option value="INBOUND">IB</option>
                                <option value="TURNOVER">TO</option>
                                <option value="SUBSTITUTION">SUB.</option>
                            </select>

                            {/* Render fetched data */}

                        </div>
                        <FontAwesomeIcon icon={faBackward} onClick={handleBackward} style={{ marginRight: "10px", color: "white" }} />
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} onClick={handlePlayPause} style={{ marginRight: "10px", color: "white" }} />
                        <FontAwesomeIcon icon={faForward} onClick={handleForward} style={{ marginRight: "20px", color: "white" }} />
                        <div style={{ display: "inline-block", marginRight: '10px', fontSize: "12px" }}>
                            <select value={playbackSpeed} onChange={(e) => changePlaybackSpeed(parseFloat(e.target.value))}>
                                <option value="0.5">0.5x</option>
                                <option value="1">1x</option>
                                <option value="2">2x</option>
                                <option value="4.5">4x</option>
                                {/* <option value="10">10x</option> */}
                            </select>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            style={{ width: "40%" }}
                            value={videoRef.current ? (videoRef.current.currentTime / videoRef.current.duration) || 0 : 0}
                            onChange={(e) => handleProgressBarChange(e.target.value)}
                        />

                        <span style={{ color: "white", marginLeft: '15px', fontSize: "12px" }}>{currentTime ? formatTime(time) : "00:00"}</span>

                        /<span style={{ color: "white", marginRight: '15px', fontSize: "12px" }}>{formatDuration(videoRef.current ? videoRef.current.duration : NaN)}</span>


                        <FontAwesomeIcon icon={faExpand} onClick={resetZoomLevel} style={{ marginRight: "10px", color: "white" }} />




                    </div>
                    <Row className='reelmain'>
                        <div className="timeline-container" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} >
                            <div ref={timelineRef} className="timeline-bar" style={{ left: "auto", right: `${(time / (videoRef.current?.duration || 1)) * 100}%`, }} >
                                {teamAPoints.map((point, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handlePointClick(point.time)}
                                        onContextMenu={(e) => handleContextMenu(e, point.time, 'TeamA')}
                                        style={{
                                            position: 'absolute',
                                            left: ` ${(point.time / (videoRef.current?.duration || 1)) * 100}%`,
                                            top: index % 2 === 0 ? 0 : '50%', // Alternate between top and bottom based on index
                                            bottom: index % 2 === 0 ? '50%' : 0, // Alternate between bottom and top based on index
                                            transform: 'translateX(-50%)', // Center the line horizontally
                                            width: 3, // Adjust width as needed
                                            height: '50%', // Set height to match the timeline-container
                                            backgroundColor: (() => {
                                                switch (point.shot || point.action) {
                                                    case '2P':
                                                        return 'blue';
                                                    case '3P':
                                                        return 'grey';
                                                    case 'FREE THROW':
                                                        return 'green';
                                                    case 'FOUL':
                                                        return 'red';
                                                    case 'TEAM REBOUND':
                                                        return 'yellow';
                                                    case 'INBOUND':
                                                        return 'skyblue';
                                                    case 'TURNOVER':
                                                        return 'black';
                                                    case 'SUBSTITUTION':
                                                        return 'white';
                                                    default:
                                                        return 'blue'; // Default color
                                                }
                                            })(),
                                            cursor: 'pointer',
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="red-line">
                                <div className="arrow-up"></div>
                                {/* <span className="timestamp">{formatTime(time)}</span> */}
                            </div>

                        </div>

                        <div className="timeline-container" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
                            <div ref={secondTimelineRef} className="timeline-bar"
                                style={{ left: "auto", right: `${(time / (videoRef.current?.duration || 1)) * 100}%`, }} >
                                {teamBPoints.map((point, index) => (

                                    <div
                                        key={index}
                                        onClick={() => handlePointClick(point.time)}
                                        onContextMenu={(e) => handleContextMenu(e, point.time)}
                                        style={{
                                            position: 'absolute',
                                            left: ` ${(point.time / (videoRef.current?.duration || 1)) * 100}%`,
                                            top: index % 2 === 0 ? 0 : '50%', // Alternate between top and bottom based on index
                                            bottom: index % 2 === 0 ? '50%' : 0, // Alternate between bottom and top based on index
                                            transform: 'translateX(-50%)', // Center the line horizontally
                                            width: 3, // Adjust width as needed
                                            height: '50%', // Set height to match the timeline-container
                                            backgroundColor: (() => {
                                                switch (point.shot || point.action) {
                                                    case '2P':
                                                        return 'blue';
                                                    case '3P':
                                                        return 'grey';
                                                    case 'FREE THROW':
                                                        return 'green';
                                                    case 'FOUL':
                                                        return 'red';
                                                    case 'TEAM REBOUND':
                                                        return 'yellow';
                                                    case 'INBOUND':
                                                        return 'skyblue';
                                                    case 'TURNOVER':
                                                        return 'black';
                                                    case 'SUBSTITUTION':
                                                        return 'white';
                                                    default:
                                                        return 'blue'; // Default color
                                                }
                                            })(),
                                            cursor: 'pointer',
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="red-line">
                                <div className="arrow-up"></div>
                                {/* <span className="timestamp">{formatTime(time)}</span> */}
                            </div>

                        </div>
                    </Row>
                </Col>


                <Col xs={6} md={3} className='col-tow'>


                    {/* <div style={{ maxHeight: '500px', overflowY: 'auto' }}> */}
                    <Button variant="primary" className='mb-4' onClick={startTimer} >Start Game</Button>
                    <Button variant="primary" className='mb-4' onClick={stopTimer} >Stop Game</Button>
                    <Button variant="primary" className='mb-4' onClick={resetTimer} >Reset Timer</Button>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="first" title="Annotations">
                            <div>
                                <button className="btn btn-primary " onClick={() => handleTeamButtonClick("Match Period")} >Match Period </button>
                                {selectedTeam === "Match Period" ? (
                                    <div>
                                        <select className="form-select mt-2" onChange={(e) => setMatchPeriod(e.target.value)}>
                                            <option value="">Select...</option>
                                            <option value="START Game">START Game</option>
                                            <option value="1ST QTR">1ST QTR</option>
                                            <option value="2ND QTR">2ND QTR</option>
                                            <option value="3RD QTR">3RD QTR</option>
                                            <option value="4TH QTR">4TH QTR</option>
                                            <option value="END GAME">END GAME</option>
                                        </select>
                                        <Button className="mt-2" onClick={handleSaveButtonClick}> Save </Button>
                                    </div>
                                ) : (
                                    <div className='team-btn'>
                                        <button className="btn btn-primary mt-2 team-btn " onClick={() => handleTeamButtonClick("Team A")}>  Team A </button>
                                        <button className="btn btn-primary mt-2 team-btn" onClick={() => handleTeamButtonClick("Team B")}> Team B</button>
                                        {selectedTeam && (
                                            <div>
                                                {selectedAction ? (
                                                    <button className="btn btn-secondary mt-2 me-2" onClick={() => handleActionSelect(null)}>Back</button>
                                                ) : (
                                                    ['2P', '3P', 'FREE THROW', 'FOUL', 'TEAM REBOUND', 'INBOUND', 'TURNOVER', 'SUBSTITUTION'].map((action, index) => (
                                                        <button className={`btn mt-2 me-2 ${getButtonColor(action)}`} key={index} onClick={() => handleActionSelect(action)}>{action}</button>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                        {selectedAction && (
                                            <div>
                                                <select className="form-select mt-2" onChange={(e) => handleSubActionSelect(e.target.value)} >
                                                    <option value="">Select...</option>
                                                    {selectedAction === "2P" && (
                                                        <React.Fragment>
                                                            <option value="Made">Made</option>
                                                            <option value="Miss">Miss</option>
                                                            <option value="Foul">Foul</option>
                                                            <option value="FreeThrow">Free Throw</option>
                                                        </React.Fragment>
                                                    )}
                                                    {selectedAction === "3P" && (
                                                        <React.Fragment>
                                                            <option value="Made">Made</option>
                                                            <option value="Miss">Miss</option>
                                                            <option value="Foul">Foul</option>
                                                            <option value="FreeThrow">Free Throw</option>
                                                        </React.Fragment>
                                                    )}
                                                    {selectedAction === "FREE THROW" && (
                                                        <React.Fragment>
                                                            <option value="Made1">Made</option>
                                                            <option value="Miss1">Miss</option>
                                                        </React.Fragment>
                                                    )}
                                                    {selectedAction === "FOUL" && (
                                                        <React.Fragment>
                                                            <option value="DEFENSIVE">DEFENSIVE</option>
                                                            <option value="OFFENSIVE">OFFENSIVE</option>
                                                            <option value="TECHNICAL FOUL">TECHNICAL FOUL</option>
                                                        </React.Fragment>
                                                    )}
                                                    {selectedAction === "TEAM REBOUND" && (
                                                        <React.Fragment>
                                                            <option value="DEFENSIVE">DEFENSIVE</option>
                                                            <option value="OFFENSIVE">OFFENSIVE</option>
                                                        </React.Fragment>
                                                    )}
                                                    {/* {selectedAction === 'INBOUND' && (
                                                <React.Fragment>
                                                    <option value="Made1">Made</option>
                                                    <option value="Miss1">Miss</option>                                               
                                                </React.Fragment>
                                            )} */}
                                                    {selectedAction === "TURNOVER" && (
                                                        <React.Fragment>
                                                            <option value="VOILATION">VOILATION</option>
                                                            <option value="STEAL">STEAL</option>
                                                            <option value="OUT OF COURT">OUT OF COURT</option>
                                                        </React.Fragment>
                                                    )}
                                                    {selectedAction === "SUBSTITUTION" && (
                                                        <React.Fragment>
                                                            <option value="SUBSTITUTION1">SUBSTITUTION</option>
                                                        </React.Fragment>
                                                    )}
                                                </select>
                                            </div>
                                        )}
                                        {selectedSubAction && (
                                            <div>
                                                {selectedSubAction === "Made" && (
                                                    <div>
                                                        <h6 className="text-white mt-2">Jersey No.</h6>
                                                        <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)}>
                                                            <option value="">Select Jersey number</option>
                                                            {[...Array(10)].map((_, index) => (
                                                                <option key={index} value={index + 1}> {index + 1}  </option>
                                                            ))}
                                                        </select>
                                                        <button className="btn btn-primary mt-2 me-2" onClick={toggleLocation}> Location </button>{" "}
                                                        {/* Toggle Location button */}
                                                        <h6 className="text-white  mt-2">Assist No.</h6>
                                                        <select className="form-select mt-2" onChange={(e) => setAssistNo(e.target.value)}>
                                                            <option value="">Select Assist No.</option>
                                                            {[...Array(10)].map((_, index) => (
                                                                <option key={index} value={index + 1}> {index + 1} </option>
                                                            ))}
                                                        </select>
                                                        <h6 className="text-white  mt-2">Shot Type</h6>
                                                        <select className="form-select mt-2" onChange={(e) => setShotType(e.target.value)}>
                                                            <option value="">Select Shot Type</option>
                                                            <option value="Layup">Layup</option>
                                                            <option value="Jump">Jump</option>
                                                            <option value="Tip">Tip</option>
                                                        </select>
                                                    </div>
                                                )}
                                                {selectedSubAction === "Miss" && (
                                                    <div>
                                                        <select className="form-select mt-2" onChange={(e) => setMissType(e.target.value)}>
                                                            <option value="">Select</option>
                                                            <option value="OutBound">OutBound</option>
                                                            <option value="ReBound">ReBound</option>
                                                            <option value="Foul">Foul</option>
                                                            <option value="Block">Block</option>
                                                        </select>
                                                        {missType === "ReBound" && (
                                                            <div className="mt-2">
                                                                <select className="form-select" onChange={(e) => setReboundType(e.target.value)} >
                                                                    <option value="">Select Rebound Type</option>
                                                                    <option value="O.R."> O.R. - Offensive Rebound </option>
                                                                    <option value="D.R."> D.R. - Defensive Rebound </option>
                                                                </select>
                                                            </div>
                                                        )}
                                                        {reboundType === "O.R." || reboundType === "D.R." ? (
                                                            <div>
                                                                <h6>Jersey No.</h6>
                                                                <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)} >
                                                                    <option value="">Select Jersey number</option>
                                                                    {[...Array(10)].map((_, index) => (
                                                                        <option key={index} value={index + 1}>{index + 1}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                                {selectedSubAction === "Foul" && (
                                                    <div>
                                                        <h6>Team A Jersey No.</h6>
                                                        <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)}>
                                                            <option value="">Select Jersey number</option>
                                                            {[...Array(10)].map((_, index) => (
                                                                <option key={index} value={index + 1}> {index + 1} </option>
                                                            ))}
                                                        </select>
                                                        <button className="btn btn-primary mt-2 me-2" onClick={toggleLocation}> Location </button>

                                                        <h6>Team B Jersey No.</h6>
                                                        <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)}>
                                                            <option value="">Select Jersey number</option>
                                                            {[...Array(10)].map((_, index) => (
                                                                <option key={index} value={index + 1}> {index + 1} </option>
                                                            ))}
                                                        </select>
                                                        <button className="btn btn-primary mt-2 me-2" onClick={toggleLocation} > Location</button>
                                                    </div>
                                                )}
                                                {selectedSubAction === "FreeThrow" && (
                                                    <div>
                                                        <h6>Team A Jersey No.</h6>
                                                        <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)}>
                                                            <option value="">Select Jersey number</option>
                                                            {[...Array(10)].map((_, index) => (
                                                                <option key={index} value={index + 1}> {index + 1}</option>
                                                            ))}
                                                        </select>
                                                        <button className="btn btn-primary mt-2 me-2" onClick={toggleLocation} > Location </button>

                                                        <h6>Assist No.</h6>
                                                        <select className="form-select mt-2" onChange={(e) => setAssistNo(e.target.value)}>
                                                            <option value="">Select Assist No.</option>
                                                            {[...Array(10)].map((_, index) => (
                                                                <option key={index} value={index + 1}> {index + 1}</option>
                                                            ))}
                                                        </select>
                                                        <h6>Team B Jersey No.</h6>
                                                        <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)} >
                                                            <option value="">Select Jersey number</option>
                                                            {[...Array(10)].map((_, index) => (
                                                                <option key={index} value={index + 1}> {index + 1}</option>
                                                            ))}
                                                        </select>
                                                        <button className="btn btn-primary mt-2 me-2" onClick={toggleLocation}> Location</button>
                                                    </div>
                                                )}
                                                {selectedSubAction === "Made1" && (
                                                    <div>
                                                        <h6 className="text-white mt-2">Jersey No.</h6>
                                                        <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)} >
                                                            <option value="">Select Jersey number</option>
                                                            {[...Array(10)].map((_, index) => (
                                                                <option key={index} value={index + 1}>{index + 1} </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                )}
                                                {selectedSubAction === "Miss1" && (
                                                    <div>
                                                        <h6 className="text-white mt-2">Jersey No.</h6>
                                                        <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)} >
                                                            <option value="">Select Jersey number</option>
                                                            {[...Array(10)].map((_, index) => (
                                                                <option key={index} value={index + 1}> {index + 1}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                )}
                                                {selectedSubAction === "SUBSTITUTION1" && (
                                                    <div>
                                                        <h6 className="text-white mt-2"> Out Player Jersey No. </h6>
                                                        <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)}>
                                                            <option value="">Select Jersey number</option>
                                                            {[...Array(10)].map((_, index) => (
                                                                <option key={index} value={index + 1}> {index + 1}</option>
                                                            ))}
                                                        </select>
                                                        <h6 className="text-white mt-2">
                                                            In Player Jersey No.
                                                        </h6>
                                                        <select className="form-select mt-2" onChange={(e) => setJerseyNo(e.target.value)}>
                                                            <option value="">Select Jersey number</option>
                                                            {[...Array(10)].map((_, index) => (
                                                                <option key={index} value={index + 1}>  {index + 1}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                )}
                                                <Button className="mt-2 me-4" onClick={handleSaveButtonClick}>Save </Button>
                                                <button className="btn btn-secondary mt-2" onClick={() => handleActionSelect(null)}>Cancel</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Tab>
                        <Tab eventKey="second" title="Quality Control" style={{ color: 'white', maxHeight: '550px', overflowY: 'auto' }}>
                            <div>
                                <div>
                                    <h2>Team A Points</h2>
                                    <div>
                                        {teamAPoints.map((point, index) => (
                                            // Check if point.shot exists and is not null
                                            point.shot && (
                                                <div key={index} className="team-point">
                                                    {/* Assuming point.shot contains the shot type */}
                                                    <span>Time: {point.time}</span>
                                                    <span className="bold">Shot: {point.shot}</span>
                                                    <span> {point.made} {point.miss}
                                                        {point.miss_reb} {point.shot_foul} {point.mwf}  {point.miss_outb}  {point.mwf}</span>
                                                    {/* <span>{index + 1}</span> */}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                    <h2>Team B Points</h2>
                                    <div>
                                        {teamBPoints.map((point, index) => (
                                            // Check if point.action exists and is not null
                                            point.action && (
                                                <div key={index}>
                                                    {/* Assuming point.action contains the action */}
                                                    Time: {point.time}, Action: {point.action}, Number: {index + 1}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Tab>

                    </Tabs>
                    {/* </div> */}
                </Col>
            </Row>
            {locationVisible && <Location />}
        </>
    )
}
export default MainPage
