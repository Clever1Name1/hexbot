if (controllers.isRegularGamePage){
	controllers.functions = {}

	controllers.functions.hidePanel = function(){
		views.hideControlPanel()
		var content = controllers.bot.controlPanel
		content.isHidden = true
		controllers.storage.set(controllers.bot)
	}

	controllers.functions.showPanel = function(){
		views.switchToMainScreen()
		views.showControlPanel()
		var content = controllers.bot.controlPanel
		content.isHidden = false
		controllers.storage.set(controllers.bot)
	}

	controllers.functions.executeSequence = function(moduleName, sequenceName){
		controllers.functions.hidePanel()
		var sequence = new Sequence(moduleName, sequenceName)
		controllers.bot.currentSequence = sequence
		controllers.storage.set(controllers.bot)
		var currentSequence = $jSpaghetti.module(moduleName).sequence(sequenceName)
		currentSequence.run()
		currentSequence.events.addEventListener("terminated", function(){
			controllers.functions.resetBotAndShowPanel()
		})
	}

	controllers.functions.filterCrawlerOutput = function(regex){
		if (regex == "") regex = "^.*$"
		var lines = controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT]
		try{
			var pattern = new RegExp(regex, "gmi")
			var newContent = lines.match(pattern)
			if (newContent){
				document.getElementById(FIELD_IP_SEARCH_RESULT).value = newContent.join("\n")
			} else {
				document.getElementById(FIELD_IP_SEARCH_RESULT).value = ""
			}
			
		}catch(error){
			document.getElementById(FIELD_IP_SEARCH_RESULT).value = "Invalid regex (see https://en.wikipedia.org/wiki/Regular_expression)"
		}
	}

	controllers.functions.resetBotAndShowPanel = function (){
		if (controllers.bot.currentSequence != null){
			var moduleName = controllers.bot.currentSequence.moduleName
			var sequenceName = controllers.bot.currentSequence.sequenceName
			$jSpaghetti.module(moduleName).sequence(sequenceName).reset()
		}
		controllers.bot.currentSequence = null
		controllers.bot.controlPanel.isHidden = false
		controllers.storage.set(controllers.bot)
		controllers.functions.showPanel()
	}

	controllers.functions.checkUploadSoftwareFields = function (){
		var uploadModeCheckbox = document.getElementById(SET_UPLOAD_MODE)
		var fieldSoftwares = document.getElementById(FIELD_SOFTWARES_TO_INSTALL)
		var fieldTimeLimit = document.getElementById(SET_TIME_LIMIT) 
		if (uploadModeCheckbox.checked){
			fieldSoftwares.disabled = false
			fieldTimeLimit.disabled = false
		} else {
			fieldSoftwares.disabled = true
			fieldTimeLimit.disabled = true
		}
	}

	controllers.functions.checkIgnoreIPsField = function (){
		var checkbox = document.getElementById(SET_IGNORE_LIST)
		var field = document.getElementById(FIELD_HOSTS_TO_IGNORE)
		if (checkbox.checked){
			field.disabled = false
		} else {
			field.disabled = true
		}
	}

	controllers.functions.checkSignatureField = function (){
		var signatureCheckbox = document.getElementById(SET_SIGNATURE)
		var signatureField = document.getElementById(FIELD_SIGNATURE) 
		if (signatureCheckbox.checked){
			signatureField.style.display = "block"
		} else {
			signatureField.style.display = "none"
		}
	}
}
	