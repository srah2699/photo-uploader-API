interface user {
  name: string,  
  emailId: string,
  password: string,
  phone?: string,
}

interface uploaderData {
  userId: string, 
  image: string,
  desc?: string
}