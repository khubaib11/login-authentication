const express=require("express");
const app=express();
const bcrypt=require("bcrypt");
app.use(express.json())

const users=[];

app.get('/users',(req,res)=>{
    res.json(users);
})

app.post("/users",async(req,res)=>{

try{
    const hashPassword=await bcrypt.hash(req.body.password,10);
    
    const user= {name:req.body.name,password:hashPassword}
    users.push(user);
    res.send("complete");

}catch{
    res.send("error in bcrypt")
}
})


app.post("/users/login", async (req,res)=>{
    const user=users.find(user => user.name=req.body.name);
    
    if(user == null){
        res.send("user is null");
    }

    try {
      if(await  bcrypt.compare(req.body.password,user.password)){
        res.send("user loged in");
      }else{
        res.send("login faild")
      }
    } catch {
        res.send("error in bcrypt")
    }
})

app.listen(3000);
