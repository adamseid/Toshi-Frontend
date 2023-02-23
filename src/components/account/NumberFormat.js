import React from 'react'

export const NumberFormat = (props) => {
    const numberOfZeros = (number) => {
        return Math.floor(Math.abs(Math.log10(number))) - 1;
      };
    
    const convertDecimalFormat = (number) => {
        if (number < 0.01) {
            number = parseInt(number.toString().replace(".", "")).toString().slice(0,4)
            return number;
        } 
        return null;
      };

  return (
    <>
        <span>0.0</span>
        <sub>
            {numberOfZeros(props.number)}
        </sub>
        <span>{convertDecimalFormat(props.number)}</span>
    </>
  )
}
