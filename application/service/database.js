const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const user_collection = db.collection('user');
const score_collection = db.collection('score');

function get_user(user_name) {
    return user_collection.findOne({ user_name: user_name });
}

function get_user_by_id(id) {
    return user_collection.findOne({ id: id });
}

async function add_user(user) {
    return await user_collection.insertOne(user);
}

async function update_user(user) {
    return await user_collection.updateOne({ user_name: user.user_name }, { $set: user });
}

async function update_user_remove_auth(user) {
    return await user_collection.updateOne({ user_name: user.user_name }, { $unset: { id: 1 } });
}

async function add_score(score) {
    return await score_collection.insertOne(score);
}

async function update_score(user_name, completion_time, word_length) {
    await score_collection.updateOne({ user_name: user_name }, { 
        $inc: { 
            completions_3: word_length === 3 ? 1 : 0, 
            completions_4: word_length === 4 ? 1 : 0 
        },
        $min: {
            ...(word_length === 3 && { best_time_3: completion_time }),
            ...(word_length === 4 && { best_time_4: completion_time })
        }
    });
}



module.exports = {
    get_user,
    get_user_by_id,
    add_user,
    update_user,
    update_user_remove_auth,
    add_score,
    update_score
};