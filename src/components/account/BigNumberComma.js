import React from 'react'

export const BigNumberComma = (props) => {
    
    const convertDecimalFormat = (number) => {
        if (number > 999 || number < -999) {
            var roundedNumber = Math.abs(Math.round(number*100)/100)
            // var numberString = roundedNumber.toString()
            // var returnNumber = ""
            // var counter = 1
            // console.log(numberString)
            // for(let i = numberString.length -1; i >0; i--){
            //     returnNumber = returnNumber.concat(numberString[i])
            //     if(counter%3 === 0){
            //         returnNumber = returnNumber.concat(",")
            //     }
            // }
            return roundedNumber;
        } 
        return Math.abs(Math.round((number*100))/100);
      };

  return (
    <>
        <span>{convertDecimalFormat(props.number)}</span>
    </>
  )
}
