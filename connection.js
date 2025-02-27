const sql = require('mysql')
const configuration = require('../KKI/db')
const connection = sql.createConnection(configuration)
connection.connect((err)=>{
    if(err)
    {
        console.error(`Error Connecting: ${err.stack}`)
        return
    }
    console.log(`Connected as ID ${connection.threadId}`)
})

module.exports = connection