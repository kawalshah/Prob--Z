import path from 'path';
import {ipdetails,compress,expand,hostdetails,iptodec,is4,is6,equalip} from './public/cn.js';
// import {inorder,preorder,postorder} from "./tree.js"
// import {infixToPrefix,infixToPostfix,preToPost} from "./stack.js";
// import {knapSackprob,activities,JobScheduling} from "./greedy.js"
import enc from './enc.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import bp from 'body-parser';
import express from 'express';
const app = express();

app.use(express.static("public"));
app.use(bp.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.listen(process.env.PORT || 3000, function() {
  console.log("server started on port 3000");
});
app.get("/os",function(req,res){
  //res.send("hfsij");
  res.sendFile(__dirname + "/fcfs.html");
});

app.get("/ds",function(req,res){
  //res.send("hfsij");
  res.sendFile(__dirname + "/dsa.html");
});

app.get("/page",function(req,res){
  //res.send("hfsij");
  res.sendFile(__dirname + "/page.html");
});

app.get("/sjf",function(req,res){
  //res.send("hfsij");
  res.sendFile(__dirname + "/sjf.html");
});
app.get("/rr",function(req,res){
  //res.send("hfsij");
  res.sendFile(__dirname + "/rr.html");
});
app.get("/disk",function(req,res){
  //res.send("hfsij");
  res.sendFile(__dirname + "/disk.html");
});

app.get("/cn", function(req, res) {
  res.sendFile(__dirname+"/cn.html");
  // res.render('cn', {IPv4:"",res:""});
});

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
  // res.render('cn', {IPv4:"",res:""});
});

app.post("/ipdetail",function(req,res){
  var out=ipdetails(req.body.ip,req.body.mask);
  var inp={ips:req.body.ip,masks:req.body.mask};
  // res.send(out);
  //res.render('cn',{IPv4:inp,res:out,code:"inpdetail"});
  // console.log(out);
  res.json([{
    data:out
  }])
})
app.get('/convert',function(req,res){
  console.log('hi');
})
app.post("/convert",function(req,res){
  var out=enc(req.body.cars,req.body.cars1,req.body.mask).toString();
  // var inp={cars:req.body.cars,cars1:req.body.cars1,masks:req.body.mask};
  // console.log(out);
  res.json([{
    data:out
  }])
  // res.render('cn',{IPv4:inp,res:out,code:"convert"});
})
app.post("/compress",function(req,res){
  var out=compress(req.body.ip);
  var inp=(req.body.ip);
  console.log(inp);
  // res.send(out);
  // res.render('cn',{IPv4:inp,res:out,code:"compress"});
  res.json([{
    data:out
  }])
})
app.post("/expand",function(req,res){
  // console.log(req.body.do);
  var out=expand(req.body.ip);
  var inp=req.body.ip;
  // res.send(out);
  // res.render('cn',{IPv4:inp,res:out,code:"expand"});
  res.json([{
    data:out
  }])
})
app.post("/hostdetail",function(req,res){
  var out=hostdetails(req.body.ip);
   res.json([{
    data:out
  }]);
})
app.post("/i2i",function(req,res){
  var out=iptodec(req.body.ip).toString();
  console.log(out);
  // res.send(out);
  // res.render({IPv4:req.body.ip,res:out,code:"i2i"});
  res.json([{
    data:out
  }])
})
app.post("/i2i",function(req,res){
  var out=iptodec(req.body.ip).toString();
  console.log(out);
  // res.send(out);
  // res.render({IPv4:req.body.ip,res:out,code:"i2i"});
  res.json([{
    data:out
  }])
})
app.post("/is4",function(req,res){
  var out=is4(req.body.ip);
  res.json([{
    data:out
  }])
})
app.post("/is6",function(req,res){
  var out=is6(req.body.ip);
  // console.log(req.body.ip);
  // console.log(out);
  res.json([{
    data:out
  }])
})
app.post("/equal",function(req,res){
  var out=equalip(req.body.ip,req.body.mask);

  res.json([{
    data:out
  }]);
})

app.get("/dsa",function(req,res){
  res.sendFile(__dirname+"/dsa.html");
})

app.post("/inorder",function(req,res){
  var pre=req.body.pre;
  var post=req.body.post;
  var out=inorder(pre,post).toString();
  var inp={pre,post};
  // res.send(out)
  res.render('dsa',{IPv4:inp,res:out,code:"inorder"});
})
app.post("/postorder",function(req,res){
  var ino=req.body.in;
  var pre=req.body.pre;
  var inp={ino,pre};
  var out=postorder(ino,pre).toString();
  // res.send(out);
  res.render('dsa',{IPv4:inp,res:out,code:"postorder"});
})
app.post("/preorder",function(req,res){
  var ino=req.body.in;
  var post=req.body.post;
  var inp={ino,post};
  var out=preorder(ino,post).toString();
  // res.send(out);
  res.render('dsa',{IPv4:inp,res:out,code:"preorder"});
})

app.post("/intopre",function(req,res){
  var ino=req.body.inp;
  var out=infixToPrefix(ino);
  // res.send(out);
  res.render('dsa',{IPv4:ino,res:out,code:"intopre"});
})
app.post("/pretopost",function(req,res){
  var ino=req.body.inp;
  var out=preToPost(ino);
  // res.send(out);
  res.render('dsa',{IPv4:ino,res:out,code:"pretopost"});
})
app.post("/intopost",function(req,res){
  var ino=req.body.inp;
  var out=infixToPostfix(ino);
  // res.send(out);
  res.render('dsa',{IPv4:ino,res:out,code:"intopost"});
})

app.post("/job",function(req,res){
  var ids=req.body.ids,
  profit=req.body.profit,
  dead=req.body.dead;
  var inp={ids,profit,dead};
  var out=JobScheduling(ids,profit,dead);
  // res.send(out.toString());
  res.render('dsa',{IPv4:inp,res:out,code:"job"});
})

app.post("/knap",function(req,res){
  var knap=req.body.knap,
  weight=req.body.weight,
  value=req.body.value;
  var inp={knap,weight,value};
  var out=knapSackprob(value,weight,knap);
  console.log(out);
  // res.send(out.toString());
  res.render('dsa',{IPv4:inp,res:out,code:"knap"});
})


app.post("/activity",function(req,res){
  var name=req.body.name,
  start=req.body.start,
  end=req.body.end;
  var inp={name:name,start:start,end:end };
  var out=activities(start,end);
  var o=[];
  out.forEach(pair =>
    o.push("("+pair[0]+","+pair[1]+")"));
  console.log(o);
  // res.send(o);
  res.render('dsa',{IPv4:inp,res:o,code:"activity"});
})
