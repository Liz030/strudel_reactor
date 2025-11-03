import SoundControl from './soundControls';

// create pop up to display sound controlls
function PopUp({ show, isChecked, handleCheckboxChange }) {
    if (!show) return null;
  return (
      <>

          <div className='popup-overlay'>  
              <p>Music Controls:</p>
              <div className="col-md-4">
                  <SoundControl checked={isChecked} onChange={handleCheckboxChange} />
              </div> 
          </div>
      </>
  );
}

export default PopUp;

