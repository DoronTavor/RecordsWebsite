

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tavorsoftwareng:DavidBlu13@clusterrecords.vwadsqf.mongodb.net/?retryWrites=true&w=majority";
const MusicAlbum= require("../Models/AlbumModel");
//const {Client: Discogs} = require("disconnect");
const bigInt = require('big-integer');
const express= require('express');
const app= express();
const port= 3005;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const db = client.db('RecordsDB');
        const collection = db.collection('RecordsDB');

        // Query the collection and fetch all documents
        const records = await collection.find().toArray();
        const music=records[0].Music;
        const Cds=music.CDs;
        const Vinyls=music.Vinyls;
        return music;

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
var ret=[];
app.get('/api/cd',(req,res)=>{
    // in the request the id is passed
    const key= req.params.key;
    fetch(' https://api.discogs.com/releases/${bigInt(key)}',{
        method:"GET",
        headers:{
            token:"gfEAjkxaciUXSQumtUKdNrwGOqHCdTMgRQrYwLL"
        }

    }).then((res)=>{
        let data= res.json();
        var album= MusicAlbum(data);
        res.send(album);
    });

})
const result= run().then(((records)=>{
    const Cds=records.CDs;
    const Vinyls=records.Vinyls;
    console.log("Type of Cds:", typeof Cds);
    //saving cds


    var isTrue=true;


    for(const key in Cds){
        fetch(' https://api.discogs.com/releases/${bigInt(key)}',{
            method:"GET",
            headers:{
                token:"gfEAjkxaciUXSQumtUKdNrwGOqHCdTMgRQrYwLL"
            }
        }).then((res)=>{
            let data=res.json();
            if(isTrue && ret.length<=2){
                var album= MusicAlbum(data);
                console.log(album);
                ret.push(album);
                isTrue=false;
            }});

    }
    isTrue=true;
    for(const key in Vinyls){
        fetch(' https://api.discogs.com/releases/${bigInt(key)}',{
            method:"GET",
            headers:{
                token:"gfEAjkxaciUXSQumtUKdNrwGOqHCdTMgRQrYwLL"
            }
        }).then((res)=>{
            let data=res.json();
            if(isTrue && ret.length<=2){
                var album= MusicAlbum(data);
                console.log(album);
                ret.push(album);
                isTrue=false;
            }});

    }

})).catch(console.dir);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
