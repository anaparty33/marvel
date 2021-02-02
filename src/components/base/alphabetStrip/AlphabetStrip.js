import React, { useEffect, useState } from 'react';

import './alphabetStrip.scss';

export const AlphabetStrip = function (props) {
  const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const {selected, onChange} = props;
  const onClick = (alphabet) => {
    let new_selected = !!selected ? selected : '';
    if(!!new_selected && new_selected.includes(alphabet)) {
      new_selected = new_selected.replace(alphabet, '')
    } else {
      new_selected += alphabet
    }
    onChange(!!new_selected ? new_selected : null);
  }
  return (
    <div className="alphabet-strip">
      {alphabets.map(alphabet =>
        <div 
        key={alphabet}
        onClick={()=>onClick(alphabet)}
        className={`alphabet ${!!selected && selected.includes(alphabet) ? 'active' : ''}`} 
        >
          {alphabet}
        </div>
      )}
      <span className="Clear" onClick={() => {onChange(null)}}>
        Clear
        <i className="fal fa-times" />
      </span>
    </div>
  )
}