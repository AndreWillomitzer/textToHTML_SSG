# textToHTML_SSG


### Description:

```
textToHTML is a file and folder parser to generate HTML files from txt files. It can be run from the command line.
To install the tool download the source code. Make sure to have an updated version of nodeJS and npm installed. On the command line, type npm install.
```
### Usage: 
```
Input is required, stylesheet and output folder are optional. Default output folder is "./dist".
```
### Examples:
```
node textToHTML -i <filename/foldername> -s <stylesheet url or path> -o <alternate folder output>

node textToHTML --input <filename/foldername> --stylesheet <stylesheet url or path> --output <alternate folder output>

node textToHTML --input <filename/foldername> --stylesheet <stylesheet url or path> 
```
### Features
```
- Supports outputting to a specified folder.
- Allows adding of custom stylesheets to generated HTML files.
```
### Support
```
- node textToHTML.js --help or -h displays a help menu with options/commands available.
```

### Sample Output
##### The Input Text:
```
I was not surprised. Indeed, my only wonder was that he had not
already been mixed up in this extraordinary case, which was the
one topic of conversation through the length and breadth of
England. For a whole day my companion had rambled about the room
with his chin upon his chest and his brows knitted, charging and
recharging his pipe with the strongest black tobacco, and
absolutely deaf to any of my questions or remarks. Fresh editions
of every paper had been sent up by our news agent, only to be
glanced over and tossed down into a corner. Yet, silent as he
was, I knew perfectly well what it was over which he was
brooding. There was but one problem before the public which could
challenge his powers of analysis, and that was the singular
disappearance of the favourite for the Wessex Cup, and the tragic
murder of its trainer. When, therefore, he suddenly announced his
intention of setting out for the scene of the drama it was only
what I had both expected and hoped for.

“I should be most happy to go down with you if I should not be in
the way,” said I.
```
##### The Output HTML:
```html
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<p>I was not surprised. Indeed, my only wonder was that he had not already been mixed up in this extraordinary case, which was the
one topic of conversation through the length and breadth of
England. For a whole day my companion had rambled about the room
with his chin upon his chest and his brows knitted, charging and
recharging his pipe with the strongest black tobacco, and
absolutely deaf to any of my questions or remarks. Fresh editions
of every paper had been sent up by our news agent, only to be
glanced over and tossed down into a corner. Yet, silent as he
was, I knew perfectly well what it was over which he was
brooding. There was but one problem before the public which could
challenge his powers of analysis, and that was the singular
disappearance of the favourite for the Wessex Cup, and the tragic
murder of its trainer. When, therefore, he suddenly announced his
intention of setting out for the scene of the drama it was only
what I had both expected and hoped for.</p> </br> 
<p>“I should be most happy to go down with you if I should not be in the way,” said I.</p> </br>
</body>
</html>
```
