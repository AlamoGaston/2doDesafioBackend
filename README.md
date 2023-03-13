# Tercer entrega del proyecto final

## Consigna:

Un menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro.

- El registro de usuario consiste en crear una cuenta en el servidor almacenada en la base de datos, que contenga el email y password de usuario, además de su nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar. La contraseña se almacenará encriptada en la base de datos.
- La imagen se podrá subir al servidor y se guardará en una carpeta pública del mismo a la cual se tenga acceso por url.

Un formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones en forma exitosa, el usuario accederá a su home.

- El usuario se logueará al sistema con email y password y tendrá acceso a un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales con los filtros que se hayan implementado y su propio carrito de compras e información propia (datos de registro con la foto). Además, dispondrá de una opción para desloguearse del sistema.
- Ante la incorporación de un usuario, el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global.

Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.

- El usuario iniciará la acción de pedido en la vista del carrito.
- Será enviado una vez finalizada la elección para la realizar la compra de productos.
- El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de whatsapp se debe enviar la misma información del asunto del email.
- El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso.

Aspectos a incluir:

- El servidor trabajará con una base de datos DBaaS (Ej. MongoDB Atlas) y estará preparado para trabajar en forma local o en la nube a través de la plataforma PaaS Heroku.
- Habilitar el modo cluster para el servidor, como opcional a través de una constante global.
- Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacia la misma consola. En el caso de errores moderados ó graves el log tendrá además como destino un archivo elegido.
- Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el endpoint del listado de productos (con el usuario vez logueado). Verificar los resultados.

### Solución:

- https://github.com/AlamoGaston/DesafiosBackend/tree/Desafio-18-3raFinal

#### Terminal Gitbash:

-Github login
-git init
-git add .
-git commit -m “Desafio-17”
-git remote add origin “https://github.com/AlamoGaston/DesafiosBackend.git”
-git push -u origin “rama utilizada: Desafio-18-3raFinal”
si no funciona la linea de arriba
-git push -f -u origin “rama utilizada: Desafio-18-3raFinal”

- Disponible en: https://github.com/AlamoGaston/DesafiosBackend/tree/Desafio-18-3raFinal

Importante:

- Se debe contar con "start": "node server.js" en package.json

## Software utilizados:

- VSC

## Scripts

### Prueba con Artillery:

#### Modo Cluster:

- Terminal1: node server.js -CLUSTER
- Terminal2: artillery quick –-count 50 -n 20 "http://localhost:8080/api/productos" > result_api_productos_CLUSTER.txt
- Resultados del analisis: result_api_productos_CLUSTER.txt

#### Modo Fork:

- Terminal1: node server.js -CLUSTER
- Terminal2: artillery quick –-count 50 -n 20 "http://localhost:8080/api/productos" > result_api_productos_CLUSTER.txt
- Resultados del analisis: result_api_productos_FORK.txt

#### Backend: `nodemon server.js`

#### Backend: `nodemon server.js -p (puerto deseado)`

#### Run server: `nodemon server.js - CLUSTER` --> modo Cluster

Run the application locally
[http://localhost:8080/](http://localhost:8080/) por default

## Extra

- [Documentation](https://nodejs.org/es/) Nodejs
- [Documentation](https://es.wikipedia.org/wiki/Protocolo_de_transferencia_de_hipertexto) HTTP
- [Documentation](https://www.npmjs.com/package/nodemon) nodemon
- [Documentation](https://expressjs.com/es/) express
- [Documentation](https://www.postman.com) Postman

## Academy

> [CODERHOUSE](https://www.coderhouse.com)

## Course

> [Node Js](https://www.coderhouse.com/online/carrera-online-desarrollo-fullstack)

## Teach & tutor

> <p>Comisión 32165.</p>
> <p>Teach: Andrea Lopez.</p>
> <p>Tutor: Rodrigo Maestre.</p>

## Author

> <p>Gastón Lionel Alamo </p>
> <p>Email: alamolionel@live.com.ar </p>

---

<p align='center'>
&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/gaston-alamo-44b450212/"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" /></a>
</p>
