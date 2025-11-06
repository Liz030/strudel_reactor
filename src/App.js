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

    // save and re load textpool for song text
    const [songText, setSongText] = useState(stranger_tune)

    // proc
    //const ProcAndPlay = () => {
    //    if (globalEditor != null && globalEditor.repl.state.started == true) {
    //        console.log(globalEditor)
    //        Proc()
    //        globalEditor.evaluate();
    //    }
    //}

    //save

    const saveSettings = (settings) => {
        localStorage.setItem('userSettings', JSON.stringify(settings))
    };

    //load
    const loadSettings = () => {
        const storedSettings = localStorage.getItem('userSettings');
        return storedSettings ? JSON.parse(storedSettings) : null;
    };

    const [settings, setSettings] = useState(() => {
        const saved = loadSettings();
        return saved || { notifications: true };
    });

    useEffect(() => {
        saveSettings(settings);
    }, [settings]);

    const handleChange = (newChanges) => {
        setSettings(prev => ({ ...prev, isChecked, newChanges }))
    }


    const Proc = () => {

        let proc_text = document.getElementById('proc').value
        let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
        ProcessText(proc_text);
        globalEditor.setCode(proc_text_replaced)
    }

    const ProcessText=(match, ...args) => {

        let replace = ""
        if (document.getElementById(handleCheckboxChange).checked) {
            replace = "_"
        }

        return replace
    }


    const songTextReplaced = songText.replace('setcps(140/60/4)', 'setcps(180/ 60 / 4)');

    const [cpm, setCpm] = useState('');
    const cpmNumber = Number(cpm);


    const hasRun = useRef(false);

    // working stop and play buttons
    const handlePlay = () => {
        globalEditor.evaluate()
    }
    const handleStop = () => {
        globalEditor.stop()
    }



    

    //MUSIC CONTROL button- popup toggle between showing and hiding control settings based on state
    const [showPopup, setShowPopup] = useState(false);
    const popupButtonClick = () => {
        setShowPopup(!showPopup);
    }

   

    const saveStateToLocalStorate = () => {
        localStorage.setItem("initialItems", JSON.stringify(this.initialItems));
    }



    

    

    // checkboxes
    const initialItems = () => (
        [
            { id: 1, value: 'drums:', originalState: 'drums:', name: 'item A', checked: false },
            { id: 2, value: 'drums2:', originalState: 'drums2:', name: 'item B', checked: false },
            { id: 3, value: 'main_arp:', originalState: 'main_arp:', name: 'item C', checked: false },
            { id: 4, value: 'bassline:', originalState: 'bassline:', name: 'item D', checked: false },
        ]
    );


    const [isChecked, setItems] = useState(initialItems);


    // change value and checked based on check value to silence
    const handleCheckboxChange = (id) => {
        

        setItems(
            prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, value: item.checked ? item.originalState : '_' + item.originalState, checked: !item.checked } : item)

            
        );

     
    };

    const state = {
        initialItems: []
    }


    // store array to json - stored local storage
    const storeArrayItemsJson = () => {
        const jsonString = JSON.stringify(isChecked);
        localStorage.setItem('checkedItems', jsonString);

    };

    // load arry from local storage
    const loadArrayItemsJson = () => {
        try {
            const storedData = localStorage.getItem('checkedItems');

            const passData = JSON.parse(storedData);
            setItems(passData);

        }
        catch (error) {
            console.error('no parse data ', error)
        }
    }




    const getStateFromLocalStorage = () => {
        fetch('settings.json')
            .then(response => response.json())
            .then(data => this.setState({ isChecked: data }))
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
                                <ProcButtons />
                                <br />
                                <PlayButtons onPlay={handlePlay} onStop={handleStop} />


                                <button className="btn btn-light" onClick={storeArrayItemsJson} >Save State to local storage </button>
                                <button className="btn btn-dark" onClick={loadArrayItemsJson} >load State to local storage </button>



                                <div>

                                    <label htmlFor="volume_range" className="form-label">volume</label>
                                    <input type="range" className="form-range" min="0" max="5" step="0.01" id="volume_range" />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Set CPM</span>
                                    </div>
                                    <input type="text" className="form-control" id='cpm_text_imput' placeholder="120" aria-label="cpm" aria-describedby="cpm-label" htmlFor='CPM_slider' />
                                </div>




                                SHOW MUSIC CONTROLS: This button below needs to be fixed- not working nested to ask, should work as below red button
                                <MusicControlButton onClick={popupButtonClick} checked={isChecked} show={showPopup ? 'Hide Music Controls' : 'Show Music Controls'} items={initialItems()} onChange={() => handleCheckboxChange(initialItems().id)} />

                                <button id="accordian" className="btn btn-outline-danger" onClick={popupButtonClick}> {showPopup ? 'Hide Music Controls' : 'Show Music Controls'} </button>

                                <Popup show={showPopup} checked={isChecked} items={isChecked} onItemClick={handleCheckboxChange} />




                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                    </div>

                </div>
                <canvas id="roll"></canvas>
            </main >
        </div >
    );


}