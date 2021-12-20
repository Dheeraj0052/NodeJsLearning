// const fs= require('fs');
// // synchronous calls
// const textIn=fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);

// const textOut=`this is dheeraj`;
// fs.writeFileSync('./txt/output.txt',textOut);

// //asynchronous calls
// fs.readFile('./txt/input.txt','utf-8',(err,data)=>{
//     console.log(data);
// });
// console.log("Reading file in async....");


// building a server
const http= require('http');
const sever=http.createServer((req,res)=>{
    const path= req.url;
    if(path === '/'||path==='/overview')
    res.end('this is a overview');
    else if(path==='/product')
    res.end('this is a product');
    else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>Page not found!</h1>');
    }
});

sever.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to port 8000');
})
