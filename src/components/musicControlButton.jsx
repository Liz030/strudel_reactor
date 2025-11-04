

import Popup from './popUp';
function MusicControlButton(popupButtonClick, showPopup, isChecked, handleCheckboxChange, item) {
  return (
      <>
          <div>
              <button id="popup" className="btn btn-outline-success" onClick={popupButtonClick}> {showPopup ? 'Hide Music Controls' : 'Show Music Controls'} </button>
              <Popup show={showPopup} checked={isChecked} onChange={handleCheckboxChange} key={ item } />


          </div>
      </>
  );
}

export default MusicControlButton;