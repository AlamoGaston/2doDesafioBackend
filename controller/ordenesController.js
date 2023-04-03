const storage = require("../daos/index");

const ordenesStorage = storage().ordenes;

const sendEmail = require("../src/utils/nodemailerGmail");
const sendSMS = require("../src/utils/twilioSMS");
const sendWhatsApp = require("../src/utils/twilioWtsp");

const createOrdenController = async (req, res) => {
  try {
    const userLog = req.user;
    const userID = req.body.idUser;
    const orden = await ordenesStorage.createOrden(userID);

    auxEmail(userLog, orden);
    /*
            NOTA:
                -La función encargada de realizar el envío de SMS se encuentra comentada ya que genera gastos.
                -La función encargada de realizar el envío de whatsapp se encuentra comentada ya que genera gastos.
        */
    //sendSMS(`Su pedido ha sido recibido y se encuentra en proceso`, `+12708196711`, `+5491131332857`);
    //auxWhatsApp(userLog, orden);

    return res.render("compraFinalizada");
  } catch (err) {
    return res.status(404).json({
      error: `Error al crear el la orden ${err}`,
    });
  }
};

const viewOrdenesController = (_req, res) => {
  return res.send("Estoy en viewOrdenes");
};

const auxEmail = async (userLog, orden) => {
  let detallePedido = ``;

  orden.products.forEach((element) => {
    detallePedido += `
        <li>UNIDADES: ${element.cantidad}. PRODUCTO: ${element.nombre}. CODIGO: ${element.codigo} </li>
    `;
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: `alamolionel@live.com.ar`,
    subject: `Nuevo pedido de: ${userLog.username}`,
    html: `
            <h3>Nuevo pedido!</h3>
            <p> Datos del cliente:</p>
            <ul>
            <li> Nombre: ${userLog.username}</li>
            <li> Email: ${userLog.email}</li>
            <li> Teléfono: ${userLog.telefono}</li>
            <li> Direccion: ${userLog.direccion}</li>
            </ul>
            <p> Pedido:</p>
            <ul>
            ${detallePedido}
            </ul>
        `,
  };
  const email = await sendEmail(mailOptions);
  console.log(email);
};

const auxWhatsApp = async (userLog, orden) => {
  let detallePedido = ``;

  orden.products.forEach((element) => {
    detallePedido += `
            - UNIDADES: ${element.cantidad}. PRODUCTO: ${element.nombre}. CODIGO: ${element.codigo}
            `;
  });

  const body = `Nuevo pedido!
        Datos del cliente:
        Nombre: ${userLog.username}
        ${userLog.email}
        Teléfono: ${userLog.telefono}
        Direccion: ${userLog.direccion}
        Pedido:
        ${detallePedido}
        `;
  await sendWhatsApp(body, `whatsapp:+14155238886`, `whatsapp:+5491131332857`);
};

module.exports = {
  viewOrdenesController,
  createOrdenController,
};
