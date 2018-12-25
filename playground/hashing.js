const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var pass = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(pass, salt, (err, hash) => {
        console.log(hash);
    })
});

var hashPass = '$2a$10$SjweyFWCQyXbnQDceAQO2O7SSeaFSjDcDJ0.AMgj8x4tK9E8m2Fd.';

bcrypt.compare(pass, hashPass, (err, res) => {
    console.log(res);
})



// var data = {
//     id: 'iabdokasjndoasndkaiouhajslkdsfhodjksfhidoajnckhbifojadsdhifduoasjshb145614956214956231645qda1s49d6sd14S16'
// };




// var token = jwt.sign(data, '123abc')

// console.log(token);

// var decoded = jwt.verify(token, '123abc');



// console.log(decoded);
// var message = 'I am user no3';

// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// }
//  var token = {
//      data,
//      hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
//  }

//  token.data.id = 5;

//  token.hash = SHA256(JSON.stringify(token.data)).toString();

//  var resHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();


//  if (resHash === token.hash) {
//      console.log('Unchanged');
//  } else {
//      console.log('Changed');
//  }