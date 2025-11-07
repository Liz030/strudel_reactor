

function graph() {

    export default function Graph() {
        const [rngNumber, setRngNumber] = useState(0);
        const [rngArray, setRngArray] = useState([]);
        const maxItems = 20;
        const timneOut = 500;
        const maxValue = 60;


        useEffect(() => {
            const interval = setInterval(() => {
                setRngNumber(Math.floor(Math.random() * maxValue));
            }, timeOur);

            return () => clearInterval(interval);


        }, []);

        useEffect(() => {
            let tempArray = [...rngArray, rngNumber];
            if (tempArray.length > maxItems) { tempArray.shift() }
            setRngArray(tempArray);
        }, [rngNumber]);
        
        useEffect(() = {
            //select svg element
            const svg = d3.select('svg')
            svg.selectAll("*").remove();

        })


    }
  return (

      <>
          <div className ="graphContainer">
              <h1> RNG out: {rngNumber} </h1>

          </div>

          <div>
            <svg width = '100%' height = '600px' class="border border-primary rounded p-2"></svg>
          </div>

      </>

  );
}

export default graph;