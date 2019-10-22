const deleteUser = (req,res,next)=>{
    console.log(req.body);
    res.send(JSON.stringify(req.body, null, 2))
}

module.exports = deleteUser;