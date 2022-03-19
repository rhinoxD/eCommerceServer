const express = require('express');
const app = express();
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB();

app.use('/api/users', require('./routes/userAPI'));
app.use('/api/products', require('./routes/productsAPI'));

app.get('/', (req, res) => {
  res.send('YAY!');
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
