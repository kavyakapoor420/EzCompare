const express=require('express')
const cors=require('cors')
const { fetchLocation } = require('./ApiFunction/fetchLocation')


const app=express() 

app.use(cors())
app.use(express.json())

app.post('/search/swiggy',async(req,res)=>{
    const {query,pincode}=req.body ;
    const location=await fetchLocation(pincode)

    if(!query || !pincode){
        return res.status(400).json({error:'query and pincode required'})
    }
    if(!location || !location.latitude || !location.longitude){
        return res.status(400).json({error:'try searching with  a more specific locality name '})
    }
    try{
        const encodedQuery=encodeURIComponent(query)
        const swiggyUrl=`https://www.swiggy.com/search?location=${location.latitude},${location.longitude}&q=${encodedQuery}`
        
        // Fetching the Swiggy search results page
        const response=await fetch(swiggyUrl)
        if(!response.ok){
            throw new Error('Failed to fetch data from Swiggy')
        }
        
        const html=await response.text()
        console.log('Swiggy search results fetched successfully')
        return res.status(200).json({html})
    }catch(err){
        console.error('error scraaping swiggy',err)
        return res.status(500).json({error:'failed to fetch data'})
    }
})

app.listen(3000,()=>{
    console.log('Server running on port 3000')
})