const connection = require('../KKI/connection')
async function getDatabyIT(issuerToken)
{
    //  WHERE tlog.issuer_token LIKE '${issuerToken}%' 
    const queryJoinData = 
    `SELECT
    dtl.message_order AS FLOW,
    dtl.body_log AS LOG
    FROM t_transaction_log_detail dtl 
    JOIN t_transaction_log tlog ON dtl.transaction_log_id = tlog.id
    JOIN c_participant acquirer ON tlog.acquirer_nns = acquirer.nns
    JOIN c_participant iss ON tlog.issuer_nns = iss.nns
    WHERE tlog.issuer_token LIKE '${issuerToken}%' 
    AND (tlog.processing_code LIKE '98%' OR tlog.processing_code LIKE '26%')
    AND (tlog.response_code = '00' OR tlog.response_code = '68')
    LIMIT 10;`
        try{
        const getData = await new Promise((resolve, reject) => {
            connection.query(queryJoinData, (err, rows, fields) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
        const essentialData = getData.map(part => part['FLOW'] === 3?part['LOG']:[])
        return essentialData[2];
        }
        catch(e){
            console.error('Error:', e.message)
            return
        }
}
module.exports = getDatabyIT