var osmPlugin = {
	init: function () { },
	onInit: createEvent(),
	onSwitchMode: createEvent()
};

osmPlugin.init = function () {

	var map = new OpenLayers.Map("demoMap");
	map.addLayer(new OpenLayers.Layer.OSM());
	osmPlugin.map = map;
	//map.zoomToMaxExtent();
	osmPlugin.center = new OpenLayers.LonLat(9568151.4444175, 9360237.2577181);//new OpenLayers.LonLat(8168151.4444175, 7360237.2577181);
	osmPlugin.center = osmPlugin.center;

	var zoom = 3;
	map.setCenter(osmPlugin.center, zoom);

	var markers = new OpenLayers.Layer.Markers("Markers");
	map.addLayer(markers);
	var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
	map.addLayer(vectorLayer);
	osmPlugin.markers = markers;


	//document.getElementById('OpenLayers_Map_2_OpenLayers_ViewPort').style.pointerEvents = 'none';
	//document.getElementById('OpenLayers_Control_Zoom_5').style.pointerEvents = 'all';
	document.getElementById('OpenLayers_Map_2_OpenLayers_ViewPort').appendChild(document.getElementById('infoContainer'));
	

	// Markers
	var size = new OpenLayers.Size(30, 30);
	var offset = new OpenLayers.Pixel(-(size.w / 2), -(size.h / 2));
	//var icon = new OpenLayers.Icon(iconData, size, offset);
	//markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(0, 0), icon));

	// Vector
	function addPoint(x, y, optionalLayer, info) {
		var feature = new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.Point(x, y)
		);
		feature.info = info;
		if (optionalLayer)
			optionalLayer.addFeatures(feature);
		else
			vectorLayer.addFeatures(feature);
	}
	function addLine(x1, y1, x2, y2, optionalLayer) {
		var feature = new OpenLayers.Feature.Vector(
			new OpenLayers.Geometry.LineString([
				new OpenLayers.Geometry.Point(x1, y1),
				new OpenLayers.Geometry.Point(x2, y2)
			])
		);

		if (optionalLayer)
			optionalLayer.addFeatures(feature);
		else
			vectorLayer.addFeatures(feature);
	}
	osmPlugin.addPoint = addPoint;
	osmPlugin.addLine = addLine;


	let drawControls = {
		point: new OpenLayers.Control.DrawFeature(
			vectorLayer, OpenLayers.Handler.Point
		),
		line: new OpenLayers.Control.DrawFeature(
			vectorLayer, OpenLayers.Handler.Path
		),
		polygon: new OpenLayers.Control.DrawFeature(
			vectorLayer, OpenLayers.Handler.Polygon
		),
		select: new OpenLayers.Control.SelectFeature(
			vectorLayer,
			{
				clickout: false, toggle: false,
				multiple: false, hover: false,
				//toggleKey: "ctrlKey", // ctrl key removes from selection
				//multipleKey: "shiftKey", // shift key adds to selection
				box: false
			}
		),
		selecthover: new OpenLayers.Control.SelectFeature(
			vectorLayer,
			{
				multiple: false, hover: true,
				//toggleKey: "ctrlKey", // ctrl key removes from selection
				//multipleKey: "shiftKey" // shift key adds to selection
			}
		)
	};
	osmPlugin.drawControls = drawControls;

	for (var key in drawControls) {
		map.addControl(drawControls[key]);
	}

	osmPlugin.selectMode = false;

	//window.onkeydown = function (e) {
	//	if (e.key === 'Control') {
	//		drawControls.select.activate();
	//		osmPlugin.selectMode = true;
	//	}
	//};

	//window.onkeyup = function (e) {
	//	if (e.key === 'Control') {
	//		drawControls.select.deactivate();
	//		osmPlugin.selectMode = false;
	//	}
	//};
	let mousePositionControl = new OpenLayers.Control.MousePosition({
		prefix: '',
		separator: '|',
		numDigits: 6,
		emptyString: 'Mouse is not over map.'
	});
	osmPlugin.mousePositionControl = mousePositionControl;
	map.addControl(
		mousePositionControl
	);
	let mousePositionDiv = mousePositionControl.div;
	mousePositionDiv.style.display = 'none';

	function getMousePosition() {
		let posText = mousePositionDiv.innerText.split('|');
		return {
			x: Number(posText[0]),
			y: Number(posText[1])
		};
	}
	osmPlugin.getMousePosition = getMousePosition;

	osmPlugin.onInit();
	

	osmPlugin.drawControls.select.onSelect = function (object) {
		if (object.info !== undefined) {
			//for (let i = 0; i < markers.markers.length; i++) {
			//	let marker = markers.markers[i];
			//	if (marker.markerId === object.markerId) {
			//		console.log(marker);
			//		marker.icon = marker.selectedIcon;
			//	}
			//}
			console.log('[NodeSelected]: id: ' + object.markerId + ', lon: ' + object.geometry.x + ', lat: ' + object.geometry.y);

			displayPanel.displayMarkerInfo(object.info);
		}
	};

	// marker box selection
	//let selectionStart;
	
	//map.events.register("mousedown", map, function (e) {
	//	console.log(selectMode);
	//	if (!selectMode)
	//		return;
	//	selectionStart = getMousePosition();
	//});
	//map.events.register("mouseup", map, function (e) {
	//	console.log(selectMode);
	//	console.log(selectionStart);
	//	if (!selectMode || !selectionStart)
	//		return;
	//	let selectionEnd = getMousePosition();

	//	let min = {
	//		x: Math.min(selectionStart.x, selectionEnd.x),
	//		y: Math.min(selectionStart.y, selectionEnd.y)
	//	};

	//	let max = {
	//		x: Math.max(selectionStart.x, selectionEnd.x),
	//		y: Math.max(selectionStart.y, selectionEnd.y)
	//	};

	//	for (let i = 0; i < markers.markers.length; i++) {
	//		let lonlat = markers.markers[i].lonlat;
	//		if (lonlat.x > min.x && lonlat.x < max.x && lonlat.y > min.y && lonlat.y < max.y) {
	//			markers.markers[i].icon = markers.markers[i].selectedIcon;
	//			console.log('selected');
	//		}
	//		else {
	//			markers.markers[i].icon = markers.markers[i].baseIcon;
	//			console.log('unselected');
	//		}
	//	}
	//	selectionStart = null;
	//});
};
function createEvent() {
	let event = function (e) {
		for (let i = 0; i < event.listeners.length; i++) {
			event.listeners[i](e);
		}
	};
	event.listeners = [];
	event.add = function (listener) {
		event.listeners.push(listener);
	};
	return event;
}