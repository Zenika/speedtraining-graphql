const FILLED_COLOR = '#ffbd00';

export const Star = ({ width, height, filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 51 48">
    <path
      fill={filled ? FILLED_COLOR : 'none'}
      stroke={filled ? FILLED_COLOR : 'white'}
      d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
    />
  </svg>
);
