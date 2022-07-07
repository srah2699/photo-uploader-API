import bcrypt from 'bcrypt';

async function encryptPassword(password: string){
  const encryptedPassword = await bcrypt.hash(password, 10)
  return encryptedPassword;
}

async function checkPassword(passwordEntered: string, password: string){
  return await bcrypt.compare(passwordEntered, password)
}
export { encryptPassword, checkPassword };