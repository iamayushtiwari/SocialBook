module.exports.home = function(req,res){
    // return res.end('<h1>Express is up!</h1>');
    console.log(req.cookies)
    res.cookie("user_id",60)
    res.cookie("user_name","admin")
    return res.render('home',{
        title:'Home Page'
    });
}
// module.export.actionName