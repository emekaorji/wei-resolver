import React from 'react';

function DropdownItem({ isSelected, setZeroesAmount, zeroesAmount }) {
  const handleClick = () => {
    setZeroesAmount(zeroesAmount);
  };

  return (
    <>
      <button
        onClick={handleClick}
        style={{
          width: '4.3rem',
          backgroundColor: 'transparent',
          color: 'inherit',
          fontSize: '1.1em',
          textAlign: 'center',
          display: 'inline-flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.4rem',
          border: 'none',
          outline: 'none',
          padding: '0.2rem 0.45rem',
        }}
        type='button'>
        <span style={{ width: '50%', whiteSpace: 'nowrap' }}>
          10<sup>{zeroesAmount}</sup>
        </span>
        {isSelected ? (
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
              viewBox='0 0 448 512'>
              <path
                d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z'
                fill='currentColor'
              />
            </svg>
          </span>
        ) : (
          ''
        )}
      </button>
    </>
  );
}

const zeroesAmounts = [8, 12, 16, 18, 20];

function Dropdown({
  bgColor,
  isVisible = false,
  setZeroesAmount,
  zeroesAmount,
}) {
  return (
    <>
      <div
        style={{
          boxSizing: 'border-box',
          backgroundColor: bgColor,
          color: 'white',
          fontSize: '12px',
          fontFamily: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '1.885rem',
          left: '5px',
          border: 'none',
          borderRadius: '0.375rem',
          overflow: 'hidden',
          cursor: 'pointer',
          transformOrigin: 'top',
          transform: isVisible
            ? 'translateY(0) rotateX(0deg)'
            : 'translateY(-10%) rotateX(30deg)',
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'all' : 'none',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.1s ease-in-out',
          zIndex: 30,
        }}>
        {zeroesAmounts.map((amount) => (
          <DropdownItem
            isSelected={zeroesAmount === amount}
            key={amount}
            setZeroesAmount={setZeroesAmount}
            zeroesAmount={amount}
          />
        ))}
      </div>
    </>
  );
}

export default Dropdown;
