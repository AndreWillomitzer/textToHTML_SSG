#!/usr/bin/env node
const argv = require('yargs/yargs')(process.argv.slice(2))
  .usage('Usage: node $0 <command> [options]')
  .help('h')
  .option('i', {
    alias: 'input',
    demandOption: true,
    default: '.',
    describe: 'file argument',
    type: 'string'
  }
  ).option('o', {
    alias: 'output',
    demandOption: true,
    default: './dist',
    describe: 'output folder for html files.',
    type: 'string'
  }
  ).option('s',{
    alias: 'stylesheet',
    demandOption: false,
    describe: 'stylesheet to be applied to html files.',
    type: 'string'
  }
  ).alias('h', 'help')
  .alias('v', 'version')
  .alias('i', 'input')
  .alias('o', 'output')
  .alias('s', 'stylesheet')
  .command("--input", "Convert lines in a text file to HTML <p> tags.")
  .example("textToHTML: node textToHTML.js -i <filename>.").argv
  //console.log(argv);
//console.log(argv.file);
const fs = require('fs');
const path = require('path');
let tempString;
console.log("argv.o: ", argv.o);
if(argv.o === "./dist"){
  if(fs.existsSync("./dist")){
      fs.rmdirSync("./dist",{recursive: true} , error=>{
        if(error){
          throw error;
        }
      });
    } //end of ./dist code
    fs.mkdir("./dist", error=>{
      if(error){
        throw error;
      }
    });
}/* else{
  if(fs.existsSync(`./${argv.o}`)){
    fs.rmdirSync(`./${argv.o}`,{recursive: true} , error=>{
      if(error){
        throw error;
      }
    });
  }
    fs.mkdir(`./${argv.o}`, error=>{
      if(error){
        throw error;
      }
    });
}  */
/* 
if(argv.input.indexOf(":") != -1){
    if(fs.existsSync(`./${argv.o}`)){
      fs.rmdirSync(`./${argv.o}`,{recursive: true} , error=>{
        if(error){
          throw error;
        }
      });
    }
    fs.mkdir(`./${argv.o}`, error=>{
      if(error){
        throw error;
      }
    });
  }else{
    fs.mkdir(`${argv.o}`, error=>{
      if(error){
        throw error;
      }
    });
  } 
  */
if(fs.lstatSync(argv.input).isDirectory()){ //if the input is a directory
fs.readdirSync(argv.input).forEach(file =>{
  let path = argv.input + "/"+ file;
  console.log("Directory file names: ", file);
  fs.readFile(path.toString(), 'utf-8', function(error, data){
      //console.log("data in directory file: ", data);
      const html = data
      .split(/\r?\n\r?\n/)
      .map(para =>
        `\n<p>${para.replace(/\r?\n/, ' ')}</p>`
      ).join(' ');

  //console.log("html value:", html);
  tempString = `<!DOCTYPE html>` + '\n'
  + `<html>\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">` + `\n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
  if(argv.s){
    tempString = `<!DOCTYPE html>` + '\n'
    + `<html>\n<head> \n<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">` + `\n<link rel="stylesheet" href="${argv.s}"> \n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
  }
    fs.writeFile(`${argv.output}/${file.split(".")[0]}.html`, tempString, error=>{
      if(error){
        throw error;
      }
    });
  })
})
}else{ //if the input is a single file
  fs.readFile(argv.input, 'utf8', function(error, data){
      if(error){
          throw error;
      }
      //console.log("Data value:", data);        
      const html = data
          .split(/\r?\n\r?\n/)
          .map(para =>
            `\n<p>${para.replace(/\r?\n/, ' ')}</p> </br>`
          ).join(' ');
        tempString = `<!DOCTYPE html>` + '\n'
        + `<html>\n<head> \n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">` + `\n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
        if(argv.s){
          tempString = `<!DOCTYPE html>` + '\n'
          + `<html>\n<head> \n<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">` + `\n<link rel="stylesheet" href="${argv.s}"> \n</head>\n<body>` + `${html}` + `\n</body>\n</html>`;
        }
      fs.writeFile(`${argv.output}/${path.basename(argv.input, ".txt")}.html`, tempString, error=>{
        if(error){
          throw error;
        }
      });
  });
}
