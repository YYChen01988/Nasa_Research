import React from 'react';

const PhotoDetails = (props) => {
  if(!props.photo) return <p>Loading...</p>;
  return (
    <table key={props.photo.id}>
      <tbody>
        <tr>
          <td>
            <img width="200" alt={props.photo.img_src} src={props.photo.img_src}/>
          </td>
          <td>
            Camera: {props.photo.camera.full_name}
            <p>Rover: {props.photo.rover.name}</p>
            <p>Status: {props.photo.rover.status}</p>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default PhotoDetails;
