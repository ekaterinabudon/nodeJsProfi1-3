const express = require('express');
const { Transform } = require('stream');

const PORT = 1111;
const app = express();

app
  .post('/', (r, rs) => {
      const transformplus1 = function (c, enc, cb) {
          const newValue = c.toString().split('').map(digit => Number(digit) + 1).join('');
          this.push(newValue);
          cb();
      };
      const plus1 = new Transform({ transform: transformplus1 });
      r.pipe(plus1).pipe(rs);
  })
  .listen(process.env.PORT || PORT, () => console.log(process.pid));

console.log('http://localhost:1111/');
