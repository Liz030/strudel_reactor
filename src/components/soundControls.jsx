function SoundControls() {
    return (
        <>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Set CPM</span>
                </div>
                <input type="text" className="form-control" id='cpm_text_imput' placeholder="120" aria-label="cpm" aria-describedby="cpm-label"/>
            </div>

            <div>

                <label htmlFor="volume_range" className="form-label">volume</label>
                <input type="range" className="form-range" min="0" max="5" step="0.01" id="volume_range"/>
            </div>




            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="sound01"/>
                    <label className="form-check-label" htmlFor="sound01">
                        sound01
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="sound02" />
                <label className="form-check-label" htmlFor="sound02">
                        sound02
                    </label>
            </div>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="sound03"  />
                <label className="form-check-label" htmlFor="sound03">
                    sound03
                </label>
            </div>






            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"  defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                p1: ON
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                p1: HUSH
                </label>
            </div>
        </>
  );
}

export default SoundControls;