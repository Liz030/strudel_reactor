function procButtons({ onPressProc }) {






  return (
      <>
         <div>
             <button id="process" className="btn btn-outline-primary">Preprocess</button>
              <button id="process_play" className="btn btn-outline-primary" onChange={onPressProc}>Proc & Play</button>
          </div>
      </>
  );
}

export default procButtons;