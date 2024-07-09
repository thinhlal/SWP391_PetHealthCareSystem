import React from 'react';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const getColor = value => {
  switch (value) {
    case 1:
      return '#ff0000'; // Critical - Red
    case 2:
      return '#e18213'; // Mild - Orange
    case 3:
      return '#ffc107'; // Moderate - Yellow
    case 4:
      return '#0099ff'; // Severe - Blue
    case 5:
      return '#02aa45'; // Healthy - Green
    default:
      return '#000000'; // Default - Black
  }
};

const CustomSlider = styled(Slider)(({ theme, value }) => ({
  color: getColor(value),
  height: 4,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 12,
    width: 12,
    backgroundColor: getColor(value),
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 10, // Adjusted font size to make it smaller
    background: 'unset',
    padding: 0,
    width: 24, // Adjusted value label width to make it smaller
    height: 24, // Adjusted value label height to make it smaller
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
}));

const PetHealthSlider = ({ value, onChange }) => {
  return (
    <CustomSlider
      aria-label='Pet Health Status'
      value={value}
      onChange={onChange}
      getAriaValueText={value => value}
      valueLabelDisplay='auto'
      step={1}
      marks={[
        { value: 1, label: 'Critical' },
        { value: 2, label: 'Mild' },
        { value: 3, label: 'Moderate' },
        { value: 4, label: 'Severe' },
        { value: 5, label: 'Healthy' },
      ]}
      min={1}
      max={5}
    />
  );
};

export default PetHealthSlider;
