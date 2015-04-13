// Variables.
var http = require('http'); // Permet de créer le serveur.
var port = 8081; // Port utilisé par le serveur.

/** 
 * Documentation (ENGLISH) : Troubleshooting MySQL/Windows and PORT.
 * -> If you use Windows with WAMP, you have to set a different port for NodeJS.
 * -> Basically, the NodeJS server is listening on port 8081 while WAMP is set on port 8080.
 * -> NodeJS will communicate with MySQL from WAMP.
 */
 
// Variables à grandes portées. (utilisées dans les controlleurs, les modèles et les fonctions)
colors = require('colors/safe'); // Permet de mettre des couleurs dans la fonction logServer.
url = require('url'); // Permet de récupérer l'URL
querystring = require('querystring'); // GET & POST
express = require('express'); // Framework Express -> Permet de créer le serveur rapidement, et intégrer un moteur de template
var session = require('express-session'); // Session avec express.
twig = require('twig'); // Les vues (/views) seront rendues avec le moteur de template TWIG.
img = require('serve-static'); // Charge le middleware qui permet d'intégrer les images.
bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
mysql = require('mysql'); // Charge MySQL pour NodeJS.
sql = require('./models/mysql'); // Définition des modèles et de la connexion.
app = express(); // Créer le serveur et le stock dans la variable "app".
app.use(session({secret: 'appnodejs'})) // Lancement de la session
urlencodedParser = bodyParser.urlencoded({ extended: false });

// Charge les images/CSS. (Les liens doivent être simplement le nom de l'image. ex : src="img.gif")
app.use(express.static(__dirname + '/views/img'));
app.use(express.static(__dirname + '/views/css'));

// Controlleurs (controllers).
var controllers = {anonymous:require('./controllers/anonymous'),
		   user:require('./controllers/user'),
		   unknow:require('./controllers/unknow')};

// Lancement du serveur.
app.listen(port);

// Ecrire la documentation (ENGLISH) sur la console.
console.log("\n");
console.log("****************************************\n* Server is launched on port "+port+" !\n****************************************\nDifferents colors :\n- "+colors.green('Green : HTTP Request succeed')+"\n- "+colors.red('Red : HTTP Request failed')+"\n- "+colors.cyan('Cyan : SQL Request done')+"\n- "+colors.yellow('Yellow : SQL Request returning NULL')+"\n****************************************\n");
