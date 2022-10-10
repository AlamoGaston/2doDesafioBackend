const Contenedor = require("./manejo");

const contenedor = new Contenedor("productos.txt");

const main = async () => {
  const id1 = await contenedor.save({ title: "Brahama", price: 200 });
  const id2 = await contenedor.save({ title: "Heineken", price: 250 });
  const id3 = await contenedor.save({ title: "Temple", price: 300 });

  console.log(id1, id2, id3);

  const object2 = await contenedor.getById(2);
  console.log(object2);

  //await contenedor.deleteById(3); //Borrar un item

  const allCurrentObjects = await contenedor.getAll();
  console.log(allCurrentObjects);

  //await contenedor.deleteAll(); //Borrar todos los items
};

main();
