import {readFileSync} from 'fs';

let file = process.argv[2];
if(file === '-') file = '/dev/stdin';

let chars;
try {
  chars = readFileSync(file, 'utf8').trim().split('');
} catch(err){
  chars = process.argv[2];
}

let sum = 0;
let step = Math.floor(chars.length / 2);
for (let i = 0; i < chars.length; i++) {
  let curr = chars[i];
  let next = chars[i + step] || chars[i - step];
  if (curr == next) {
    sum += Number(curr);
  }
}
console.log(sum);