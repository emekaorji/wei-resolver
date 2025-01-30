// src/components/AddZeroesButton.js
import React from 'react';

const ARROW_SVG = (
  <span>
    <svg viewBox='0 0 512 512'>
      <path d='M233.4 192z' />
    </svg>
  </span>
);

export default function AddZeroesButton({ bgColor, onClick }) {
  return (
    <button
      className='add-zeros-button'
      type='button'
      style={{
        position: 'absolute',
        marginLeft: '5px',
        fontSize: '12px',
        fontFamily: 'inherit',
        cursor: 'pointer',
        backgroundColor: bgColor,
        color: 'white',
        border: 'none',
        borderRadius: '0.375rem',
        padding: '0.15rem 0.3rem',
      }}
      onClick={onClick}>
      <span>
        ×10<sup>18</sup>
      </span>
      |<span>{ARROW_SVG}</span>
    </button>
  );
}
