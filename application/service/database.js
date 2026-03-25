const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const user_collection = db.collection('user');
const score_collection = db.collection('score');

function get_user(user) {
    return user_collection.findOne({ user_name: user });
}

function get_user_by_id(id) {
    return user_collection.findOne({ id: id });
}

function add_user(user) {
    return user_collection.insertOne(user);
}


module.exports = {
    get_user,
    get_user_by_id,
    add_user
};