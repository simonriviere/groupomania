
const Like = require ('../models/Like')
//ajout like ou dislike like 
exports.createLike = (req,res,next)=>{
   
    const likeObject = JSON.parse(req.body.like)  
    delete req.body._id;
    const like = new Like({
        ...req.body
    })   

    like.save().then(
        () => res.status(201).json({
            message : 'Like enregistré'
        })
    )
    .catch(
        error => res.status(400).json({
        error
    }));
}
//like par rapport à l'orderId
exports.getOneLike = (req, res, next) => {
    Like.findOne({ userId: req.params.userId }).then(
        (like) => res.status(200).json(like))
        .catch(
            error => res.status(404).json({
                error
            }));
}

//tout les likes
exports.getAllLike = (req, res, next) =>{
    Like.find().then(
        (likes) => res.status(200).json(likes)
    )
    .catch(
        error => res.status(400).json({
            error
        })
    )
}
