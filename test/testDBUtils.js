
const PostgresUno = require('postgres-uno');


module.exports.executeSQL = async function (sqlfunction,parms) {
    let db = null;
    try {
        db = new PostgresUno();
        let dbConfig = {
            host: "dbhost",
            user: "testuser",
            password: "testpwd",
            port: 5432,
            database: "itdb"
        };
        await db.connect(dbConfig);
        console.log("Connected");

        // BEGIN
        await db.query("BEGIN");
        console.log("BEGIN");

        // Execute
        let result = await sqlfunction(db,parms);
        console.log("Execute");

        // Commit
        await db.query("COMMIT");
        console.log("COMMIT");

        // Done
        return result;

    } catch (err) {
        let msg = `ROLL BACK TRANSACTION: ${err.toString()}`;
        console.log("msg");
        await db.query("ROLLBACK");
        return msg;
    } finally {
        await db.disconnect();
    }
}