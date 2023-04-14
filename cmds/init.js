/**
 * Init command
 */

exports.command = 'init [dir]'
exports.desc = 'Initialize kitty dir.'
exports.builder = {
  dir: {
    default: '.'
  }
}
exports.handler = function (argv) {
  console.table(argv);
  console.log('init called for dir', argv.dir)
}