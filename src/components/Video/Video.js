import React from "react";
import "./Video.css";
import ReactPlayer from "react-player";

export default function App() {
    const [activity, setActivity] = React.useState([
        {
            type: "",
            startTime: 0,
            endTime: 0,
            activityText: ""
        }
    ]);

    const [seekBar, setSeekBar] = React.useState({
        seeking: false,
        played: 0,
        playing: true,
        controls: false,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
    });

    let player = React.useRef(null);

    const newActivity = {
        type: "",
        startTime: 0,
        endTime: 0,
        activityText: ""
    };

    function onChangeActivity(e) {
        newActivity.type = e.target.innerText;
        console.log(e.target.parentNode.children);
    }

    function changeStartTime(e) { }

    function changeStopTime(e) { }

    function changeActivityText(e) { }

    function disableSuccessNotification(e) {
        e.target.innerHTML = "";
        e.target.style.display = "none";
    }

    function handleActivityFormSubmit(e) {
        e.preventDefault();
        newActivity.startTime = parseInt(
            document.getElementById("start-time").value
        );
        newActivity.endTime = parseInt(document.getElementById("end-time").value);
        newActivity.activityText = document.getElementById("caption-text").value;

        let newActivityArray = activity;
        newActivityArray.push(newActivity);
        setActivity(newActivityArray);
        console.log(activity);
        document.getElementById("form-submit-check").innerHTML = "Success!";
        document.getElementById("form-submit-check").style.display = "block";
    }

    function handleSeekMouseDown(e) {
        setSeekBar({ seeking: true });
    }

    function handleSeekChange(e) {
        console.log(parseFloat(e.target.value));
        setSeekBar({ ...seekBar, played: e.target.value });
    }

    function handleSeekMouseUp(e) {
        setSeekBar({ seeking: false });
        console.log(e.target.value);
        player.seekTo(e.target.value);
    }

    function handleProgress(state) {
        //console.log(state)
        if (!seekBar.seeking) {
            setSeekBar({ ...seekBar, played: parseFloat(state.playedSeconds) });
        }
        //to show the activity/function array corresponding to time
        activity.map(function (act) {
            const bubble = document.getElementById("bubble");
            if (parseInt(state.playedSeconds) >= act.startTime) {
                bubble.style.display = "block";
                bubble.innerHTML = act.activityText;
            }
            if (parseInt(state.playedSeconds) >= act.endTime) {
                bubble.style.display = "none";
                bubble.innerHTML = "";
            }
        });
    }

    function handleDuration(duration) {
        console.log(duration);
        document.getElementById("range-seek-bar").max = duration;
        setSeekBar({ ...seekBar, duration: duration });
    }

    function secondsToHms(d) {
        d = Number(d);
        const h = Math.floor(d / 3600);
        const m = Math.floor((d % 3600) / 60);
        const s = Math.floor((d % 3600) % 60);

        const hDisplay = h > 0 ? (h > 9 ? h + ":" : "0" + h + ":") : "";
        const mDisplay = m > 0 ? (m > 9 ? m + ":" : "0" + m + ":") : "0" + m + ":";
        const sDisplay = s > 0 ? (s > 9 ? s : "0" + s) : "";

        return hDisplay + mDisplay + sDisplay;
    }

    return (
        <div className="modal">
            <div id="modal-head">
                <h1>Create Smart Video</h1>
                <span id="close-button">&#x2716;</span>
            </div>

            <div id="create-tab">
                <div id="player-section">
                    <div className="form-controls">
                        <label htmlFor="vidname">Name of the video:</label>
                        <div>
                            <input name="vidname" id="vidname" type="text" />
              &#x270E;
            </div>
                    </div>

                    <div id="ytvideo">
                        <ReactPlayer
                            ref={(pl) => {
                                player = pl;
                            }}
                            url="https://www.youtube.com/watch?v=4ZSjgSgnldU"
                            width="100%"
                            height="100%"
                            onProgress={handleProgress}
                            onDuration={handleDuration}
                        />
                        <div id="range-parent">
                            <input
                                id="range-seek-bar"
                                type="range"
                                min={0}
                                step="any"
                                value={seekBar.played}
                                onMouseDown={handleSeekMouseDown}
                                onChange={handleSeekChange}
                                onMouseUp={handleSeekMouseUp}
                            />
                            <span id="seektime">
                                {secondsToHms(Math.floor(seekBar.played))}/
                {secondsToHms(Math.floor(seekBar.duration))}
                            </span>
                            <output id="bubble"></output>
                        </div>
                    </div>
                </div>

                <form id="caption-section" onSubmit={handleActivityFormSubmit}>
                    <div id="attach-activity">
                        Attach Activity
            <div id="activity-type" onClick={onChangeActivity}>
                            <span className="activity">Question</span>
                            <span className="activity">Caption</span>
                        </div>
                    </div>

                    <div id="duration">
                        Choose the duration the caption would be visible in seconds:
            <div id="duration-sliders">
                            <div id="start-slider">
                                <div className="slider-arrows">
                                    <span className="arrows">&#706;</span>
                                    <input
                                        min={secondsToHms(0)}
                                        placeholder={secondsToHms(0)}
                                        className="timers"
                                        onBlur={changeStartTime}
                                        id="start-time"
                                    />
                                    <span className="arrows">&#707;</span>
                                </div>
                Start time
              </div>

                            <div id="end-slider">
                                <div className="slider-arrows">
                                    <span className="arrows">&#706;</span>
                                    <input
                                        max={secondsToHms(seekBar.duration)}
                                        className="timers"
                                        onBlur={changeStopTime}
                                        id="end-time"
                                    />
                                    <span className="arrows">&#707;</span>
                                </div>
                End time
              </div>
                        </div>
                    </div>

                    <div id="caption-area">
                        <label htmlFor="caption-text">Add a caption here</label>
                        <textarea
                            type="text"
                            name="caption-text"
                            id="caption-text"
                            onBlur={changeActivityText}
                        />
                    </div>

                    <button type="submit" id="form-submit-button">
                        Post
          </button>
                    <p id="form-submit-check" onClick={disableSuccessNotification}></p>
                </form>
            </div>
        </div>
    );
}
