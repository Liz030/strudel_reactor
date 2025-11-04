import SoundControl from './soundControls';

// create pop up to display sound controlls
function PopUp({ show, isChecked, onChange, items, onItemClick}) {
    if (!show) return null;

    
  return (
      <>
        

          <div className='popup-overlay'> 
           
              <p>Music Controls:</p>

              <SoundControl checked={isChecked} onChange={onChange} items={items} onItemClick={onItemClick} />
              
          </div>
      </>
  );
}

export default PopUp;

