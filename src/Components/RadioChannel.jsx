import React, { useState, useEffect } from 'react'
import { RadioBrowserApi, StationSearchType } from 'radio-browser-api'
import Radio from './Radio'
import EndBar from './EndBar'


const RadioChannel = () => {
  const [isRadioLoaded, setIsRadioLoaded] = useState(false);
  const [stations, setStations] = useState([]);


  useEffect(() => {
    const fetchStations = async () => {
      const api = new RadioBrowserApi('My Radio App', true);

      try {
        const response = await api.getStationsBy(StationSearchType.byState, 'Ontario');
        
        const limitedStations = response.slice(0, 3);
        console.log('Fetched stations:', limitedStations);

        setStations(limitedStations.map(station => ({
            name: station.name || 'Unknown Station',
            url: station.url.replace('http://', 'https://') || ''
        })));
        
      } catch (error) {
        console.error('Error fetching radio stations:', error);
      }
    };

    fetchStations();
  }, []);

  const playStation = (url) => {
    // Function to play the radio station using the URL
    console.log('Playing station:', url);
    // You can use an audio player library or HTML5 audio element to play the station
  };

  const handleRadioLoad = () => {
    setIsRadioLoaded(true);
  };

  return (
    <div>
        {stations.length > 0 ? (
          <>
            <Radio stations={stations} onLoad={handleRadioLoad}/>
            {isRadioLoaded && 
                <EndBar />
            }
          </>
      ) : (
        <p>Loading stations...</p>
      )}
    </div>
  );
}

export default RadioChannel