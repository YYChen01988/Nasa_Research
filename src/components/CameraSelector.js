import React from 'react';

const CameraSelector = (props) => {


  function handleCameraChange(event){
    props.onCamSelected(event.target.value);
  }

  var camOptions;
  if(!props.currentSol) {camOptions = null;}
  else {
    camOptions = <select id="sol-selector" defaultValue="default" onChange={handleCameraChange}>
      <option value="ALL">Select camera...</option>
      {props.currentSol.cameras.map((cam,index) => {
        return <option key={cam} value={cam}>Cam: {cam}</option>
     })}
   </select>
 }

  return (
    <div>
      {camOptions}
    </div>
  )
}

export default CameraSelector;
