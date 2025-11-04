import SoundControl from './soundControls';

// create pop up to display sound controlls
function PopUp({ show, isChecked, onChange, items,  }) {
    if (!show) return null;

    
  return (
      <>

          <div className='popup-overlay'> 
           
              <p>Music Controls:</p>

              <SoundControl checked={isChecked} onChange={onChange} items={ items } />
              
          </div>
      </>
  );
}

export default PopUp;

