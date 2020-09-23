const Sauce = require('../models/Sauce')
const fs = require('fs'); //acces au fichier pour delete

//ajout d'une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id; // l'id est fournis automatiquement du coup on ne récupère pas celui du front 
    const sauce = new Sauce({
        ...sauceObject, //détail les info du body du front posté
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    });
    // thing.save() permet d'enregistrer le thing dans la base de donnée et renvoyer une promise
    sauce.save().then(
        () => res.status(201).json({
            message: 'objet enregistré !'
        })) //tjrs envoyer une res
        .catch(
            error => res.status(400).json({
                error
            }));
};
// modifier une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(201).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

//supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    //on va chercher l'url a supprimer
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id }).then(
                    () => res.status(200).json({
                        message: 'Objet supprimé !'
                    }))
                    .catch(
                        error => res.status(400).json({
                            error
                        }))
            });
        })
}
//une sauce par rapport à l'orderId
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then(
        (sauce) => res.status(200).json(sauce))
        .catch(
            error => res.status(404).json({
                error
            }));
}
//toutes les sauces
exports.getAllSauce = (req, res, next) => {

    Sauce.find().then(
        (Sauces) => res.status(200).json(Sauces) 
        )
        .catch(
            error => res.status(400).json({
                error
            }))  
}
