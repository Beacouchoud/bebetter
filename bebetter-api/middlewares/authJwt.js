const jwt = require("jsonwebtoken");
var secret = 'Shh, its a secret!';


// - check if token is provided, legal or not. We get token from x-access-token of HTTP headers, then use jsonwebtoken's verify() function
verifyToken = (req, res, next) => {
  const authorized = ['/login', '/signup'];

  const needToken = !authorized.includes(req.url.split('?')[0])
  let token = req.headers["x-access-token"];

  if (needToken && !token) {
    console.log('not authorized');
    return res.status(403).send({ message: "No token provided!" });
  } else {
    console.log('token found');
  }

  if (needToken) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error('token not valid');
        return res.status(401).send({ message: "Unauthorized!" });
      } else {
        console.info('token not valid');
      }
      req.userId = decoded.id;
      next();
    });
  }
};


const authJwt = {
  verifyToken
};
module.exports = authJwt;