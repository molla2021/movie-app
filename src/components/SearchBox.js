import React from 'react'

export const SearchBox = (props) => {
  return (
    <div className='col col-sm-4'>
        <input
        className = "form-control"
        placeholder ="Search for a film ..."
        value={props.value}
        onChange={(event)=> props.setSearchFilm(event.target.value)}
        />
    </div>
  );
}
