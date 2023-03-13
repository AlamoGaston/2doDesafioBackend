const twilio = require("twilio");

const dotenv = require("dotenv");
dotenv.config();

//no toma process.env
const accountSid = process.env.ACOOUNT || "AC32dbacc888a0b758dd4474557c053ea9"; //ver porque no toma process.env
const authToken = process.env.TOKEN || "4715a924e18b361c49775de829522df7"; //ver porque no toma process.env

const client = twilio(accountSid, authToken);

const sendSMS = async (body, from, to) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: from,
      to: to,
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendSMS;
