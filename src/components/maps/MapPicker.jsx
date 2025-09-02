// // src/components/maps/MapPicker.jsx
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   MapControl,
//   ControlPosition,
//   useMapsLibrary,
//   useAdvancedMarkerRef,
//   useMap
// } from '@vis.gl/react-google-maps';

// const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
// const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

// const MapUpdater = ({ place, marker }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (!map || !place) return;
//     const loc = place.geometry?.location;
//     const viewport = place.geometry?.viewport;
//     if (viewport) map.fitBounds(viewport);
//     else if (loc) { map.setCenter(loc); map.setZoom(16); }
//   }, [map, place]);
//   useEffect(() => {
//     if (!marker || !place?.geometry?.location) return;
//     marker.position = place.geometry.location;
//   }, [marker, place]);
//   return null;
// };

// const PlaceAutocomplete = ({ onSelect }) => {
//   const places = useMapsLibrary('places');
//   const inputRef = useRef(null);
//   const [ac, setAc] = useState(null);

//   useEffect(() => {
//     if (!places || !inputRef.current) return;
//     const options = { fields: ['geometry', 'name', 'formatted_address', 'place_id'] };
//     setAc(new places.Autocomplete(inputRef.current, options));
//   }, [places]);

//   useEffect(() => {
//     if (!ac) return;
//     const listener = ac.addListener('place_changed', () => onSelect(ac.getPlace() || null));
//     return () => listener.remove();
//   }, [ac, onSelect]);

//   return (
//     <input
//       ref={inputRef}
//       placeholder="Search places..."
//       className="w-80 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
//     />
//   );
// };

// const MapPicker = ({
//   defaultCenter = { lat: 17.4243, lng: 78.4332 },
//   onPicked,
//   radiusKm = 5
// }) => {
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const [markerRef, marker] = useAdvancedMarkerRef();
//   const [center, setCenter] = useState(defaultCenter);
//   const [zoom, setZoom] = useState(12);

//   const onMapClick = useCallback((e) => {
//     const latLng = e.detail?.latLng || e.latLng;
//     if (!latLng) return;
//     const lat = latLng.lat?.() ?? latLng.lat;
//     const lng = latLng.lng?.() ?? latLng.lng;
//     setSelectedPlace({
//       geometry: { location: { lat, lng } },
//       name: `Pinned @ ${lat.toFixed(5)}, ${lng.toFixed(5)}`,
//       formatted_address: '',
//       place_id: `manual-${Date.now()}`
//     });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlace) return;
//     const loc = selectedPlace.geometry?.location;
//     if (!loc) return;
//     const lat = loc.lat?.() ?? loc.lat;
//     const lng = loc.lng?.() ?? loc.lng;
//     setCenter({ lat, lng });
//     setZoom(15);
//   }, [selectedPlace]);

//   const savePicked = () => {
//     if (!selectedPlace) return;
//     const loc = selectedPlace.geometry?.location;
//     if (!loc) return;
//     const payload = {
//       placeId: selectedPlace.place_id || null,
//       name: selectedPlace.name || 'Selected Place',
//       address: selectedPlace.formatted_address || '',
//       lat: loc.lat?.() ?? loc.lat,
//       lng: loc.lng?.() ?? loc.lng
//     };
//     onPicked && onPicked(payload);
//   };

//   if (!API_KEY) {
//     return <div className="p-4 text-red-600">Missing VITE_GOOGLE_MAPS_API_KEY in .env (restart dev server).</div>;
//   }
//   if (!MAP_ID) {
//     return <div className="p-4 text-red-600">Missing VITE_GOOGLE_MAPS_MAP_ID in .env (restart dev server).</div>;
//   }

//   return (
//     <APIProvider apiKey={API_KEY}>
//       <div className="relative">
//         <Map
//           mapId={MAP_ID}               // REQUIRED for Advanced Marker
//           center={center}
//           zoom={zoom}
//           disableDefaultUI={false}
//           zoomControl={true}
//           fullscreenControl={true}
//           streetViewControl={false}
//           gestureHandling="greedy"
//           style={{ width: '100%', height: 500, borderRadius: 12 }}
//           onClick={onMapClick}
//         >
//           <AdvancedMarker ref={markerRef} position={selectedPlace?.geometry?.location || center} />

//           <MapControl position={ControlPosition.TOP_LEFT}>
//             <div className="m-3 flex gap-2 items-center">
//               <PlaceAutocomplete onSelect={setSelectedPlace} />
//               <button
//                 type="button"
//                 onClick={savePicked}
//                 className="px-3 py-2 rounded bg-blue-600 text-white"
//                 disabled={!selectedPlace}
//               >
//                 Save Location
//               </button>
//             </div>
//           </MapControl>
    
//           <MapUpdater place={selectedPlace} marker={marker} />
//         </Map>
//       </div>
//     </APIProvider>
//   );
// };

// export default MapPicker;
