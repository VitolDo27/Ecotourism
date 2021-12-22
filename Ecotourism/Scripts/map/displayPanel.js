var displayPanel = {
	displayMarkerInfo: function (info) { },
	infoContainer: document.getElementById("infoContainer"),
	nameLabel: document.getElementById("nameInfoLabel"),
	descriptionLabel: document.getElementById("descriptionInfoLabel"),
	scoreLabel: document.getElementById("scoreInfoLabel")
};

displayPanel.displayMarkerInfo = function (info) {
	console.log(info);
	displayPanel.infoContainer.style.display = 'block';

	//displayPanel.nameLabel.innerText = info.name;
	//displayPanel.descriptionLabel.innerText = info.description;
	//displayPanel.scoreLabel.innerText = info.score;

	displayPanel.nameLabel.innerText = info.properties.NAME_RU;
	displayPanel.descriptionLabel.innerText = info.properties.NAME_P_RU;
	displayPanel.scoreLabel.innerText = info.properties.ID;
}
displayPanel.hide = function () {
	displayPanel.infoContainer.style.display = 'none';
}