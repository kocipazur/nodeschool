var args,
     i,
     argssum,
     argslen;

args = process.argv;
argssum = 0;
argslen = process.argv.length;

if (argslen > 2) {
     for (i = 2; i < argslen; i += 1) {
          argssum = argssum + parseInt(args[i]);
     }
}
console.log(argssum);
