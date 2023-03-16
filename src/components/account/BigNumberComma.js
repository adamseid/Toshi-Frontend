import React from 'react'

export const BigNumberComma = (props) => {
    
    const convertDecimalFormat = (number) => {
        if (number > 999) {
            var roundedNumber = Math.round(number)
            var numberString = roundedNumber.toString()
            var returnNumber = ""
            console.log(numberString)
            for(let i =0; i < numberString.length; i++){
                returnNumber = returnNumber.concat(numberString[i])
                if(i%3 == 0 && i != (numberString.length-1)){
                    returnNumber = returnNumber.concat(",")
                }
            }
            return returnNumber;
        } 
        return Math.round((number));
      };

  return (
    <>
        <span>{convertDecimalFormat(props.number)}</span>
    </>
  )
}
