const response = (statusCode,data,message,res)=>{
    return res.status(statusCode).send([
        {
            payload:data,
            message:message,
        }
    ])
}

module.exports = response;