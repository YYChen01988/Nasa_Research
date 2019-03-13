import React from 'react';
import SolSelector from '../components/SolSelector';
import PhotoDetails from '../components/PhotoDetails';
import CameraSelector from '../components/CameraSelector';
import PageSelector from '../components/PageSelector';



class PhotoRow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cachedPhotos:{},
      photos: [],
      manifest:{},
      currentSol:null,
      currentPage:1,
      currentCamera:null
    };
    this.handleAPIrequest = this.handleAPIrequest.bind(this);
    this.handleCameraSelected = this.handleCameraSelected.bind(this);
    this.handlePageSelected = this.handlePageSelected.bind(this);
    this.handleSolSelected = this.handleSolSelected.bind(this);

  }
  componentDidMount(){
    const roverManifestQueryUrl =  'https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=SosAw8PH06hY4UgdReSvYk0F0GfqFHPv0V9GWFK8'

    fetch(roverManifestQueryUrl)
    .then((res) => res.json())
    .then((data) => {
      this.setState({manifest: data.photo_manifest});
    })
  }

  handleAPIrequest(sol, page=1, camera){
    if(camera === 'ALL'){camera=null}
    var camParam = (camera) ? `camera=${camera}` : ""
    var pageParam = `page=${page}`
    var solParam = `sol=${sol.sol}`
    var key = "SosAw8PH06hY4UgdReSvYk0F0GfqFHPv0V9GWFK8"
    const solQueryUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?${solParam}&${pageParam}&${camParam}&api_key=${key}`
    var cachedPage=solQueryUrl
    if(!this.state.cachedPhotos.hasOwnProperty(cachedPage)) {
      fetch(solQueryUrl)
      .then((res) => res.json())
      .then((data) => {
        var cachedPhotos = this.state.cachedPhotos
        cachedPhotos[cachedPage] = data.photos
        this.setState({photos: data.photos, cachedPhotos: cachedPhotos, currentSol: sol, currentPage: page, currentCamera: camera});
      })
    }else{
      this.setState({photos: this.state.cachedPhotos[cachedPage], currentSol: sol, currentPage: page, currentCamera: camera});
    }
  }

  handleSolSelected(sol){
    this.handleAPIrequest(sol, 1, null);
  }
  handleCameraSelected(camera){
    this.handleAPIrequest(this.state.currentSol, 1, camera);
  }

  handlePageSelected(page){
    this.handleAPIrequest(this.state.currentSol, page, this.state.currentCamera);
  }

  render(){

    const solSelector =
        <SolSelector manifest={this.state.manifest}
        onSolSelected={this.handleSolSelected}/>

    const camSelector =
        <CameraSelector currentSol={this.state.currentSol} onCamSelected = {this.handleCameraSelected} currentCamera={this.state.currentCamera}/>

    const pageSelector =
        <PageSelector currentPage={this.state.currentPage} currentSol={this.state.currentSol} totalPhotos={this.state.photos.length} onPageSelected = {this.handlePageSelected}/>



    var details = this.state.photos.map((photo,index) => {
          return <PhotoDetails key={index} photo={photo}/>
        })
    if(! this.state.photos.length || this.state.photos.length === 0){
      details = <p> Please select a sol </p>
    }

    return(
      <div>
        <div className="titleBar">
        {solSelector}
        {camSelector}
        {pageSelector}
        </div>
        {details}
      </div>
    )
  }
}

export default PhotoRow;
