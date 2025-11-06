import SoundControl from './soundControls';

// create pop up to display sound controlls
function PopUp({ show, isChecked, onChange, items, onItemClick, }) {
    if (!show) return null;

    
  return (
      <>
        
          <div>

              <label htmlFor="volume_range" className="form-label">volume</label>
              <input type="range" className="form-range" min="0" max="5" step="0.01" id="volume_range" />
          </div>

          <div className='popup-overlay'> 
           
              <p>Music Controls:</p>

              <SoundControl checked={isChecked} onChange={onChange} items={items} onItemClick={onItemClick} />
              
          </div>
      </>
  );
}

export default PopUp;

