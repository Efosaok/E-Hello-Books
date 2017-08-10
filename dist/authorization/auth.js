'use strict';

var authorize = function authorize(req, res, next) {
   var token = req.headers.authorization || req.headers['x-access-token'];
   if (token) {
      jwt.verify(token, 'secret', function (err, decoded) {
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
};

exports.authorize = authorize;