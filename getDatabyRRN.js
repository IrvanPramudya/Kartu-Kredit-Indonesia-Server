const connection = require('../KKI/connection')
async function getDataByRRN(rrn)
{
    try{
        const queryJoinData = 
        `SELECT dtl.body_log AS LOG,dtl.message_order AS FLOW FROM t_transaction_log_detail dtl 
        JOIN t_transaction_log tlog ON dtl.transaction_log_id = tlog.id
        JOIN c_participant acquirer ON tlog.acquirer_nns = acquirer.nns
        JOIN c_participant iss ON tlog.issuer_nns = iss.nns
        WHERE rrn LIKE '%${rrn}%' LIMIT 10;`
        const getData = await new Promise((resolve, reject) => {
            connection.query(queryJoinData, (err, rows, fields) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
        const essentialData = getData.map(part => part['FLOW'] === 3?part['LOG']:[])
        return essentialData[2];
    }
    catch(error){
        console.log(error)
    }
}

module.exports = getDataByRRN