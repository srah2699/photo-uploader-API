import jwt from 'jsonwebtoken';


/* const token = jwt.sign({id:'himavasanth'}, 'hima@aa.com', { expiresIn: '1h'})
console.log(token) */

jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiaGltYTIyMkBhYS5jb20iLCJpYXQiOjE2NTcwMDc1NTEsImV4cCI6MTY1NzAwNzU1NH0.E0ww0v7pf-qP4x4IEq5xIx8l9RyqUtZIP-EPSSgZuZs', 'photoUploaderAPI', (err, data) => {
  if(err){
    console.log('expired')
  } else {
    console.log('done')
  }
})