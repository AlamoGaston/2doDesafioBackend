/*--Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.
use ecommerce
*/

/*--1) Agregar 10 documentos con valores distintos a las colecciones mensajes y productos.--*/

db.createCollection("messages");
db.createCollection("products");

const mensajes = [
  {
    text: "Hola..",
    time: "15:30",
    user: "gaston@live.com",
  },
  {
    text: "Como estas?",
    time: "15:32",
    user: "marcio@gmail.com",
  },
  {
    text: "Todo bien",
    time: "15:33",
    user: "gaston@live.com",
  },
  {
    text: "Que onda??",
    time: "15:33",
    user: "marcio@gmail.com",
  },
  {
    text: "Hiciste el desafio??",
    time: "15:35",
    user: "gaston@live.com",
  },
  {
    text: "Me falta la ultima parte",
    time: "15:35",
    user: "marcio@gmail.com",
  },
  {
    text: "Te ayudo?",
    time: "15:35",
    user: "gaston@live.com",
  },
  {
    text: "Dale, dame un rato y me conecto",
    time: "15:35",
    user: "marcio@gmail.com",
  },
  {
    text: "Avisame...",
    time: "15:36",
    user: "gaston@live.com",
  },
  {
    text: "Listo estoy...",
    time: "16:15",
    user: "marcio@gmail.com",
  },
];

// Agregamos 10 mensajes
db.messages.insertMany(mensajes);

const productos = [
  {
    title: "Cerveza rubia",
    price: 111,
    thumbnail: "url 1",
  },
  {
    title: "Cerveza Stock",
    price: 111,
    thumbnail: "url 2",
  },
  {
    title: "Cerveza Honey",
    price: 111,
    thumbnail: "url 3",
  },
  {
    title: "Vodka Rasberry",
    price: 111,
    thumbnail: "url 4",
  },
  {
    title: "Vodka Durazno",
    price: 111,
    thumbnail: "url 5",
  },
  {
    title: "Fernet",
    price: 111,
    thumbnail: "url 6",
  },
  {
    title: "Campari",
    price: 111,
    thumbnail: "url 7",
  },
  {
    title: "Ron",
    price: 111,
    thumbnail: "url 8",
  },
  {
    title: "Wiskey",
    price: 111,
    thumbnail: "url 9",
  },
  {
    title: "jagermeister",
    price: 111,
    thumbnail: "url 10",
  },
];

// Agregamos 10 productos
db.products.insertMany(productos);

/*--2) Definir las claves de los documentos en relación a los campos de las tablas de esa base.--*/

db.products.update({ title: "Cerveza rubia" }, { $set: { price: 120 } });
db.products.update({ title: "Cerveza Stock" }, { $set: { price: 250 } });
db.products.update({ title: "Cerveza Honey" }, { $set: { price: 300 } });
db.products.update({ title: "Vodka Rasberry" }, { $set: { price: 750 } });
db.products.update({ title: "Vodka Durazno" }, { $set: { price: 900 } });
db.products.update({ title: "Fernet" }, { $set: { price: 1500 } });
db.products.update({ title: "Campari" }, { $set: { price: 2000 } });
db.products.update({ title: "Ron" }, { $set: { price: 3500 } });
db.products.update({ title: "Wiskey" }, { $set: { price: 4200 } });
db.products.update({ title: "jagermeister" }, { $set: { price: 4900 } });

/*--3) Listar todos los documentos en cada colección.--*/

db.products.find();
db.messages.find();

/*--4) Mostrar la cantidad de documentos almacenados en cada una de ellas.--*/

db.products.count();
db.messages.count();

/*--5)  Realizar un CRUD sobre la colección de productos:--*/

// a) agregar un producto más en la colección de productos:

const newProduct = {
  title: "Coca Cola",
  price: 111,
  thumbnail: "url 11",
};

db.products.insertOne(newProduct);
db.products.find();

db.products.update({ title: "Coca Cola" }, { $set: { price: 500 } });

// b) Realizar una consulta por nombre de producto específico:

// i) listar los productos con precio <1000

db.products.find({ price: { $lt: 1000 } });

// ii) listar los productos con precio >1000 <3000
db.products.find({ price: { $gt: 1000, $lt: 3000 } });

// iii) listar los productos con precio > 3000
db.products.find({ price: { $gt: 3000 } });

// iv) obtener el tercer producto mas barato:
db.products.find().sort({ price: 1 }).skip(3).limit(1);

// c) hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100
db.products.updateMany({}, { $set: { stock: 100 } });

// d) cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
db.products.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } });

// e) Borrar los productos con precio menos a 1000 pesos.
db.products.deleteMany({ price: { $lt: 1000 } });

/*--6) Crear un usuario 'pepe' clave: 'asd456' que solo pueda leer la base de datos ecommerce.--*/

//use admin;
db.createUser({
  user: "pepe",
  pwd: "asd456",
  roles: [{ role: "read", db: "ecommerce" }],
});

// Verificar que pepe no pueda cambiar la informacion
/*
    //user & pass
    mongo -u pepe -p asd456

    //Verificamos si podemos leer los posts
    use ecommerce

    //Obtenemos respuesta correctamente, mostrando los dos documentos 

    //Ahora intentaremos insertar un nuevo documento
    
    const newProduct = {title: "Sprite", price: 400, thumbnail: "url 12",};

    db.products.insertOne(newProduct);

    // Me deberia decir Error, pero como vimos en la clase me agrega el producto, ya veremos como solucionarlo.

*/
