var foo = $jSpaghetti.module("webcrawler").sequence("browseWeb")

foo.instructions = [
	{"@init": 						["startSearching", {"gotoif":["!*.$", "@finishProcess"]}]},
	{"@goToNextTarget": 			["logout", {"gotoif": ["*.openList.length == 0", "@finishProcess"]}, "goToNextIp", "isThereMessageError", {"gotoif": ["*.$", "@accountInaccessibleHost"]}, "ipDoesNotExist", {"gotoif": ["*.$", "@accountInaccessibleHost"]}]},
	{"@tryToInvadeTarget": 			["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessKnownTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@accountInaccessibleHost"]}, {"wait":"_forPageToReload"}]},
	{"@accessKnownTarget": 			"signInTarget"},
	{"@analyseTargetIps": 			["accountClanServer", {"gotoif": ["*.isClanServer","@getSoftwares"]}, "cleanMyIpClues", "getIpsFromLogs", "getBTCAccounts", "getShoppingLogs", "updateCrawlerLogs", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@getSoftwares"]}, {"wait": "_forPageToReload"}]},
	{"@getSoftwares": 				[{"gotoif":["!*.getSoftwareMode", "@cleanMyOwnLogs"]}, "goToTargetSoftwares", "getSoftwares", "updateCrawlerLogs"]},
	{"@cleanMyOwnLogs": 			[{"gotoif": ["((*.accessCounter < 5) && (*.openList.length > 0))", "@goToNextTarget"]}, "resetAccessCounter", "goToOwnLogTab", "cleanTextAreaContent", "isThereMessageError", {"gotoif":["*.$", "@goToNextTarget"]}, {"wait": "_forPageToReload"}, {"gotoif": ["true", "@goToNextTarget"]}]},
	{"@accountInaccessibleHost": 	["registerInaccessible", "updateCrawlerLogs", {"gotoif": ["true", "@goToNextTarget"]}]},
	{"@finishProcess": 				"_exit"},
]
