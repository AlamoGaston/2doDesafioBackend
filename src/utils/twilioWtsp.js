const twilio = require("twilio");

const ACCOUNT_SID = process.env.ACOOUNT || `AC32dbacc888a0b758dd4474557c053ea9`;
const AUTH_TOKEN = process.env.TOKEN || `4715a924e18b361c49775de829522df7`;
const PHONE_NUMBER_WHATSAPP = `whatsapp:+5491131332857`;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendWhatsApp = async (body, from, to) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: from || "whatsapp:+14155238886",
      to: to || "whatsapp:+5491131332857",
      //`whatsapp:+5491131332857`
    });
    console.log(message);
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = sendWhatsApp;
