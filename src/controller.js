"use strict";

var model = require("./model.js");

module.exports.query = query;
module.exports.getOne = getOne;
module.exports.getAdoptions = getAdoptions;
module.exports.postAdoption = postAdoption;
module.exports.deleteAdoption = deleteAdoption;
module.exports.getCategories = getCategories;
module.exports.resetPets = resetPets;

const petModelName = "pets"
const adoptionModelName = "adoptions"

function query(req, res) {
    model.load(petModelName, function(entities) {
        console.log(req.query);
        entities = filterDeleted(entities);
        if(req.query.filter){
            try {
                req.query.filter = JSON.parse(req.query.filter);
            } catch(e) {
                console.log('invalid query');
            }
            for(var key in req.query.filter) {
                entities = entities.filter(function(obj) {
                    if(obj[key] !== undefined) {
                        return obj[key].toString().toLowerCase().indexOf(req.query.filter[key].toLowerCase()) > -1;
                    }
                    return true;
                });
            }
        }
        var count = entities.length;

        if(req.query.sort) {
            entities = sort(entities, req.query.sort, req.query.sortDirection);
        }

        res.status(200).json({count: count, results: entities});
    });
}

function filterDeleted(entities) {
    return entities.filter(function(obj) {
        return !obj.deleted
    })
}

function sort(array, field, sortDirection) {
    if(sortDirection && sortDirection === 'desc') {
        return array.sort(function(a, b) { return (a[field] > b[field]) ? -1 : ((b[field] > a[field]) ? 1 : 0); });
    } else {
        return array.sort(function(a, b) { return (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0); });
    }
}

function save(req, res) {
    // console.log(req);
    model.load(modelName, function(entities) {
        var lastId = 1
        if(entities.length > 0){
            lastId = parseInt(entities[entities.length-1]._id);
        }
        req.body._id = lastId + 1;
        entities.push(req.body);
        model.save(modelName, entities);
        res.status(200).json(req.body);
    });
}

function getOne(req, res) {
    model.load(petModelName, function(entities) {
        for(var i = 0, n = entities.length; i < n; i++) {
            var elem = entities[i];
            if(req.params.id === elem._id.toString()) {
                res.status(200).json(elem);
                return;
            }
        }
        res.status(404).json({});
    });
}



function getAdoptions(req, res) {
    model.load(adoptionModelName, function(entities) {
        entities = filterDeleted(entities);
        var count = entities.length;
        res.status(200).json({count: count, results: entities});
    });

}

function postAdoption(req, res) {
    model.load(adoptionModelName, function(entities) {
        var lastId = 1
        if(entities.length > 0){
            lastId = parseInt(entities[entities.length-1]._id);
        }
        req.body._id = lastId + 1;
        entities.push(req.body);
        model.save(adoptionModelName, entities);
        res.status(200).json(req.body);
    });
}

function deleteAdoption(req, res) {
    model.load(adoptionModelName, function(entities) {
        let petId = null;
        for (let i in entities) {
            if (entities[i]._id == req.params.id) {
                entities[i].deleted = true;
                petId = entities[i].petId
                model.load(petModelName, function(petities) {
                  for (let j in petities) {
                      if (petities[j]._id == entities[i].petId) {
                            petities[j].deleted = true;
                            break;
                      }
                  } 
                  model.save(petModelName, petities) 
                })
                break;
            }
        }
        for (let i in entities) {
            if (entities[i].petId == petId) {
                entities[i].deleted = true;
            }
        }
        model.save(adoptionModelName, entities);
        res.status(200).json(req.body);
    });
}

function resetPets(req, res) {
    model.load(petModelName, function(entities){
        for (let i in entities) {
            delete entities[i].deleted
        }
        model.save(petModelName, entities)
        res.status(200).json({});
    })
}

function getCategories(req, res) {
    res.status(200).json(["dog", "cat", "other"])
}