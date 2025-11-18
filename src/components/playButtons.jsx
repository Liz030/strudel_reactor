function playButtons({ onPlay, onStop }) {


    return (
        <>
            <div>
                <button id="play" className="btnPlay" onClick={onPlay}>Play</button>
                <button id="stop" className="btnStop" onClick={onStop}>Stop</button>
            </div>
        </>
    );
}

export default playButtons;