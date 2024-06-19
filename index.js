const express=require('express')
const con=require('./config')
const app=express()
const bodypars=require('body-parser')
app.use(bodypars.json())

app.get('/',(req,resp)=>{
con.query("select * from student",(err,result)=>{
    if(err){
        resp.send(err)
    }else{
        resp.send(result)
    }
})
})

app.post('/post',(req,resp)=>{
    const data=req.body;
    const values=[data.name,data.age]
    con.query("INSERT INTO student(name,age)VALUES(?,?)",values,(err,result)=>{
        if(err){
            resp.send(err)
        }else{
            resp.send("inserted")
        }
    });
})

app.put('/put/:id',(req,resp)=>{
    const id=req.params.id
    const updatedata=req.body
    const stuupdate=[updatedata.name,updatedata.age,id]
const query="UPDATE student SET name=?,age=? WHERE id=?";
con.query(query,stuupdate,(err,result)=>{
    if(err){
        resp.send("error")
    }else{
        resp.send("updated")
    }
})
})

app.delete('/del/:id',(req,resp)=>{
    const id=req.params.id
    con.query("DELETE FROM student WHERE id=?",id,(err,result)=>{
        if(err){
            resp.send('error')
        }else{
            resp.send("deleted")
        }
    })


})



app.listen(5000)
