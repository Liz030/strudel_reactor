import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';


import SoundControl from './components/soundControls';
import PlayButtons from './components/playButtons';
import ProcButtons from './components/procButtons';
import TextToPreprocess from './components/textToPreprocess';
import MusicControlButton from './components/musicControlButton';
import Popup from './components/popUp';


let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

//export function SetupButtons() {

//    document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//    document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//    document.getElementById('process').addEventListener('click', () => {
//        Proc()
//    }
//    )
//    document.getElementById('process_play').addEventListener('click', () => {
//        if (globalEditor != null) {
//            Proc()
//            globalEditor.evaluate()
//        }
//    }
//    )
//}



//export function ProcAndPlay() {
//    if (globalEditor != null && globalEditor.repl.state.started == true) {
//        console.log(globalEditor)
//        Proc()
//        globalEditor.evaluate();
//    }
//}

//export function Proc() {

//    let proc_text = document.getElementById('proc').value
//    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//    ProcessText(proc_text);
//    globalEditor.setCode(proc_text_replaced)
//}

//export function ProcessText(match, ...args) {

//    let replace = ""
//    if (document.getElementById('flexRadioDefault2').checked) {
//        replace = "_"
//    }

//    return replace
//}

export default function StrudelDemo() {

    const hasRun = useRef(false);

    // working stop and play buttons
    const handlePlay = () => {
        globalEditor.evaluate()
    }
    const handleStop = () => {
        globalEditor.stop()
    }


    // save and re load textpool for song text
    const [songText, setSongText] = useState(stranger_tune)

    const proc = () => {

    }

    const ProcAndPlay = () => {
        if (globalEditor != null && globalEditor.repl.state.started == true) {

            globalEditor.evaluate()
        }
    }

    //MUSIC CONTROL button- popup toggle between showing and hiding control settings based on state
    const [showPopup, setShowPopup] = useState(false);
    const popupButtonClick = () => {
        setShowPopup(!showPopup);
    }

    // checkboxes
    const initialItems = () => (
        [
            { id: 1, name: 'item A', checked: false },
            { id: 2, name: 'item B', checked: false },
            { id: 3, name: 'item C', checked: false },
            { id: 3, name: 'item D', checked: false },
        ]
    );


    const [isChecked, setItems] = useState(initialItems);

    const handleCheckboxChange = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };


    useEffect(() => {

        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

            document.getElementById('proc').value = stranger_tune
            //SetupButtons()
            //Proc()
        }
        globalEditor.setCode(songText);
    }, [songText]);


    return (
        <div>
            <h2>Strudel Demo</h2>
            <main>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>

                            <TextToPreprocess defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />

                        </div>
                        <div className="col-md-4">

                            <nav>
                                typing will auto proc, play will play as is
                                <ProcButtons onPressProc={ProcAndPlay} />
                                <br />
                                <PlayButtons onPlay={handlePlay} onStop={handleStop} />



                                SHOW MUSIC CONTROLS: This button below needs to be fixed- not working nested to ask, should work as below red button
                                <MusicControlButton onClick={popupButtonClick} checked={isChecked} onChange={handleCheckboxChange} show={showPopup} />



                                <button id="popup" class="btn btn-outline-danger" onClick={popupButtonClick}> {showPopup ? 'Hide Music Controls' : 'Show Music Controls'} </button>

                                <Popup show={showPopup} checked={isChecked} items={initialItems()} onChange={() => handleCheckboxChange(initialItems().id)} />

                                <div>
                                    {isChecked.map(item => (
                                        <div key={item.id}>
                                            <input className="form-check-input" type="checkbox"  onChange={() => handleCheckboxChange(item.id)} />
                                            <label>{item.name}</label>
                                        </div>
                                    ))}
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                        <div className="col-md-4">



                        </div>
                    </div>
                </div>
                <canvas id="roll"></canvas>
            </main >
        </div >
    );


}