#!/usr/bin/env node
const argv = require('yargs/yargs')(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
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
})
  .alias('h', 'help')
  .alias('v', 'version')
  .alias('i', 'input')
  .alias('o', 'output')
  .command("--input", "Convert lines in a text file to HTML <p> tags.")
  .example("textToHTML: node textToHTML.js {option} <filename>.").argv
  //console.log(argv);
//console.log(argv.file);
const fs = require('fs');
var tempArray;
var tempString;
console.log("argv.o: ", argv.o);
if(!argv.o){
  if(fs.existsSync("./dist")){
      fs.rmdirSync("./dist",{recursive: true} , error=>{
        if(error){
          throw error;
        }
      });
      fs.mkdir("./dist", error=>{
        if(error){
          throw error;
        }
      });
    } //end of ./dist code

}else{
  if(fs.existsSync(`./${argv.o}`)){
    fs.rmdirSync(`./${argv.o}`,{recursive: true} , error=>{
      if(error){
        throw error;
      }
    });
    fs.mkdir(`./${argv.o}`, error=>{
      if(error){
        throw error;
      }
    });
  }else{
    fs.mkdir(`./${argv.o}`, error=>{
      if(error){
        throw error;
      }
    });
  }
}   
    if(fs.lstatSync(argv.input).isDirectory()){ //if the input is a directory
      fs.readdirSync(argv.input).forEach(file =>{
        let path = argv.input + "/"+ file;
        console.log("Directory file names: ", file);
        fs.readFile(path.toString(), 'utf-8', function(error, data){
           //console.log("data in directory file: ", data);
           const html = data
           .split(/\r?\n\r?\n/)
           .map(para =>
             `<p>${para.replace(/\r?\n/, ' ')}</p>`
           ).join(' ');

        console.log("html value:", html);
        tempString = `<!DOCTYPE html>` + '\n'
        + `<html>\n<head>` + `</head><body>` + `${html}` + `</body>\n</html>`;
          fs.writeFile(`./dist/${file.split(".")[0]}.html`, tempString, error=>{
            if(error){
              throw error;
            }
          });
        })
      })
    }else{ //if the input is a single file
      fs.readFile(argv.input, 'utf8', function(error, data){
          if(error){
              return console.log(error);
          }
          //console.log("Data value:", data);        
          const html = data
             .split(/\r?\n\r?\n/)
             .map(para =>
               `<p>${para.replace(/\r?\n/, ' ')}</p> </br>`
             ).join(' ');
          //console.log("html value:", html);
          tempString = `<!DOCTYPE html>` + '\n'
          + `<html>\n<head>` + `</head><body>` + `${html}` + `</body>\n</html>`;
          fs.writeFile(`./dist/${argv.input.split(".")[0]}.html`, tempString, error=>{
            if(error){
              throw error;
            }
          });
      });
    }
