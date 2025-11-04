

import Popup from './popUp';
function MusicControlButton({ popupButtonClick, showPopup, isChecked, onChange, items, onClick }) {
  return (
      <>
          <div>
              <button id="popup" className="btn btn-outline-success" onClick={popupButtonClick}> {showPopup ? 'Hide Music Controls' : 'Show Music Controls'} </button>

              <Popup show={showPopup} checked={isChecked} items={items} onChange={onChange} />

          </div>
      </>
  );
}

export default MusicControlButton;