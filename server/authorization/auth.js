const authorize = (req, res, next)=> {
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

exports.authorize = authorize