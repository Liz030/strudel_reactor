import SoundControl from './soundControls';

// create pop up to display sound controlls
function PopUp({ show, isChecked, onChange, items, onItemClick, onVolumeChange }) {
    if (!show) return null;

    
  return (
      <>
        
          <div>

              <label htmlFor="volume_range" className="form-label">volume</label>
              <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={onVolumeChange}  id="volume_range" />
          </div>

          <div className='popup-overlay'> 
           
              <p>Music Controls:</p>

              <SoundControl checked={isChecked} onChange={onChange} items={items} onItemClick={onItemClick} />
              
          </div>
      </>
  );
}

export default PopUp;

