const { Command } = require("commander");

const program = new Command();

program
  .version("1.0.0")
  .description("Um exemplo de CLI usando Commander")
  .option("-d, --debug", "Habilita o modo de depuração")
  .option("-u, --user <username>", "Especifica o nome do usuário")
  .parse(process.argv);

const options = program.opts();

if (options.debug) console.log("Modo de depuração ativado.");
if (options.user) console.log(`Usuário: ${options.user}`);

module.exports = program;