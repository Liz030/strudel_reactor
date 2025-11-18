
function textToPreprocess({ defaultValue, onChange }) {



  return (
      <>
         
          <br />  
          <br/>
          <h2 className='heading2'>Text to Preprocess: </h2><br />
         
          <textarea className="form-control" rows="15" defaultValue={defaultValue} onChange={ onChange } id="proc" ></textarea>
      </>
  );
}

export default textToPreprocess;