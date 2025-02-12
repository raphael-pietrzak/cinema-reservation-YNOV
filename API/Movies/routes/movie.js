var express = require('express');
var db = require('../db/mongoose.js');
var model = require('../db/schema/movie.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var router = express.Router();

function get_acl(token, callback) {
    callback("admin")
    /*
    fetch("http://127.0.0.1:3000/verify-token", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((json) => {
        console.log(json)
        if (json.valid && json.role) {
            callback(json.role);
        } else {
            callback(null);
        }
    })
    .catch((err) => {
        console.log(err);
        callback(null);
    });
    */
}

// GET movie by Query
router.get('/', (req, res, next) => {
    model.find(req.query).exec().then((movies) => {
        res.status(200).send(movies);
    })
    .catch((err) => console.log(err))
});

// GET movie by ID
router.get('/:id', (req, res, next) => {
    model.findById(req.params.id).exec().then((movie) => {
        if (!movie) {
            res.status(404).send("Movie not found");
            return
        }
        res.status(200).send(movie);
    })
    .catch((err) => console.log(err))
});

// POST movie to create
router.post('/create', (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(400).send("Auth token required");
    get_acl(req.headers.authorization, (role) => {
        if (role == "admin") {
            model.create(req.body).then((movie) => {
                res.status(201).send(`Movie "${movie.name}" created`);
            }).catch((err) => {
                res.status(400).send(err.message);
            })
            .catch((err) => console.log(err))
        } else {
            res.status(403).send("Unauthorized");
        }
    })
});

// PUT update movie by ID
router.put('/:id/update', (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(400).send("Auth token required");
    get_acl(req.headers.authorization, (role) => {
        console.log(role)
        if (role == "admin") {
            model.updateOne({_id: req.params.id}, req.body).then(() => {
                res.status(200).send();
            }).catch((err) => {
                res.status(400).send(err.message);
            })
            .catch((err) => console.log(err))
        } else {
            res.status(403).send("Unauthorized");
        }
    })
});

// DELETE movie by ID
router.delete('/:id/delete', (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(400).send("Auth token required");
    get_acl(req.headers.authorization, (role) => {
        if (role == "admin") {
            model.deleteOne({_id: req.params.id}).then((deleted) => {
                if (deleted.deletedCount == 1)
                    res.status(200).send();
                else
                    res.status(404).send("Not Found");
            })
            .catch((err) => console.log(err))
        } else {
            res.status(403).send("Unauthorized");
        }
    })
});

module.exports = router;
