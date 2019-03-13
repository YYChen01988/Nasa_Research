import React from 'react';

const PageSelector = (props) => {

  function handlePageChange(page){
    props.onPageSelected(page);
  }


  if(!props.currentSol) return null;
  var prevButton;
  var currentPageValue;
  var nextButton;

  if (props.currentPage >1){
    prevButton =
    <button onClick={()=>handlePageChange(props.currentPage-1)}>prev 25</button>
  }else{
    prevButton =
    <button disabled >prev 25</button>
  }

  currentPageValue = <i> {props.currentPage} </i>
  if(props.totalPhotos >= 25){
    nextButton =
    <button onClick={()=>handlePageChange(props.currentPage+1)}>next 25</button>
  }else{
    nextButton =
    <button disabled >next 25</button>
  }


  return (
    <div>
      {prevButton}
      {currentPageValue}
      {nextButton}
    </div>
  )
}

export default PageSelector;
