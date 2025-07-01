const axios=require('axios')

async function encodeToUTF8(query){
    return encodeURIComponent(query)
}

const api_key='686436bd2babd286392280adm057ea6'

async function fetchLocation(pincode){
    const encodedQuery=await encodeToUTF8(`"${pincode}"`)
    // const res=await axios.get(`https://geocode.maps.co/search?q=${encodedQuery}&api_key=${process.env.API}`);
    const res=await axios.get(`https://geocode.maps.co/search?q=${encodedQuery}&api_key=${api_key}`);
    // if(res.status===200 && res.data.length>0){
    //     const locationData=res.data[0];
    //     return {
    //         latitude: locationData.lat,
    //         longitude: locationData.lon,
    //         displayName: locationData.display_name,
    //         address: locationData.address
    //     };
    // }
    // else{
    //     throw new Error('Location not found');
    // }

    const latitude=Number(res.data[0]?.lat)
    const longitude=Number(res.data[0]?.lon)
    return {latitude,longitude}

}

module.exports={fetchLocation,encodeToUTF8}