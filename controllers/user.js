var functions = require('../functions/functions.js');

// Défini les routes pour l'utilisateur connecté.

/** 
 * Documentation
 * -> req.session.idUser === undefined permet de rediriger l'utilisateur sur l'accueil s'il n'est pas connecté.
 */

function routeUser()
{
	app.get('/user', function(req, res)
	{
		if(req.session.idUser === undefined)
		{
			res.redirect('/');
		}
		else
		{
			functions.logServer(req, 200);

			function callBack2(data, err)
			{
				function callBack3(data2, err)
				{
					function callBack4(data3, err)
					{
						res.render('user.twig', {user:user, reservations:data, mesReservations:data2, mesInscriptions:data3, loggedIn:true});
					}

					// Récupérer les reservations ou l'utilisateur est inscrit.
					sql.getAllInscriptionOfUser(userSession.idUser, callBack4);
				}
				// Récupère les réservations proposés par l'utilisateur courant.
				sql.getAllReservationOfUser(userSession.idUser, callBack3);
			}

			function callBack(data, err)
			{
				if(data.length == 1)
				{
					// Mettre l'utilisateur en session.
					user = data[0];
					// Récupère les réservations disponibles.
					sql.getAllReservation(userSession.idUser, callBack2);
				}
			}

			sql.doSelect('SELECT * FROM user WHERE id="'+userSession.idUser+'"', callBack);
		}
	});

	app.get('/deleteReserve/:id', urlencodedParser, function(req, res)
	{
		if(req.session.idUser === undefined)
		{
			res.redirect('/');
		}
		else
		{
			function callBack(data, err)
			{
				if(data[0]['auteur'] == userSession.idUser)
				{
					sql.doDelete('DELETE FROM reservation WHERE id="'+req.params.id+'"');
					sql.doDelete('DELETE FROM inscription WHERE idReservation="'+req.params.id+'"');
					console.log('Deleting Reservation ID : ['+req.params.id+']');
					res.redirect('/user');
				}
			}

			sql.doSelect('SELECT auteur FROM reservation WHERE id="'+req.params.id+'"', callBack);
		}
	});

	app.get('/deleteInscription/:id', urlencodedParser, function(req, res)
	{
		if(req.session.idUser === undefined)
		{
			res.redirect('/');
		}
		else
		{
			function callBack(data, err)
			{
				if(data[0]['idUser'] == userSession.idUser)
				{
					sql.doDelete('DELETE FROM inscription WHERE id="'+req.params.id+'"');
					console.log('Deleting Inscription ID : ['+req.params.id+']');
					res.redirect('/user');
				}
			}

			sql.doSelect('SELECT idUser FROM inscription WHERE id="'+req.params.id+'"', callBack);
		}
	});

	app.get('/newReserve/:id', urlencodedParser, function(req, res)
	{
		if(req.session.idUser === undefined)
		{
			res.redirect('/');
		}
		else
		{
			function callBack(data, err)
			{
				if(data[0]['nbInscription'] == 0)
				{
					sql.doInsert('INSERT INTO inscription VALUES("","'+req.params.id+'","'+userSession.idUser+'")');
					console.log('Insert Reservation ID : ['+req.params.id+'] for user ['+userSession.idUser+']');
					res.redirect('/user');
				}
			}

			sql.doSelect('SELECT COUNT(id) as nbInscription FROM inscription WHERE idReservation="'+req.params.id+'" AND idUser="'+userSession.idUser+'"', callBack);
		}
	});

	app.post('/userReserve', urlencodedParser, function(req, res)
	{
		if(req.session.idUser === undefined)
		{
			res.redirect('/');
		}
		else
		{
			if(req.body.dateDebut != '')
			{
				// Traiter l'enregistrement.
				var dateDebut = req.body.dateDebut;
				var dateFin   = req.body.dateFin;
				var maxSeats  = req.body.maxSeats;
				var mairie    = req.body.mairie;

				sql.doInsert('INSERT INTO reservation VALUES("","'+userSession.idUser+'","'+dateDebut+'","'+dateFin+'","'+maxSeats+'","'+mairie+'")');
				res.redirect('/user');
			}
		}
	});

	app.post('/editReserve/:id', urlencodedParser, function(req, res)
	{
		if(req.session.idUser === undefined)
		{
			res.redirect('/');
		}
		else
		{
			function callBack(data, err)
			{
				if(data.length > 0)
				{
					var dateDebut = req.body.dateDebut;
					var dateFin   = req.body.dateFin;
					var maxSeats  = req.body.maxSeats;
					var mairie    = req.body.mairie;

					sql.doUpdate('UPDATE reservation SET dateDebut="'+dateDebut+'", dateFin="'+dateFin+'", maxSeats="'+maxSeats+'", mairie="'+mairie+'"  WHERE id="'+req.params.id+'"');
				}
			
				res.redirect('/user');
			}
			sql.doSelect('SELECT auteur FROM reservation WHERE id="'+req.params.id+'" AND auteur="'+userSession.idUser+'"', callBack);
		}
	});

	app.get('/logout', function (req, res)
	{
		req.session.destroy();
		delete userSession;
		res.redirect('/');
	});
}

routeUser();
