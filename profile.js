//Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

var https = require("https")

function printMessage(username, badgeCount, points){
	var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
	console.log(message);
}

function getProfile(username){
//Connect to API URL (http://teamtreehouse.com/username.json)
	var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response){
		var body = ""
		
		//Read the data

		response.on('data', function(chunk){
			body += chunk;
		})

		response.on("end", function(){ // When all the data has been received
			if (response.statusCode === 200) {
				try {
					var profile = JSON.parse(body)
					printMessage(username, profile.badges.length, profile.points.JavaScript)
				} catch(error) { 
					printError(error) // Parse Error
				}
			} else {
				printError({message: "There was an error getting the profile for " + username + ". (Error: " + response.statusCode + ")"}); //Status Code Error
			}
		})
	})

//Connection Error
	request.on("error", function(error){
		console.error(error.message)
	})
}

// Function to print error

function printError(error){
	console.error(error.message)
} 

module.exports.getProfile = getProfile;