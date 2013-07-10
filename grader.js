#!/usr/bin/env node
/*
Automatically grade files for the presence of specified HTML tags/attributes.  Uses commander.js and cheerio.  Teaches command line application development
and basic DOM parsing.

References:

 + cheerio
   - https://github.com/MatthewMueller/cheerio
   - http://encosia.com/cheerio-faster-windows-friendly-alternative-jsdm/
   - http://maxogedn.com/scraping-with-node.html

 + commander.js
   - https://github.com/visionmedia/commander.js
    - http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy

 + JSON
   - http://en.wikipedia.org/wiki/JSON
   - https://developer.mozilla.org/en-US/docs/JSON
   - https://developer.mozilla.org/en-US/docs/JSON#JSON_in_Firefox_2

*/

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var rest = require('restler');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
	console.log("%s does not exist. Exiting.", instr);
	process.exit(1);
    }
    return instr;
};

var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
};



var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtml = function(htmlData, checksfile) {
    console.log("in checkHTML");
    $=cheerio.load(htmlData);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
	var present = $(checks[ii]).length > 0;
	out[checks[ii]] = present;
    }
    console.log("checkHtml returns out = "+out);
    outJson = JSON.stringify(out,null,4);
    console.log("outjson = "+outJson);

};



var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};


var buildFn = function(checksfile) {

    var processURL = function(result, response) {
	console.log("Result = "+result);
	console.log("Response = "+response);
	checkHtml(result,checksfile);
    };
    return processURL;
};




if(require.main == module) {
    program
       .option('-c, --checks <check_file>', 'path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
       .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
       .option('-u, --url <url>', 'URL to check')
       .parse(process.argv);

 
     processURL = buildFn(program.checks);
 
    if(program.url) {
	console.log("URL entered");
        rest.get("http://vast-shore-3806.herokuapp.com").on('complete',clone(processURL));
	}
    else {
	console.log("No URL entered");
	checkHtml(fs.readFileSync(program.file),program.checks);
	}
}
else {
    exports.checkHtmlFile = checkHtmlFile;
}


