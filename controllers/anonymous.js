var functions = require('../functions/functions.js');

/**
 * Documentation
 * -> req.session.idUser !== undefined permet de rediriger l'utilisateur sur /user s'il est déjà connecté.
 */

// Défini les routes pour l'utilisateur anonyme.
function routeAnonymous()
{
	app.get('/', function(req, res)
	{
		if(req.session.idUser !== undefined)
		{
			res.redirect('/user');
		}
		else
		{
			functions.logServer(req, 200);
		
		    	res.render('extra.twig');
		}
	});

	app.get('/inscription', function(req, res)
	{
		if(req.session.idUser !== undefined)
		{
			res.redirect('/user');
		}
		else
		{
			functions.logServer(req, 200);

		    	res.render('inscription.twig');
		}
	});

	app.post('/inscriptionCheck', urlencodedParser, function(req, res)
	{
		if(req.session.idUser !== undefined)
		{
			res.redirect('/user');
		}
		else
		{
			if (req.body.user != '')
			{
				var user = req.body.user;
				var mail = req.body.mail;
				var pass = req.body.pass;
				var nom  = req.body.nom;
				var prenom = req.body.prenom;
				var adresse = req.body.adresse;
				var navigo = req.body.navigo;

				var newUser = sql.doInsert('INSERT INTO user VALUES("","'+user+'","'+mail+'","'+pass+'","'+nom+'","'+prenom+'","'+adresse+'","'+navigo+'")');

				res.render('inscriptionCheck.twig', {user:req.body.user});
		    	}
			else
			{
		    		res.redirect('/inscription', {error:"Des champs sont invalides"});
			}
		}
	});

	app.post('/loginCheck', urlencodedParser, function(req, res) // En construction
	{
		if(req.session.idUser !== undefined)
		{
			res.redirect('/user');
		}
		else
		{
			if (req.body.userLogin != '')
			{
				var user = req.body.userLogin;
				var pass = req.body.userPass;

				function callBack(data)
				{
					if(data.length == 1)
					{
						// Mettre l'utilisateur en session.
						userSession = req.session;
						userSession.idUser = data[0]['id'];
						res.redirect('/user');
					}
					else
					{
						res.redirect('/');
					}
				}

				sql.doSelect('SELECT id FROM user WHERE user="'+user+'" AND pass="'+pass+'"', callBack);
			    }
			else
			{
			    	res.redirect('/', {error:"Des champs sont invalides"});
			}
		}
	});
}

routeAnonymous();
