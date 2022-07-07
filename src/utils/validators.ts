import _ from 'lodash';

function validateRegisterUser(userDetails: user){
  const keys = ['name', 'emailId', 'password', 'phone'];
  const unknownKeys = _.difference(_.keys(userDetails), keys);

  keys.pop();
  if(unknownKeys.length){
    return `unexpected properties: ${unknownKeys}`;
  }

  const missingKeys = _.difference(keys, _.keys(userDetails));
  if(missingKeys.length){
    return `missing properties: ${missingKeys}`;
  }

  if(userDetails.name.length < 3){
    return `name must be at least 3 characters long`;
  }

  if(userDetails.password.length < 8){
    return `password must be at least 8 characters long`;
  }

  return '';
}

export {validateRegisterUser};