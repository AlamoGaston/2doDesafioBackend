# Desafío FINAL

## Consigna:

        Para culminar con el proyecto final, vamos a realizar las
        últimas reformas al desarrollo backend e-Commerce para que quede
        estructurado de acuerdo a los criterios y mecanismos que fuimos
        aprendiendo en este último trayecto del curso.

          -En primer lugar la aplicación de servidor debe tener sus capas MVC
          bien definidas y en archivos separados. Debe existir la capa de ruteo,
          el controlador, la capa de lógica de negocio con los casos de uso y
          las validaciones y la capa de persistencia con los DAOs/DTOs o
          Repositories necesarios para soportar el o los sistemas de
          persistencia elegidos. En caso de ser más de uno, utilizar una factory
          para que podamos elegir el sistema de almacenamiento al inicio del
          servidor.

          -El servidor debe disponer de configuraciones mediante variables de
          entorno, que permitan crear un ambiente para desarrollo y otro para
          producción, elegibles desde la variable de environment NODE_ENV al
          desplegar la aplicación. Como variables de configuración deberían
          estar el puerto de escucha del servidor, la persistencia elegida, el
          string de conexión a la base de datos (si hubiera varios sistemas de
          persistencia en base de datos considerar todos los casos y sus
          diferencias), API keys y todo lo que sea necesario que esté en un
          archivo protegido fuera del código del servidor. Pensar en utilizar
          bases de datos y servidores locales para la configuración de
          desarrollo.

          -Se debe analizar que el hecho de incorporar un caso más de uso en la
          lógica del servidor, sea un proceso de agregar código y no de
          modificar el existente.

          -Si agregamos un sistema más de persistencia, deberíamos agregar sólo
          el módulo nuevo y reformar la factory, mientras que resto del
          proyecto: router, controlador, lógica de negocio, validaciones y otros
          sistemas de persistencia no deberían sufrir modificaciones para
          soportar la nueva función.

          -El código debe quedar bien tabulado, legible, ordenado y comentado ni
          por exceso ni por defecto.

          -Las funciones o clases que se por sí solas expliquen su misión, no
          necesitan ser explicadas (salvo que amerite por complejidad).

         -Para concluir, subir el desarrollo completo a Heroku o algún PASS de
          preferencia, seleccionando la configuración a producción de modo de
          utilizar los parámetros adecuados de funcionamiento y la persistencia
          en la nube a través de bases de datos como servicio (DBaaS).

### Solución:

#### Run server: `nodemon server.js`

#### Run server: `nodemon server.js -p (puerto deseado)`

#### Run test - mocha, supertest, chai: `npm test`

#### Terminal Gitbash:

-Github login
-git init
-git add .
-git commit -m “Desafio-Final”
-git remote add origin “https://github.com/AlamoGaston/DesafiosBackend.git”
-git push -u origin “rama utilizada: Desafio-Final”
si no funciona la linea de arriba
-git push -f -u origin “rama utilizada: Desafio-Final”

- Disponible en: https://github.com/AlamoGaston/DesafiosBackend/tree/Desafio-Final

Importante:

- Se debe contar con "start": "node server.js" en package.json

## Software utilizados:

- VSC.
- Postman.
- MongoDB Atlas - nube

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
