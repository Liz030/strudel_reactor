

import Popup from './popUp';
function MusicControlButton(popupButtonClick, showPopup, isChecked, handleCheckboxChange) {
  return (
      <>
          <div>
              <button id="popup" class="btn btn-outline-success" onClick={popupButtonClick}> {showPopup ? 'Hide Music Controls' : 'Show Music Controls'} </button>
              <Popup show={showPopup} checked={isChecked} onChange={handleCheckboxChange} />


          </div>
      </>
  );
}

export default MusicControlButton;