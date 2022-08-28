const nodemailer = require("nodemailer");

const HandleEmailAutorization = () => {
  return new Promise((resolve, reject) => {
    const response = nodemailer.createTransport({
      host: "mail.charlizespa.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'reservas@charlizespa.com',
        pass: 'charlize.3467',
      },
    });
    resolve(response)
  })
}

module.exports = {
  HandleEmailAutorization
}
