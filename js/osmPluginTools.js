var osmPluginTools = {
	init: function () { },
	onPointCreated: createEvent(),
	onFigureFinished: createEvent()
};

osmPluginTools.init = function () {
	// while drawing, new points will be apprearing in the creation layer
	// after drawing all created points will be copied to the vector or marker layer
	let map = osmPlugin.map;
	var layer = new OpenLayers.Layer.Vector("Creation");
	osmPlugin.map.addLayer(layer);
	var pointerLayer = new OpenLayers.Layer.Vector("Pointer");
	osmPlugin.map.addLayer(pointerLayer);
	osmPlugin.addPoint(0, 0, pointerLayer);
	osmPluginTools.pointerLayer = pointerLayer;
	let pointer = pointerLayer.features[0];
	pointer.geometry.bounds.left = -20000000;
	pointer.geometry.bounds.right = 20000000;
	pointer.geometry.bounds.top = 20000000;
	pointer.geometry.bounds.bottom = -20000000;
	console.log(pointer);
	let modes = {
		point: {
			length: 1
		},
		line: {
			length: 2
		},
		polygon: {
			length: 0,
			minLength: 3, // not implemented yet
			closeFigure: true
		},
		polyline: {
			length: 0,
			minLength: 2
		}
	};

	let activeMode = null;
	let lastScreenPosition = { x: 0, y: 0 };
	let currentPoints = [];

	let container = document.getElementById('drawContainer');
	for (let mode in modes) {
		let button = document.createElement('button');
		button.id = mode + 'DrawButton';
		button.innerText = 'Draw ' + mode;
		container.appendChild(button);

		button.onclick = function () {
			if (activeMode === modes[mode])
				setMode(null);
			else
				setMode(modes[mode]);
		};
	}

	function setMode(mode) {
		layer.destroyFeatures();
		currentPoints.length = 0;

		activeMode = mode;
		layer.redraw();

		for (let mode in modes) {
			let button = document.getElementById(mode + 'DrawButton');

			button.style.backgroundColor = modes[mode] === activeMode ? 'gray' : 'white';
		}

		if (!mode) {
			pointer.geometry.x = NaN;
			pointerLayer.redraw();
		}
	}
	map.events.register("mousemove", map, function (e) {
		if (!activeMode)
			return;
		let pos = osmPlugin.getMousePosition();
		//console.log(pos);
		pointer.geometry.x = pos.x;
		pointer.geometry.y = pos.y;
		pointerLayer.redraw();
	});
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	map.events.register("mouseup", map, async function (e) {
		let position = osmPlugin.getMousePosition();
		while (isNaN(position.x) || isNaN(position.y)) {
			await sleep(10);
			position = osmPlugin.getMousePosition();
		}
		if (!activeMode || osmPlugin.selectMode || e.x === lastScreenPosition.x && e.y === lastScreenPosition.y)
			return;
		lastScreenPosition.x = e.x;
		lastScreenPosition.y = e.y;

		currentPoints.push(position);
		osmPlugin.addPoint(position.x, position.y, layer);
		osmPluginTools.onPointCreated({
			lon: position.x,
			lat: position.y,
			x: (position.x - osmPlugin.center.lon) / osmPlugin.coordFactor,
			y: (position.y - osmPlugin.center.lat) / osmPlugin.coordFactor
		});
		//console.log('[PointCreated]: lon: ' + position.x + ', lat: ' + position.y);
		//console.log('[PointCreated]: x: ' + (position.x - osmPlugin.center.lon) / osmPlugin.coordFactor + ', y: ' + (position.y - osmPlugin.center.lat) / osmPlugin.coordFactor);

		//console.log(activeMode.length);
		//console.log(currentPoints.length);

		if (activeMode.length && currentPoints.length >= activeMode.length
			|| !activeMode.length && e.button === 2) {
			for (let i = 0; i < currentPoints.length; i++) {
				osmPlugin.addPoint(currentPoints[i].x, currentPoints[i].y);
				if (i > 0) {
					osmPlugin.addLine(currentPoints[i].x, currentPoints[i].y, currentPoints[i-1].x, currentPoints[i-1].y);
				}
			}
			if (activeMode.closeFigure) {
				osmPlugin.addLine(currentPoints[0].x, currentPoints[0].y,
					currentPoints[currentPoints.length - 1].x,
					currentPoints[currentPoints.length - 1].y);
			}

			setMode(activeMode);
		}
	});
};

osmPlugin.onInit.add(osmPluginTools.init);