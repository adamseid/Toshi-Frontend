import React from 'react'

export const ShortenTokenNameSymbol = (props) => {
    
    const convertDecimalFormat = (str) => {
        if(str.length >= 10){
            return str.slice(0, 10) + "..."
        }
        return str;
      };

  return (
    <>
        <span>{convertDecimalFormat(props.number)}</span>
    </>
  )
}
