let map = L.map('map', {zoomControl: false});

map.setView([40.71745436980805, -74.04151318447246], 8); // Over NYC

// 1
const esri_worldgraycanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
}).addTo(map);

// 2
const esri_worldterrain = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
	attribution: 'Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS',
}).addTo(map);

// 3
const esri_oceanbasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
	attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
}).addTo(map); 

// 4
const esri_natgeoworldmap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
}).addTo(map); 

// 5 
const opn_airports = L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
	maxZoom: 19,
    attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map); 

// 6 
const usgs_imagery = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 19,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
}).addTo(map); 

// 7 
const usgs_topo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 19,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
}).addTo(map);

// 8 
cartodb_darkmatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key={apikey}', {
	maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	apikey: 'cb1_4un8_1_dd5cdac360f4cf7dbd86bb4d'
}).addTo(map);

// 9 
cartodb_positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key={apikey}', {
	maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	apikey: 'cb1_4un8_1_dd5cdac360f4cf7dbd86bb4d'
}).addTo(map);

// 10 
cartodb_voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key={apikey}', {
	maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	apikey: 'cb1_4un8_1_dd5cdac360f4cf7dbd86bb4d'
}).addTo(map);

let layer_control = L.control.layers({
    'Esri: World Gray': esri_worldgraycanvas,
    'Esri: World Terrain': esri_worldterrain,
    'Esri: Ocean Basemap': esri_oceanbasemap,
    'Esri: National Geographic Basemap': esri_natgeoworldmap,
    'OPN: Airports': opn_airports,
    'USGS: World Imagery': usgs_imagery,
    'USGS: World Topography': usgs_topo,
    'CARTO DB: Dark Matter': cartodb_darkmatter,
    'CARTO DB: Positron': cartodb_positron,
    'CARTO DB: Voyager': cartodb_voyager
}).addTo(map);

let basemapinfo = L.control({position: 'bottomright'});

basemapinfo.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'basemapinfo');
    this._div.innerHTML = '<h4>Basemap Info</h4>';
    this.update('Map displaying common location information such as names, borders and transportation routes on a colorful backdrop that distinguishes features more clearly from one another. Can be accessed here: https://leaflet-extras.github.io/leaflet-providers/preview/index.html#filter=CartoDB.Voyager');
    return this._div;
};

basemapinfo.update = function(description) {
    this._div.innerHTML = '<h4>Basemap Info</h4><p>' + description;
};

map.on('baselayerchange', function(e) {
    if (e.name === 'Esri: World Gray') {
        basemapinfo.update('Grey map featuring labels and land features. Can be accessed here: https://leaflet-extras.github.io/leaflet-providers/preview/index.html#filter=Esri.WorldGrayCanvas.');
    } else if (e.name === 'Esri: World Terrain') {
        basemapinfo.update('Map featuring topographic details. Can be accessed here: https://leaflet-extras.github.io/leaflet-providers/preview/index.html#filter=Esri.WorldTerrain');
    } else if (e.name === 'Esri: Ocean Basemap') {
        basemapinfo.update('Map featuring high detail rendering of the ocean floor. can be accessed here: https://leaflet-extras.github.io/leaflet-providers/preview/index.html#filter=Esri.OceanBasemap');
    } else if (e.name === 'Esri: National Geographic Basemap') {
        basemapinfo.update('Map featuring labels for cities, states and countries along with drawn borders and transportation routes. Can be accessed here: https://leaflet-extras.github.io/leaflet-providers/preview/index.html#filter=Esri.NatGeoWorldMap');
    } else if (e.name === 'OPN: Airports') {
        basemapinfo.update('Map showcasing transportation systems including airports plus location labels. Can be accessed here: https://leaflet-extras.github.io/leaflet-providers/preview/index.html#filter=OPNVKarte');
    } else if (e.name === 'USGS: World Imagery') {
        basemapinfo.update('Map showcasing high quality imagery. Can be accessed here: https://leaflet-extras.github.io/leaflet-providers/preview/index.html#filter=USGS.USImagery');
    } else if (e.name === 'USGS: World Topography') {
        basemapinfo.update('Map showcasing US topography from the USGS. Can be accessed here: https://leaflet-extras.github.io/leaflet-providers/preview/index.html#filter=USGS.USTopo');
    } else if (e.name === 'CARTO DB: Dark Matter') {
        basemapinfo.update('Map displaying spatial information on a dark color pallete. Can be accessed here: https://leaflet-extras.github.io/leaflet-providers/preview/index.html#filter=CartoDB.DarkMatter');
    } else if (e.name === 'CARTO DB: Positron') {
        basemapinfo.update('Map displaying common location information such as names, borders and transportation routes on a light backdrop. Can be accessed here: https://leaflet-extras.github.io/leaflet-providers/preview/index.html#filter=CartoDB.Positron');
    } else if (e.name === 'CARTO DB: Voyager') {
        basemapinfo.update('Map displaying common location information such as names, borders and transportation routes on a colorful backdrop that distinguishes features more clearly from one another. Can be accessed here: https://leaflet-extras.github.io/leaflet-providers/preview/index.html#filter=CartoDB.Voyager');
    }
});

basemapinfo.addTo(map);
