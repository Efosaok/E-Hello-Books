'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = process.env.SECRET; /*const authorize = (req, res, next)=> {
                                  const token = req.headers.authorization || req.headers['x-access-token'];
                                   if (token) {
                                    jwt.verify(token, 'secret', (err, decoded)=> {
                                       if (err) {
                                          console.error('JWT Verification Error', err);
                                          return res.status(403).send(err);
                                       } else {
                                          req.decoded = decoded;
                                          return next();
                                       }
                                    });
                                   } else {
                                    res.status(403).send('Token not provided');
                                   }
                                   }
                                   const isAdmin = (req,res,next)=>{
                                     if(req.decoded.userId === 1){
                                       next()
                                     }else{
                                       return res.status(403).send({message : "You are not an admin"})
                                     }
                                 }
                                 
                                 exports.authorize = authorize*/

var Authentication = {
  verifyToken: function verifyToken(req, res, next) {
    var token = req.headers.authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'No token found' });
    }
    _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
      if (err) {
        return res.status(401).send({ message: 'Invalid token' });
      }
      req.decoded = decoded;
      next();
    });
  }
};

exports.default = Authentication;