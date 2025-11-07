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

import * as d3 from "d3";




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

    //get d3 data
    const d3Data = () => {
           
    }



    ////D3 GRAPH
    //const [rngNumber, setRngNumber] = useState(0);
    //const [rngArray, setRngArray] = useState([]);
    //const maxItems = 50;
    //const timeOut = 100;
    //const maxValue = 1;


    //useEffect(() => {
    //    const interval = setInterval(() => {
    //        //setRngNumber(Math.floor(Math.random() * maxValue));
    //        setRngNumber('getD3Data')

    //    }, timeOut);

    //    return () => clearInterval(interval);


    //}, []);
    //function LogToNum(input) {

    //    if (!input) { return 0 };
    //    var stringArray = input.split(/(\s+)/);
    //    for (const item of stringArray) {
            
    //        if (item.startsWith('gain')) {
    //            let val = item.substring(5)
    //            return Number(val)
    //        }
    //    }
    //        return 0;
    //}
    //useEffect(() => {
    //    let tempArray = [...rngArray, rngNumber];
    //    if (tempArray.length > maxItems) { tempArray.shift() }
    //    setRngArray(tempArray);
    //}, [rngNumber]);

    //useEffect(() => {
    //    //select svg element
    //    const svg = d3.select('svg')
    //    svg.selectAll("*").remove();

       

    //    // height and width
    //    let w= svg.node().getBoundingClientReact().width
    //    w=w - 40
    //    let h = svg.node().getBoundingclientReact().height
    //    h=h-25
    //    const barMargin = 10;
    //    const barWidth = w / rngArray.length

    //    // Yscale
    //    let yScale = d3.scaleLinear()
    //        .domain([0, maxValue])
    //        .range([h, 0]);

    //    //translate bar to give axs room
    //    const chartGroup = svg.append('g')
    //        .classed('chartGroup', true)
    //        .attr('transform', 'translate(30, 3)');

    //    let barGroups = svg.selectAll('g')
    //        .data(rngArray)

    //    //add groups
    //    let newBarGroups = barGroups.enter()
    //        .append('g')
    //        .attr('transform', (d, i) => {
    //            return `translate(${i*barWidth}, ${yScale(d)})`
    //        });

    //    //// rectangle draw
    //    //newBarGroups
    //    //    .append('rect')
    //    //    .attr('x', 0)
    //    //    .attr('height', d => { return h - yScale(d) })
    //    //    .attr('width', barWidth - barMargin)
    //    //    .attr('fill', 'black')

    //    // colour lines
    //    //const colourScale = d3.scaleSequential(d2.interpolateRgb('Lime', 'Red'))
    //    //.domain([0, maxValue])

    //    // set gradient
    //    chartGroup.append("linearGradient")
    //        .attr("id", "line-gradient")
    //        .attr("gradientUnits", "userSpaceOnUse")
    //        .attr("x1", 0)
    //        .attr("y1", yScale(0))
    //        .attr("x2", 0)
    //        .attr("y2", yScale(maxValue))
    //        .selectAll("stop")
    //        .data([
    //            { offset: "0%", color: "green" },
    //            {offset: "100%", color: "red"}
            

    //        ])
    //        .enter().append("stop")
    //        .attr("offfset", function (d) { return d.offset; })
    //        .attr("stop-color", function (d) { return d.color; });

    //    // lines
    //    chartGroup
    //        .append('path')
    //        .datum(rngArray.map((d) => LogToNum(d)))
    //        .attr('fill', 'none')
    //        .attr('stroke', 'url(#line-gradient')
    //        .attr('stroke-width', 1.5)
    //        .attr('d', d3.line()
    //            .x((d, i) => i * barWidth)
    //            .y((d) => yScale(d))
    //        )

    //    // add yaxis to chart group
    //    let yAxis = d3.axisLeft(yScale);
    //    chartGroup.append('g')
    //        .classed('axis y', true)
    //        .call(yAxis);

    //}, [rngArray]);


    ////D# GRAH END

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
                            
                            <div className="row">
                                <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                                    <div id="editor" />
                                    <div id="output" />
                                </div>
                            </div>
                               
                            <div className="graphContainer">
                                <h1> RNG out: rngNumber </h1>

                            </div>

                            <div>
                                <svg width='100%' height='600px' class="border border-primary rounded p-2"></svg>
                            </div>


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
                   

                </div>
                <canvas id="roll"></canvas>
            </main >
        </div >
    );


}