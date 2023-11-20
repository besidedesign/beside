export const validateString = (
  str: any,
  maxLength: number,
  allowNull: boolean = false
) => {
  if (str === null) {
    return allowNull;
  }
  if (typeof str !== "string") {
    console.log("Failed validation: not a string. Value:", str);
    return false;
  }
  if (str.length > maxLength) {
    console.log("Failed validation: exceeds max length. Value:", str);
    return false;
  }
  return true;
};
