var express = require('express');
//var config = require('./config');

var app = express();

var port = process.env.PORT || 3000;

app.get('/buildadministrator', function (req, res) {
 console.log(req.query.user);
 if(req.query.user != '' && req.query.project != '')
 {
		var GraphAPI = require('azure-graphapi');
	
		var graph = new GraphAPI(process.env.tenant, process.env.clientId, process.env.clientSecret);
		
		//create an extension property of SlackId
		
		/*find and return a particular user wiht slackid*/
		graph.get("users", function(err, users) 
		{
			if (!err) {
				//console.log(users);
				if(users)
				{
					var userFound = false;
					users.forEach(function(user) {
						var extensionpropslackid = "extension_" + process.env.extensionPropId + "_SlackId";
						console.log(extensionpropslackid);
						if(user[extensionpropslackid] == req.query.user)
						{
							console.log(user);
							userFound = true;	
							res.status(200);
							res.setHeader('Content-type','application/json');
							if(user['extension_' + process.env.extensionPropId + '_isbuildmaster'])
							{
								res.send(user['extension_' + process.env.extensionPropId + '_isbuildmaster']);
							}
							else
							{
								res.send('false');
							}
							//res.send(JSON.stringify(user));
							res.end();
						}
					}, this);
					
					if(userFound == false)
					{
						res.status(404);
					    res.setHeader('Content-type','application/json');
						res.write(JSON.stringify({'data':'User Not found with this SlackId.'}));
						res.end();
					}
				}
				else
				{
					res.status(404);
					res.setHeader('Content-type','application/json');
					res.write(JSON.stringify({'data':'User Not found with this SlackId.'}));
					res.end();
				}
			}
			if(err)
			{
				console.log(err);
				res.status(500);
				res.setHeader('Content-type','application/json');
				res.write(JSON.stringify({'data':err}));
				res.end();
			}
		});
 }
 else
 {
	res.status(500);
	res.setHeader('Content-type','application/json');
	res.write(JSON.stringify({'data':'SlackId variable not found in request.'}));
	res.end();
 }

});

app.listen(port, function () {
  console.log('SlackId Authenticator app listening on port 3000!');
});