var child_process = require("child_process");
var path          = require("path")

var Compiler = function(platform, environment, console) {
  this.platform = platform;
  this.environment = environment;
  this.console = console;

  this.calculateDirectories();
};

Compiler.prototype.log = function(toLog) {
  //this.console.log.writeln(toLog);
  this.console.log(toLog);
};

Compiler.prototype.run = function(toRun) {
  this.log('------------------')
  this.log(toRun);
  this.log('->')
  var out = child_process.execSync(toRun);
  this.log('' + out);
  this.log('------------------')
  return out;
};

Compiler.prototype.calculateDirectories = function() {
  this.rootDirectory     = process.cwd();
  this.platformDirectory = this.rootDirectory + '/' + this.platform;
  this.appDirectory      = this.rootDirectory + '/testbuild/' + this.environment + '_' + this.platform;
  this.buildDirectory    = this.appDirectory  + '/build';
  
  switch(this.environment) {
    case 'test':
      this.configuration = "Debug";
      this.iosSdk = "iphonesimulator";
      break;
    case 'staging':
      this.configuration = "Release";
      this.iosSdk = "iphoneos";
      break;
    default:
      throw("UNKNOWN ENVIRONMENT: " + this.environment);
  }

  this.compiledApp = this.buildDirectory;

  if (this.platform === 'android') {
    // TODO
  }
  else {
    this.compiledApp += '/' + this.configuration + '-' + this.iosSdk + '/TipApp.app';
  }

  this.zippedApp = this.appDirectory;
  if (this.platform === 'android') {
    this.zippedApp += '/TipApp_android.apk';
  }
  else {
    this.zippedApp += '/TipApp_ios.zip';
  }
};

Compiler.prototype.cleanDirectory = function() {
  this.log('cleaning: ' + this.appDirectory);
  this.run('rm -rf ' + this.appDirectory);
};

Compiler.prototype.buildJavascript = function() {
  var pwd = this.rootDirectory;
  var to_run = 'cd ' + pwd;
  to_run += " && react-native bundle --minify";
  to_run += " --platform ios";
  to_run += " --entry-file index.ios.js";
  to_run += " --bundle-output ios/main.jsbundle"
  this.run(to_run);
};

Compiler.prototype.buildIos = function() {
  var env, scheme, config, sdk;
  switch(this.environment) {
    case 'test':
      env = "TEST_ENVIRONMENT=1";
      scheme = "TipApp";
      break;
    case 'staging':
      env = "STAGING_ENVIRONMENT=1";
      scheme = "TipApp";
      break;
    default:
      throw("UNKNOWN ENVIRONMENT: " + this.environment);
  }

  var to_run = 'xcodebuild';
  to_run += "  GCC_PREPROCESSOR_DEFINITIONS='$GCC_PREPROCESSOR_DEFINITIONS " + env + "'"
  to_run += " -project " + this.platformDirectory + "/TipApp.xcodeproj";
  // to_run += " -target TipApp";
  to_run += " -scheme \"" + scheme + "\"";
  to_run += " -sdk " + this.iosSdk;
  to_run += " -configuration " + this.configuration;
  to_run += " -derivedDataPath " + this.buildDirectory;
  to_run += " OBJROOT=" + this.buildDirectory;
  to_run += " SYMROOT=" + this.buildDirectory;
  to_run += " ONLY_ACTIVE_ARCH=NO";
  to_run += " | xcpretty -c && exit ${PIPESTATUS[0]}";
  this.run(to_run)
};

Compiler.prototype.build = function() {
  this.run('mkdir -p ' + path.dirname(this.compiledApp));
  
  if (this.environment !== 'test') {
    this.buildJavascript();
  }
  this.buildIos();
};

Compiler.prototype.zipIos = function() {
  var parent_dir = path.dirname(this.compiledApp);
  var pwd = this.rootDirectory;
  var to_run = "cd " + parent_dir;
  to_run += " && zip -r " + this.zippedApp + " " + this.compiledApp;
  to_run += " && cd " + pwd;
  this.run(to_run);
};

Compiler.prototype.zip = function() {
  this.zipIos();
};

Compiler.prototype.ipaIos = function() {
  var parent_dir = path.dirname(this.compiledApp);
  var pwd = this.rootDirectory;
  var to_run = "cd " + parent_dir;
  to_run += " && xcrun -sdk " + this.iosSdk + " PackageApplication -v " + this.compiledApp;
  to_run += " -o " + this.zippedApp.replace('.zip', '.ipa');
  to_run += " && cd " + pwd;
  this.run(to_run);
};

Compiler.prototype.ipa = function() {
  this.ipaIos();
};

Compiler.prototype.phoneInstall = function() {
  // ios-deploy    testbuild/staging_ios/build/Staging-iphoneos/TipApp.app
  var to_run = "ios-deploy";
  //to_run += " --justlaunch";
  //to_run += " --debug";
  to_run += " --bundle \"" + this.compiledApp + "\"";

  this.run(to_run);
};

// TODO: copySauce

module.exports = Compiler;
