import React, { useEffect, useRef, useState } from 'react';
import { haversineDistanceKm } from '../../utils/geo';
import { officeBranches } from '../../data/officeBranches';

// Inline SVG for an office icon -> used as a data URL for Marker icon
const officeSVG = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
    <path fill="#1f2937" d="M4 3h10a1 1 0 0 1 1 1v16h3v2H3v-2h3V4a1 1 0 0 1 1-1zm3 3h2v2H7V6zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm4-8h2v2h-2V6zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
  </svg>
`);

const loaderId = 'gmaps-script';
const defaultCenter = { lat: 17.4243, lng: 78.4332 }; // Hyderabad

const BranchLocator = () => {
  // Put your API key here (only key, no Map ID required)
  const GOOGLE_MAPS_API_KEY = 'AIzaSyCdUKj-j6A5yysU6wwkSfZF-2y-77qXofk';

  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const mapInstance = useRef(null);
  const userMarker = useRef(null);
  const branchMarkers = useRef([]);

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [userAddress, setUserAddress] = useState('');

  // Load script once
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'AIzaSyBjdQgvcSwIvyZgPgsjIiorsBDg-bff5DI') {
      setMessage('Please set a valid Google Maps API key in BranchLocator.jsx');
      setIsError(true);
      return;
    }
    if (document.getElementById(loaderId)) return;

    const s = document.createElement('script');
    s.id = loaderId;
    s.async = true;
    s.defer = true;
    s.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    s.onerror = () => {
      setMessage('Failed to load Google Maps script. Check your API key and network.');
      setIsError(true);
    };
    s.onload = () => initMap();
    document.head.appendChild(s);

    // If already loaded (hot reload), initialize immediately
    if (window.google && window.google.maps && window.google.maps.places) initMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GOOGLE_MAPS_API_KEY]);

  // Initialize map and autocomplete
  const initMap = () => {
    try {
      if (!mapRef.current) return;

      const mapOptions = {
        center: defaultCenter,
        zoom: 12,
        // Make sure zoom controls show up
        zoomControl: true,
        fullscreenControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        gestureHandling: 'greedy',
      };
      mapInstance.current = new window.google.maps.Map(mapRef.current, mapOptions);

      // Styled search bar above the map (outside of Map controls)
      // Autocomplete must bind to an input that is visible in the DOM
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        fields: ['geometry', 'formatted_address', 'name', 'place_id'],
      });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place?.geometry) return;
        const coords = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setUserAddress(place.formatted_address || place.name || '');
        updateUserAndBranches(coords);
      });

      // Try geolocation initially
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setUserAddress('Your Current Location');
            updateUserAndBranches(coords);
          },
          () => {
            setMessage('Unable to fetch geolocation; search or click the map.');
            setIsError(false);
          }
        );
      } else {
        setMessage('Geolocation is not supported by your browser.');
        setIsError(true);
      }

      // Click to pin a location
      mapInstance.current.addListener('click', (e) => {
        const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        setUserAddress(`Pinned @ ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`);
        updateUserAndBranches(coords);
      });
    } catch (e) {
      setMessage('Failed to initialize map.',e);
      setIsError(true);
    }
  };

  // Update the user marker and branch markers
  const updateUserAndBranches = (coords) => {
    const map = mapInstance.current;
    if (!map) return;

    // Clear existing branch markers
    branchMarkers.current.forEach((m) => m.setMap(null));
    branchMarkers.current = [];

    // Create/update user marker (standard Marker, no Map ID required)
    if (!userMarker.current) {
      userMarker.current = new window.google.maps.Marker({
        position: coords,
        map,
        title: 'Your Location',
      });
    } else {
      userMarker.current.setPosition(coords);
    }

    // Center + zoom
    map.setCenter(coords);
    map.setZoom(13);

    // Find branches within 5 km
    const radiusKm = 5;
    const close = officeBranches.filter((b) => {
      const d = haversineDistanceKm(coords, b.position);
      return d <= radiusKm;
    });

    // Add office markers (custom SVG icon)
    const icon = {
      url: `data:image/svg+xml;charset=UTF-8,${officeSVG}`,
      scaledSize: new window.google.maps.Size(28, 28),
      anchor: new window.google.maps.Point(14, 14),
    };

    close.forEach((b) => {
      const m = new window.google.maps.Marker({
        position: b.position,
        map,
        title: b.name,
        icon,
      });
      branchMarkers.current.push(m);
    });

    if (close.length > 0) {
      setMessage(`Found ${close.length} office branch(es) within ${radiusKm} km.`);
      setIsError(false);
    } else {
      setMessage('No office branches found within 5 km of your location.');
      setIsError(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 font-inter">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-5xl flex flex-col space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800">Branch Locator</h1>

        {/* Styled search bar */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-gray-200 focus-within:border-blue-500 bg-gray-50">
            <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-500">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20l-5.99-6zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search address or place"
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
            />
          </div>
          {message && (
            <div className={`text-center py-2 px-4 text-sm font-medium rounded-md ${isError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {message} {userAddress ? `(${userAddress})` : ''}
            </div>
          )}
        </div>

        {/* Map container */}
        <div ref={mapRef} className="rounded-xl shadow-md" style={{ height: '520px', width: '100%' }} />
      </div>
    </div>
  );
};

export default BranchLocator;
