// Connexion à la base de donnée.
mySqlClient = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "",
  database : "top14",
});

/* ------------ MODELS ------------ */
module.exports =
{
	// Permet de faire un SELECT (retour sur callBack)
  	doSelect: function (request, callBack) // callBack = a function.
	{
    		mySqlClient.query(request, function select(error, results, fields)
		{
		    	if (error)
			{
		      		console.log(error);
		      		//mySqlClient.end();
		    	}
			else
			{
		    		if (results.length > 0)
				{ 
					console.log(colors.cyan("[SQL] Request SQL : "+request+" return "+results.length+" results"));
					callBack(results);
		    		}
				else
				{
		      			console.log(colors.yellow("[SQL] /!\\ Request returning null : "+request)); // Aucun résultat.
					callBack({});
				}
		    		//mySqlClient.end();
		  	}
		});
	},
	// Permet de faire un INSERT (aucun retour)
	doInsert: function (request) // Return true if the insert works. Otherwise, it returns false.
	{
    		mySqlClient.query(request, function select(error, results, fields)
		{
		    	if (error)
			{
		      		console.log(error);
				return false;
		    	}
			else
			{
				console.log(colors.cyan("[SQL] Input Query executed : ["+request+"]"));
				return true;
		  	}
		});
	},
	// Permet de faire un DELETE (aucun retour)
	doDelete: function (request) // Return true if the insert works. Otherwise, it returns false.
	{
    		mySqlClient.query(request, function select(error, results, fields)
		{
		    	if (error)
			{
		      		console.log(error);
				return false;
		    	}
			else
			{
				console.log(colors.cyan("[SQL] Delete Query executed : ["+request+"]"));
				return true;
		  	}
		});
	},
	// Permet de faire un UPDATE (aucun retour)
	doUpdate: function (request) // Return true if the insert works. Otherwise, it returns false.
	{
    		mySqlClient.query(request, function select(error, results, fields)
		{
		    	if (error)
			{
		      		console.log(error);
				return false;
		    	}
			else
			{
				console.log(colors.cyan("[SQL] Update Query executed : ["+request+"]"));
				return true;
		  	}
		});
	},
	// Récupère toutes les réservations disponibles.
	getAllReservation: function (id, callBack)
	{
		sql.doSelect('SELECT reservation.*, user.nom, user.prenom, (SELECT COUNT(inscription.id) FROM inscription WHERE inscription.idReservation = reservation.id) as nbSeatsTaken FROM reservation, user WHERE reservation.auteur = user.id HAVING nbSeatsTaken < maxSeats AND reservation.auteur != "'+id+'" AND (SELECT COUNT(*) FROM inscription WHERE idUser = "'+id+'" AND idReservation = reservation.id) = 0;', callBack);
	},
	// Récupères les réservations proposées par l'utilisateur.
	getAllReservationOfUser: function (id, callBack)
	{
		sql.doSelect('SELECT reservation.*, user.nom, user.prenom, (SELECT COUNT(inscription.id) FROM inscription WHERE inscription.idReservation = reservation.id) as nbSeatsTaken FROM reservation, user WHERE reservation.auteur = user.id AND reservation.auteur ="'+id+'"', callBack);
	},
	// Récupères les réservations où l'utilisateur est inscrit.
	getAllInscriptionOfUser: function (id, callBack)
	{
		sql.doSelect('SELECT inscription.id as idInscription, user.nom, user.prenom, reservation.*, (SELECT COUNT(inscription.id) FROM inscription WHERE inscription.idReservation = reservation.id) as nbSeatsTaken FROM reservation, inscription, user WHERE inscription.idUser = '+id+' AND inscription.idReservation = reservation.id AND user.id = reservation.auteur;', callBack);
	}
}
