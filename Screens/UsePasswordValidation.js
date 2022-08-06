import { useState, useEffect } from "react";

export const UsePasswordValidation = ({
  
password = "",
requiredLength = 8,
  
}) => {
const [validLength, setValidLength] = useState(null);
const [hasNumber, setHasNumber] = useState(null);
const [upperCase, setUpperCase] = useState(null);
const [lowerCase, setLowerCase] = useState(null);
const [specialChar, setSpecialChar] = useState(null);
  
useEffect(() => {
  
setValidLength(password.length >= requiredLength ? true : false);
  
}, [password, requiredLength]);
  
return [validLength, hasNumber, upperCase, lowerCase, specialChar];
};