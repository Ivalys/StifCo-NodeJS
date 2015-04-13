var functions = require('../functions/functions.js');

/**
 * Documentation
 * -> Ce controlleur, défini en dernier dans server.js, permet de
 * récupérer les routes invalides et d'afficher une erreur 404 avec un lien vers l'accueil.
 */
function routeUnknow()
{
	app.use(function(req, res, next)
	{
		functions.logServer(req, 404);

	    	res.setHeader('Content-Type', 'text/html');
		res.status(404).send('<h1>Erreur 404 - Page introuvable !</h1>- <a href="/">Retourner &agrave; l`accueil')
	});
}

routeUnknow();
