import { RadioBrowserApi, StationSearchType } from 'radio-browser-api';

class CustomRadioBrowserApi extends RadioBrowserApi {
  constructor(appName, secure = true) {
    super(appName, secure);
    this.baseUrl = 'https://de1.api.radio-browser.info/json';
  }

  async getStationsByState(state) {
    const response = await fetch(`${this.baseUrl}/stations/bystate/${state}`);
    if (!response.ok) {
      throw new Error(`Error fetching stations: ${response.statusText}`);
    }
    return response.json();
  }
}

export { CustomRadioBrowserApi, StationSearchType };