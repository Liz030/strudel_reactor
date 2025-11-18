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



import PlayButtons from './components/playButtons';
import TextToPreprocess from './components/textToPreprocess';

import Popup from './components/popUp';


import D3Graph from './components/d3Graph';
import { Preprocess } from './utility/Preprocess';

let globalEditor = null;


const handleD3Data = (event) => {
    console.log(event.detail);
};



export default function StrudelDemo() {
    
    // save and re load textpool for song text
    const [songText, setSongText] = useState(stranger_tune)
    const hasRun = useRef(false);

    // Pop up for music controlls - hide and unhide
    const [showPopup, setShowPopup] = useState(false);
    const popupButtonClick = () => {
        setShowPopup(!showPopup);
    }

    // in music text
    const [procText, setProcText] = useState(stranger_tune)

    // volume slider
    const [volume, setVolume] = useState(1);

    //cpm value
    const [cpm, setCpm] = useState(120);
    
    // checkboxes - mute instruments - hard coded to each of the instruments
    const initialItems = () => (
        [
            { id: 1, value: 'drums:', replace: '_drums:', mutedItem: '_drums:', name: 'drums:', checked: false },
            { id: 2, value: 'drums2:', replace: '_drums2:', mutedItem: '_drums2:', name: 'drums2:', checked: false },
            { id: 3, value: 'main_arp:', replace: '_main_arp:', mutedItem: '_main_arp:', name: 'main_arp:', checked: false },
            { id: 4, value: 'bassline:', replace: '_bassline:', mutedItem: '_bassline:', name: 'bassline:', checked: false },
        ]
    );

    // set state of instruments
    const [instruments, setItems] = useState(initialItems);

    // change value and checked based on check value to silence selected instrument
    const handleCheckboxChange = (id) => {
        setItems(
            prevItems =>
                prevItems.map(item =>
                    item.id === id ? {
                        ...item,
                        value: item.checked ? item.name : item.mutedItem,
                        replace: item.checked ? item.mutedItem : item.name,
                        checked: !item.checked

                    } : item)
        );

    };

  
    // store array to json - stored local storage
    const storeArrayItemsJson = () => {
        // save items
        const jsonString = JSON.stringify(instruments);
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


  
    // working stop and play buttons
    const handlePlay = () => {
        let outputText = Preprocess({ inputText: procText, volume: volume, cpm: cpm, instruments: instruments });
        globalEditor.setCode(outputText);
        globalEditor.evaluate()
    }
    const handleStop = () => {
        globalEditor.stop()
    }


    // play button

    const [state, setState] = useState("stop");

    useEffect(() => {
        if (state === "play") {
            handlePlay();

        }
    }, [volume, cpm, instruments])





    // ain function
    useEffect(() => {

        if (!hasRun.current) {
            // console log d3
           

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
    }, [songText, getD3Data]);

    return (
        <div className = "mainPage">
            <h2>Strudel Demo</h2>
            <main>
                <div class='container-fluid'>
                    <div className="row">
                        
                        <div className="col-sm-8">
                           
                            <div className="row">
                                
                                <div className="col-md-9">
                                    
                                </div>
                                <div className="col-sm">
                                    <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop() }} />
                                </div>
                            </div>
                            <div className="row">
                                
                                <div className="row-md-6" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                                    <div id="editor" />
                                    <div id="output" />
                                </div>

                            </div>
                        </div>
                        <div className="col-sm">
                         
                            <nav>
                               
                               
                                <br />
                                

                                
                                <button id="accordian" className="btn1" onClick={popupButtonClick}> {showPopup ? 'Hide Music Controls' : 'Show Music Controls'} </button>
                                <br />
                                <Popup show={showPopup} checked={instruments} items={instruments} onItemClick={handleCheckboxChange} onVolumeChange={(e) => setVolume(e.target.value)} onCPMChange={(e) => setCpm(e.target.value)} />
                                <button className="btnsave" onClick={storeArrayItemsJson} >Save Muted Instruments </button>
                                <button className="btnload" onClick={loadArrayItemsJson} >load Muted Instruments </button>
                                <div className="row-md-6" style={{ maxHeight: '21vh', overflowY: 'auto' }}>
                                    <TextToPreprocess defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                                </div>

                                

                            </nav>
                        </div>

                    </div>
                    <div className="row">
                       
                        <div className="graphContainer">
                            <D3Graph />
                        </div>
                    </div>
                </div>



               
                <canvas id="roll"></canvas>
            </main >
        </div >
    );


}