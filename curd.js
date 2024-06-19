const express=require('express')
const con=require('./config')
const bodypars=require('body-parser')
const app=express()
app.use(bodypars.json())


app.get('/get',(req,resp)=>{
    con.query("select * from student",(err,result)=>{
        if(err){
            console.log('error')
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
            resp.send("error")
        }else{
            resp.send("inserted")
        }
    })
})

app.put('/put/:id',(req,resp)=>{
    const id=req.params.body
    const updateddata=req.body
    const studentdata=[updateddata.name,updateddata.age,id]
    const query="UPDATE student SET name=?,age=? WHERE id=?";
    con.query(query,studentdata,(err,result)=>{
        if(err){
            resp.send("error")
        }else{
            resp.send("updated")
        }
    })
})


app.delete('/del/:id',(req,resp)=>{
    const id=req.params.id;
    con.query("DELETE FROM student WHERE id=?",id,(err,result)=>{
        if(err){
            resp.send("error")
        }else{
            resp.send("delted")
        }
    })

})

app.listen(8000)