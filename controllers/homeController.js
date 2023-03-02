module.exports.home = function(req,res){
    // return res.end('<h1>Express is up!</h1>');
    return res.render('home',{
        title:'Home Page'
    });
}
// module.export.actionName