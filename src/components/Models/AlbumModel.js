function MusicAlbum(data){
    return{
        _id:data["id"],
        Name:data["title"],
        Artist:data["artists"][0].name,
        Format:data["formats"][0].name,
        Year:data["year"],
        TrackList:data["tracklist"],
        Image:data["images"][0].resource_url
    };

}

module.exports = MusicAlbum; // Export the class










