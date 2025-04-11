import { User } from "../models/user.model.js";
import { fetchFromTMBD } from "../services/tmbd.service.js";

export async function searchQuery(req, res){
    const {query} = req.params;
    const {queryType} = req.params;

    try {
        const response = await fetchFromTMBD(`https://api.themoviedb.org/3/search/${queryType}?query=${query}&include_adult=false&language=en-US&page=1`)

        if(response.results.length ===0){
            res.status(404).send(null)
        }

        const firstResult = response.results[0];
        const searchType = queryType === "person" ? "people" : queryType;


        const alreadyExists = req.user.searchHistory.some(
            (item) => item.id === firstResult.id && item.searchType === searchType
          );
          
          if (!alreadyExists) {

        await User.findByIdAndUpdate(req.user._id, { $push : {
            searchHistory : {
                id : firstResult.id,
                image : firstResult.profile_path || firstResult.poster_path,
                title : firstResult.title || firstResult.name,
                searchType : searchType,
                createdAt : new Date()
            }
        }} )
    }

        res.status(200).json({success : true, content : response.results}  )
        
    } catch (error) {
        console.log("Error in search controller" + error)
        res.status(500).json({success : false, message : "Internal server error"})

    }
}

export async function getSearchHistory(req, res){
    try {
        res.status(200).json({success : true, content : req.user.searchHistory})
    } catch (error) {
        console.log("Error in search controller" + error)
        res.status(500).json({success : false, message : "Internal server error"})
    }
}

export async function removeItemFromHistory(req, res){
    let {id} =req.params;
    id=parseInt(id)
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull : {
                searchHistory : {id : id}
            }
        })
        res.status(200).json({success : true, message : "Removed Item successfully"})

    } catch (error) {
        console.log("Error in search controller" + error)
        res.status(500).json({success : false, message : "Internal server error"})
    }
}