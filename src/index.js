import express from 'express';
import productsRoute from './routes/products.route.js'; // Asegúrate de que el archivo existe y tiene extensión .js


const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/products', productsRoute);


app.listen(8080, () => {
    console.log('Servidor ON en puerto 8080');
});