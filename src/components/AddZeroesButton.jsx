import React, { useCallback, useEffect, useRef, useState } from 'react';

import Dropdown from './Dropdown';
import useStorage from '../hooks/useStorage';

const DEFAULT_ZEROES_AMOUNT = 18;

function AddZeroesButton({ bgColor, button }) {
  const thisElement = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  const [zeroesAmount, _setZeroesAmount] = useStorage(
    'zeroesAmount',
    DEFAULT_ZEROES_AMOUNT
  );

  useEffect(() => {
    if (thisElement.current) {
      const addZeroesButtonWrapperElement = thisElement.current.parentElement;
      addZeroesButtonWrapperElement.style.position = 'absolute';

      // Remove duplicate addZeroesButtonWrapperElement
      const containerForm = addZeroesButtonWrapperElement.parentElement;
      const existingAddZeroesButtonWrapperElements =
        containerForm.querySelectorAll('span:has(.add-zeroes-button)');
      existingAddZeroesButtonWrapperElements.forEach((item, index) => {
        if (index !== 0) {
          item.remove();
        }
      });
    }
  }, []);

  const handleZeroesButtonClick = () => {
    const input = button.parentElement.querySelector('input');
    const value = ''.padStart(zeroesAmount, '0');

    if (!input.value) {
      input.value += `1${value}`;
    } else {
      input.value += value;
    }
    input.focus();
  };

  const toggleDropdown = () => {
    setIsVisible((cur) => !cur);
  };
  const closeDropdown = () => {
    setIsVisible(false);
  };
  const setZeroesAmount = useCallback((value) => {
    _setZeroesAmount(value);
    closeDropdown();
  }, []);

  return (
    <>
      <div
        className='add-zeroes-button'
        style={{
          boxSizing: 'border-box',
          height: '1.685rem',
          backgroundColor: bgColor,
          color: 'white',
          fontSize: '12px',
          fontFamily: 'inherit',
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '1px',
          left: '5px',
          border: 'none',
          borderRadius: '0.375rem',
          overflow: 'hidden',
          cursor: 'pointer',
          zIndex: 31,
        }}
        ref={thisElement}>
        <button
          style={{
            backgroundColor: 'transparent',
            color: 'inherit',
            display: 'inline',
            border: 'none',
            outline: 'none',
            borderRight: '0.5px solid #ffffff55',
            paddingBlock: '0.15rem',
            paddingInline: '0.3rem 0.15rem',
          }}
          onClick={handleZeroesButtonClick}
          type='button'>
          ×10<sup>{zeroesAmount}</sup>
        </button>
        <button
          onClick={toggleDropdown}
          style={{
            backgroundColor: 'transparent',
            color: 'inherit',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            outline: 'none',
            paddingBlock: '0.15rem',
            paddingInline: '0.15rem 0.3rem',
          }}
          type='button'>
          <span
            style={{
              width: '1rem',
              height: '1rem',
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <svg
              style={{ width: '100%', height: '100%' }}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'>
              <path
                d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'
                fill='currentColor'
              />
            </svg>
          </span>
        </button>
      </div>
      <Dropdown
        bgColor={bgColor}
        isVisible={isVisible}
        setZeroesAmount={setZeroesAmount}
        zeroesAmount={zeroesAmount}
      />
    </>
  );
}

export default AddZeroesButton;
