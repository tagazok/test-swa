module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const task = req.body.name;
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            task: {
                id: 1,
                label: task
            }
        }
    };
}