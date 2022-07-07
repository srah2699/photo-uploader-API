import { app } from './app';

const PORT = 3000 | parseInt(process.env.PORT as string);
app.listen(PORT, () => {
  console.log('listening on 3000');
})