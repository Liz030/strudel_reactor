

function SoundControls({ items, onItemClick, onVolumeChange, onCPMChange }) {
    
   
    return (
        <>

            <div>

                <label htmlFor="volume_range" className="form-label">volume</label>
                <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={onVolumeChange} id="volume_range" />
            </div>


            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Set CPM</span>
                </div>
                <input type="text" className="form-control" id='cpm_text_imput' onChange={onCPMChange} placeholder="120" aria-label="cpm" aria-describedby="cpm-label" htmlFor='CPM_slider' />
            </div>



      


            <div>
                <p>mute selected instruments</p>
                <div>
                    {items.map((item) => (
                        <div key={item.id}>
                            <input className="form-check-input" type="checkbox" checked={item.checked} onChange={() => onItemClick(item.id)} />
                            <label className="form-check-label" htmlFor={item.id}>itemName:{item.name} itemValue: {item.value} item replace: {item.replace} checkedStatus:{ item.checked ? 'checked' : "not checked"}</label>
                        </div>

                    ))}
                </div>

                
                

            </div>
        </>
  );
}

export default SoundControls;