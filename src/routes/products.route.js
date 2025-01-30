import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const route = Router();
const productos = []; // Arreglo para almacenar los productos

// Ruta GET para obtener todos los productos
route.get("/", (req, res) => {
  res.json({
    mensaje: "Lista de productos",
    totalProductos: productos.length,
    productos,
  });
});

// Ruta GET para obtener un producto específico por su id
route.get("/:id", (req, res) => {
  const { id } = req.params;
  const producto = productos.find((prod) => prod.id === id);

  if (!producto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  res.json({
    mensaje: "Producto encontrado",
    producto,
  });
});

// Ruta POST para agregar un producto al arreglo
route.post("/", (req, res) => {
  const { title, description, price, stock, category } = req.body;

  if (!title || !description || !price || stock === undefined || !category) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  const productoExistente = productos.find((producto) => producto.title === title);

  if (productoExistente) {
    console.log("Este producto está repetido");
    return res.status(400).json({ mensaje: "Este producto ya existe" });
  }

  const status = stock >= 1;

  const nuevoProducto = {
    id: uuidv4(),
    title,
    description,
    price,
    status,
    stock,
    category,
  };

  productos.push(nuevoProducto);

  console.log("Productos actualizados:", productos);

  res.json({
    mensaje: "Producto creado correctamente",
    producto: nuevoProducto,
    totalProductos: productos.length,
  });
});

// Ruta PUT para modificar un producto por id
route.put("/:id", (req, res) => {
  const { id } = req.params;
  const productoIndex = productos.findIndex((prod) => prod.id === id);

  if (productoIndex === -1) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  const { title, description, price, stock, category } = req.body;

  if (title !== undefined) productos[productoIndex].title = title;
  if (description !== undefined) productos[productoIndex].description = description;
  if (price !== undefined) productos[productoIndex].price = price;
  if (stock !== undefined) {
    productos[productoIndex].stock = stock;
    productos[productoIndex].status = stock >= 1;
  }
  if (category !== undefined) productos[productoIndex].category = category;

  console.log("Producto actualizado:", productos[productoIndex]);

  res.json({
    mensaje: "Producto actualizado correctamente",
    producto: productos[productoIndex],
  });
});

// Ruta DELETE para eliminar un producto por id
route.delete("/:id", (req, res) => {
  const { id } = req.params;
  const productoIndex = productos.findIndex((prod) => prod.id === id);

  if (productoIndex === -1) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }

  const productoEliminado = productos.splice(productoIndex, 1)[0];

  console.log("Producto eliminado:", productoEliminado);
  console.log("Productos actualizados:", productos);

  res.json({
    mensaje: "Producto eliminado correctamente",
    productoEliminado,
    totalProductos: productos.length,
  });
});

export default route;
