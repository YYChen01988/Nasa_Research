import React from 'react';

const SolSelector = (props) => {

  function handleChange(event){
    props.onSolSelected(props.manifest.photos[event.target.value]);
  }

  if(!props.manifest.photos) return null;
  const solOptions = props.manifest.photos.map((sol,index) => {
    return <option key={index} value={index}>Sol:{sol.sol}  Earth Date:{sol.earth_date} ({sol.total_photos} photos)</option>
  })



  return (
    <div>
      <select id="sol-selector" defaultValue="default" onChange={handleChange}>
        <option disabled value="default">Choose a sol...</option>
        {solOptions}
      </select>
  </div>
  )
}

export default SolSelector;
