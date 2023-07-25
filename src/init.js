import './db/db';
import app from './app';
const PORT = 3000;

const handleListening = () => console.log(`${PORT} server is running!`);
app.listen(PORT, handleListening)