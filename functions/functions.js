module.exports = {
	// Permet de mettre un message dans la console concernant les requêtes HTTP.
  	logServer: function (req, code) {
    		var page = url.parse(req.url).pathname;
		var ip = req.connection.remoteAddress;
		if(code == 404)
		{
			console.log(colors.red('Requested URL : ['+page+'] from client IP ['+ip+'] with HTTP-Code ['+code+'].'));
		}
		else
		{
			console.log(colors.green('Requested URL : ['+page+'] from client IP ['+ip+'] with HTTP-Code ['+code+'].'));
		}
	}
}
