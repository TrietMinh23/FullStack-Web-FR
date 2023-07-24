const { MongoClient } = require('mongodb');

const mongoURL = 'mongodb+srv://admin1:UiQSaUPUhhT2w0pv@atlascluster.opa3mwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName = 'myFirstDatabase';

// Function to save the image URL to MongoDB
function saveImageUrlToMongoDB(url) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoURL, (err, client) => {
            if (err) {
                reject(err);
            } else {
                const db = client.db(dbName);
                const collection = db.collection('images');

                collection.insertOne({ url }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                    client.close();
                });
            }
        });
    });
}

// Function to delete the image URL from MongoDB
function deleteImageUrlFromMongoDB(imageId) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoURL, (err, client) => {
            if (err) {
                reject(err);
            } else {
                const db = client.db(dbName);
                const collection = db.collection('images');

                collection.deleteOne({ _id: imageId }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                    client.close();
                });
            }
        });
    });
}

module.exports = {
    saveImageUrlToMongoDB,
    deleteImageUrlFromMongoDB,
};
