

function SoundControls({isChecked, onChange, items, handleCheckboxChange , onItemClick}) {

    

    return (
        <>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Set CPM</span>
                </div>
                <input type="text" className="form-control" id='cpm_text_imput' placeholder="120" aria-label="cpm" aria-describedby="cpm-label" htmlFor='CPM_slider'/>
            </div>



            <div>

                <label htmlFor="volume_range" className="form-label">volume</label>
                <input type="range" className="form-range" min="0" max="5" step="0.01" id="volume_range"/>
            </div>



            <div>
                <p>mute selected instruments</p>
                <div>
                    {items.map((item) => (
                        <li key={item.id}>
                            <input className="form-check-input" type="checkbox" checked={item.checked} onClick={() => onItemClick(item.id)} />
                            <label className="form-check-label" htmlFor={item.id}>{item.name}</label>
                        </li>

                    ))}
                </div>
                

            </div>
        </>
  );
}

export default SoundControls;