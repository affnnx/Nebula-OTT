import { fetchContentByCategory, fetchDetailsById, fetchFromTMBD, fetchSimilarContentById, fetchTrailersById } from "../services/tmbd.service.js";

export async function getTrendingContent( req, res) {
    try {
        const data = await fetchFromTMBD(`https://api.themoviedb.org/3/trending/all/day?language=en-US`)
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({ success : true, content : randomMovie})
        
    } catch (error) {
        res.status(500).json({ success : false, message : "Internal server error"})
    }
}

export async function getTrailerById( req, res){
    const {id} = req.params
    const {contentType} = req.params


    try {
        const data = await fetchTrailersById(`https://api.themoviedb.org/3/${contentType}/${id}/videos?language=en-US`)
        res.json({ success : true, trailers : data.results})
        
    } catch (error) {
        if (error.message.includes("404")) {
			return res.status(404).send(null);
		}
        res.status(500).json({ success : false, message : "Internal server error"})
    }
}

export async function getDetailsbyId( req, res){
    const {id} = req.params
    const {contentType} = req.params


    try {
        const data = await fetchDetailsById(`https://api.themoviedb.org/3/${contentType}/${id}?language=en-US`)
        res.json({ success : true, content : data})
        
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null)
        }
        res.status(500).json({ success : false, message : "Internal server error"})
    }
}

export async function getSimilarContentbyId( req, res){
    const {id} = req.params
    const {contentType} = req.params


    try {
        const data = await fetchSimilarContentById(`https://api.themoviedb.org/3/${contentType}/${id}/similar?language=en-US&page=1`)
        res.json({ success : true, similar : data.results})
        
    } catch (error) {
        res.status(500).json({ success : false, message : "Internal server error"})
    }
}

export async function getContentByCategory( req, res){
    const {category} = req.params
    const {contentType} = req.params


    try {
        const data = await fetchContentByCategory(`https://api.themoviedb.org/3/${contentType}/${category}?language=en-US&page=1`)
        res.json({ success : true, content : data.results})
        
    } catch (error) {
        res.status(500).json({ success : false, message : "Internal server error"})
    }
}