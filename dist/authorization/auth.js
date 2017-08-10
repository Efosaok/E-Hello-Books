/*var authorize = function(req, res, next) {
 var token = req.body.token || req.headers[‘x-access-token’];
  if (token) {
   jwt.verify(token, 'secret', function(err, decoded) {
      if (err) {
         console.error(‘JWT Verification Error’, err);
         return res.status(403).send(err);
      } else {
         req.decoded = decoded;
         return next();
      }
   });
  } else {
   res.status(403).send(‘Token not provided’);
   }
}

exports.authorize = authorize*/
"use strict";