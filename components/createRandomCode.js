export const generateCode = () => {
  let code = "";
  for (let i = 0; i <= 3; i++) {
    const randomCode = Math.round(Math.random() * 9);
    code = code + randomCode;
  }
  return code;
};
