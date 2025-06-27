// Converts Markdown to HTML on the server or client
const marked = require('marked');
//  HTML sanitization to protect users and applications from malicious or unsafe HTML input,it removes script tag
const sanitizerHtml=require('sanitize-html');
//convert html to markdown
const TurndownService=require("turndown");


function sanitization(markdownContent){
    const convertedHtml=marked.parse(markdownContent);
    const turndownService= new TurndownService();

    //sanitized html
    const sanitizedHtml=sanitizerHtml(convertedHtml,{
        allowedTags:sanitizerHtml.defaults.allowedTags.concat('img')
    });

    const sanitizedMarkdown=turndownService.turndown(sanitizedHtml);
    return sanitizedMarkdown;
}

module.exports=sanitization;
