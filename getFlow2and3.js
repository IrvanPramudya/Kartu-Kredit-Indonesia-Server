const connection = require('../KKI/connection')

async function getFlow2and3(rrn)
{
    const queryJoinData = 
    `SELECT
    dtl.message_order AS FLOW,
    dtl.body_log AS LOG
    FROM t_transaction_log_detail dtl 
    JOIN t_transaction_log tlog ON dtl.transaction_log_id = tlog.id
    JOIN c_participant acquirer ON tlog.acquirer_nns = acquirer.nns
    JOIN c_participant iss ON tlog.issuer_nns = iss.nns
    WHERE rrn LIKE '%${rrn}%'
    LIMIT 10;`
    try{
        const getData = await new Promise((resolve, reject) => {
            connection.query(queryJoinData, (err, rows, fields) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
        let savedData = {}
        getData.forEach(data => {
            if(data['FLOW']===2)
            {
                savedData['request'] = {
                    raw: data['LOG']
                }
            }
            if(data['FLOW'] === 3)
            {
                savedData['response'] = {
                    raw: data['LOG']
                }
            }
        });
        return savedData
    }
    catch(error){
        console.error(error)
        throw error
    }
}

module.exports = getFlow2and3