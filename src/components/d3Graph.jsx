
import { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
function D3Graph() {

    //D3 GRAPH
    const [rngNumber, setRngNumber] = useState(0);
    const [rngArray, setRngArray] = useState([]);
    const maxItems = 50;
    const timeOut = 100;
    const maxValue = 1;

    // get d3 data is function call, call it here to input the out put array from getd3 data.
    useEffect(() => {
        const interval = setInterval(() => {
            //setRngNumber(Math.floor(Math.random() * maxValue));
            let val = Math.random()
            // setRngNumber(getD3Data);
            setRngNumber(`"0/1 → 1/8: note:eb1 s:supersaw postgain:2 room:0.4 c
            utoff:700 gain:${val} duration:0.25 
            background-color: black;color:white;border-radius:15px"`
            );

        }, timeOut);
        return () => clearInterval(interval);

    }, []);
    function LogToNum(input) {

        if (!input) { return 0 };
        var stringArray = input.split(/(\s+)/);
        for (const item of stringArray) {

            if (item.startsWith('gain')) {
                let val = item.substring(5)
                return Number(val)
            }
        }
        return 0;
    }
    useEffect(() => {
        let tempArray = [...rngArray, rngNumber];
        if (tempArray.length > maxItems) { tempArray.shift() }
        setRngArray(tempArray);
    }, [rngNumber]);

    useEffect(() => {
        //select svg element
        const svg = d3.select('svg')
        svg.selectAll("*").remove();



        // height and width
        let w = svg.node().getBoundingClientRect().width
        w = w - 40
        let h = svg.node().getBoundingClientRect().height
        h = h - 25
        const barMargin = 10;
        const barWidth = w / rngArray.length

        // Yscale
        let yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([h, 0]);

        //translate bar to give axs room
        const chartGroup = svg.append('g')
            .classed('chartGroup', true)
            .attr('transform', 'translate(30, 3)');


        chartGroup.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("y1", yScale(0))
            .attr("x2", 0)
            .attr("y2", yScale(maxValue))
            .selectAll("stop")
            .data([

                { offset: "100%", color: "purple" }


            ])
            .enter().append("stop")
            .attr("offfset", function (d) { return d.offset; })
            .attr("stop-color", function (d) { return d.color; });

        // lines
        chartGroup
            .append('path')
            .datum(rngArray.map((d) => LogToNum(d)))
            .attr('fill', 'none')
            .attr('stroke', 'url(#line-gradient')
            .attr('stroke-width', 2.5)
            .attr('d', d3.line()
                .x((d, i) => i * barWidth)
                .y((d) => yScale(d))
            )

        // add yaxis to chart group
        let yAxis = d3.axisLeft(yScale);
        chartGroup.append('g')
            .classed('axis y', true)
            .call(yAxis);

    }, [rngArray]);

    return (
        <>
            <div className="graphContainer">
                <h1 className='heading1'> D3 Graph </h1>

            </div>

            <div>
                <svg width='100%' height='600px' class="border border-primary rounded p-2"></svg>
            </div>
        </>
    );
}

export default D3Graph;
