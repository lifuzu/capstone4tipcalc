var Compiler = require("./compiler");

var compiler = new Compiler('ios', process.env.TARGET, console);
compiler.cleanDirectory();
compiler.build();
compiler.zip();
compiler.ipa();

if (process.env.PHONE) {
  compiler.phoneInstall();
}
