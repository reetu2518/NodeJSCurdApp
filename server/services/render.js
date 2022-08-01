const axios = require("axios");

exports.homeRoute = (req,res) => {
    axios.get(process.env.API_PATH)
    .then(function(response){
        res.render("index", {users:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.add_user = (req,res) => {
    res.render("add_user")
}

exports.update_user = (req,res) => {
    axios.get(process.env.API_PATH, {params: {id:req.query.id}})
    .then(function(response){
        res.render("update_user", {users:response.data});
    })
    .catch(err=>{
        res.send(err)
    })
}