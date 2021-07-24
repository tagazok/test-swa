module.exports = async function (context, req) {

    const header = req.headers['x-ms-client-principal'];
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');
    const user = JSON.parse(decoded);

    const task = req.body.name;
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            task: {
                id: 1,
                userId: user.userId,
                status: 'open',
                label: task
            }
        }
    };
}