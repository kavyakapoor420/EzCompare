const express=require('express')
const cors=require('cors')


const app=express() 

app.use(cors())
app.use(express.json())

app.post('/search/swiggy',async(req,res)=>{
    const {query,pincode}=req.body ;
})

app.listen(3000,()=>{
    console.log('Server running on port 3000')
})