import React from 'react'


import SoundControl from './soundControls';



function PopUp({ show, onClose, isChecked, handleCheckboxChange}) {
    if (!show) return null;
  return (
      <>

          <div className='popup-overlay'>
             
                  <buton onClick={onClose} className='close=button'>Hide Text</buton>
                 
              <p>Music is currently playing</p>
              <div className="col-md-4">


                  <SoundControl checked={isChecked} onChange={handleCheckboxChange} />
              </div>
              
            
          </div>

      </>
  );
}

export default PopUp;

