import {readFileSync} from 'fs';

let file = process.argv[2];
if(file === '-') file = '/dev/stdin';

let chars = readFileSync(file, 'utf8').trim().split('');
let sum = 0;
for (let i = 0; i < chars.length; i++) {
  let curr = chars[i];
  let next = chars[i + 1] || chars[0];
  if (curr == next) {
    sum += Number(curr);
  }
}
console.log(sum);