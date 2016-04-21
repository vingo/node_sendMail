'use strict';
let request = require('request'),
    fs=require('fs'),
    proc_child = require('child_process');
var server=require('http');
const exec = proc_child.exec;
var fund_url='http://nufm3.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?type=CT&cmd=6008871,6004151,0023852,0020072,6003051,6001111,0000782,6003671,0023172,0005902,&sty=E1OQCPZT&st=z&sr=&p=&ps=&cb=&js=&token=8a36403b92724d5d1dd36dc40534aec5&rt=0.27014357177774095'
server.createServer((req,res)=>{
    var timer=setInterval(function () {
       sendMail(fund_url);
    },1000*60*10);//10mins loop once
    res.end('damon has started,mails will be send in 10 mins a loop');
}).listen(5188);

function sendMail(url){
  request(url,(err, response, body)=>{
    if(err){
        body="please sen request again! there is something wrong :"+ex.message;
        return ;
    }else{
        body=body.replace(/['('|')']/g,'');
    }
   var p_data=[];
   try{
        p_data=JSON.parse(body);
   }catch(ex){
        console.warn(ex.message);
        p_data=[];
   }
    genernalFile(p_data);
    execCmd();
  });
}
function genernalFile(p_data){
    let temp=``,i=0,html=fs.readFileSync('fund.html','utf-8');
    p_data.forEach(i=>{
        let item=i.split(',')||[0,0,0,0,0];
        temp+=`<tr>
        <td>${i++}</td>
        <td><a href="http://quote.eastmoney.com/sh${item[1]}.html">${item[1]}</a></td>
        <td><a href="http://quote.eastmoney.com/sh${item[1]}.html">${item[2]}</a></td>
        <td><span>${item[3]}</span></td>
        <td><span>${item[4]}</span></td>
        </tr>`;
    });
    i=0;
    html=html.replace('$temp',temp);
    fs.writeFileSync('fund.html',html);
}
function execCmd() {
    //send mail
    // refer： http://www.blat.net/syntax/syntax.html
    // var cmd='blat file.log -t **@163.com -subject "subject" -body "hello"  -u user@163.com -pw 123 -charset Gb2312';
    //blat -install  <server addr> <sender's addr> 指定发送的服务器和邮箱
    var cmd='blat fund.html -t maoobo@163.com -subject "latest fund status"';
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
            console.error(err);
        }else{
        console.log('send success****');
      }
    });
}


