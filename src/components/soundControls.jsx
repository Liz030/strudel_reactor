

function SoundControls({ items, onItemClick, onVolumeChange, onCPMChange }) {
    


    return (
        <>

            <div>
                <h1 className='heading'>Adjust volume</h1>
                <label htmlFor="volume_range" className="form-label"></label>
                <input type="range" className="range-slider" min="0" max="2" step="0.01" onMouseUp={onVolumeChange} id="volume_range" />
            </div>

            <h1 className='heading'>Input CPM:</h1>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Set CPM</span>
                </div>
                <input type="text" className="form-control" id='cpm_text_imput' onChange={onCPMChange} placeholder="120" aria-label="cpm" aria-describedby="cpm-label" htmlFor='CPM_slider' />
            </div>



      


            <div>
                <h1 className= 'heading'>Mute Selected Instruments:</h1>
                <div>
                    {items.map((item) => (
                        <div key={item.id}>
                            <input className="form-check-input" type="checkbox" checked={item.checked} onChange={() => onItemClick(item.id)} />
                            <label className="form-check-label" htmlFor={item.id}>{item.name} </label>
                        </div>

                    ))}
                </div>

                
                

            </div>
        </>
  );
}

export default SoundControls;