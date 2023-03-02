# Desafío 17: DESPLEGAR NUESTRO PROYECTO EN LA NUBE

## Consigna:

- Crear un proyecto en Heroku.com para subir el servidor que venimos realizando, reformando todo lo necesario para su correcto funcionamiento en la nube.

- Subir el código a Heroku.com, sin olvidar incluir el archivo .gitignore para evitar subir los node_modules. Comprobar que el proyecto inicie de manera correcta en la nube. Verificar que en su ruta raíz se encuentre la página pública del servidor.

- El servidor debe seguir funcionando en forma local. Realizar un cambio a elección en alguna vista, probar en forma local y subir nuevamente el proyecto a Heroku, verificando que la nueva reforma esté disponible online.

- Revisar a través de una consola local, los mensajes enviados por nuestro servidor en Heroku a su propia consola.

### Solución:

- https://github.com/AlamoGaston/DesafiosBackend/tree/Desafio-17

#### Terminal Gitbash:

-Github login
-git init
-git add .
-git commit -m “Desafio-17”
-git remote add origin “https://github.com/AlamoGaston/DesafiosBackend.git”
-git push -u origin “rama utilizada: Desafio-17”
si no funciona la linea de arriba
-git push -f -u origin “rama utilizada: Desafio-17”

- Disponible en: https://github.com/AlamoGaston/DesafiosBackend/tree/Desafio-17

Importante:

- Se debe contar con "start": "node server.js" en package.json
## Software utilizados:

- VSC

## Scripts

#### Backend: `nodemon server.js`

#### Backend: `nodemon server.js -p (puerto deseado)`

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
