var mongoClient = require("mongodb").MongoClient;
const { v4: uuidv4 } = require('uuid');


const connect = async () => {
    const client = mongoClient.connect("mongodb://todoswa:YRfTEUaXhyrK5sJo3zu3QQh0YG4RdSBxjIGTqmvPowjyhcsEG7ipYk8HOqoLHsOCa8TLlkgZuFKs20runGBp7Q%3D%3D@todoswa.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@todoswa@");
    return client;
};

module.exports = async function (context, req) {

    const client = await connect();
    const database = client.db("swa");
    const header = req.headers['x-ms-client-principal'];
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');
    const user = JSON.parse(decoded);

    console.log(req.body);

    const task = {
        id: uuidv4(),
        label: req.body.label,
        status: ""
    };

    const response = await database.collection("users").updateOne(
        { userId: user.userId },
        { $push: { tasks: task } }
    );
    context.res = {
        body: {
            task: task
        }
    };
}