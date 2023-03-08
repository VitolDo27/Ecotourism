var displayPanel = {
	displayMarkerInfo: function (info) { },
	infoContainer: document.getElementById("infoContainer"),
	nameLabel: document.getElementById("nameInfoLabel"),
	descriptionLabel: document.getElementById("descriptionInfoLabel"),
	openSelectedPoint: document.getElementById("openSelectedPoint"),
	descriptionLengthLimit: 550
};

displayPanel.displayMarkerInfo = function (info) {
	console.log(info);
	displayPanel.infoContainer.style.display = 'flex';

	//displayPanel.nameLabel.innerText = info.name;
	//displayPanel.descriptionLabel.innerText = info.description;
	//displayPanel.scoreLabel.innerText = info.score;

	displayPanel.nameLabel.innerText = info.properties.NAME_RU;
	displayPanel.descriptionLabel.innerText = info.properties.DESCRIPTION.length > displayPanel.descriptionLengthLimit ?
		info.properties.DESCRIPTION.substring(0, displayPanel.descriptionLengthLimit) + "..." : info.properties.DESCRIPTION;
	displayPanel.openSelectedPoint.href = "/Home/point/" + info.properties.ID;
}
displayPanel.hide = function () {
	displayPanel.infoContainer.style.display = 'none';
}