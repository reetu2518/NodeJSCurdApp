const User = require("../model/model");

// create and save new user
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    try {
        // new User
        const user = new User({
            name : req.body.name,
            email : req.body.email,
            gender : req.body.gender,
            status : req.body.status
        })

        user.save(user)
        .then(data=>{
            // res.send(data);
            res.redirect("/");
        })
        .catch(err=>{
            res.status(500).send({
                status : 500,
                message : err.message || "Some error occurred while creating a create operation",
            })
        })
    } catch (error) {
        res.status(500).send({
            status : 500,
            message : error.message || "Some error occurred while creating a create operation",
        })
    }
}


// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        User.findById(id)
        .then(data=>{
            if (!data) {
                res.status(404).send({ message : "Not found user with id "+ id})
            } else {
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({ message: "Erro retrieving user with id " + id})
        })
    } else {
        User.find().then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({
                message : err.message || "Error Occurred while retriving user information" 
            })
        })
    }
}


// Update a new idetified user by user id
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message : "Data to update can not be empty"
        })
    }
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(data=>{
        if (!data) {
            res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
        } else {
            res.send(data);
        }
    })
    .catch(err=>{
        res.status(500).send({ message : "Error Update user information"})
    })
}


// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
    .then(data=>{
        if (!data) {
            res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
        } else {
            res.send({
                message : "User was deleted successfully!"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    })
}