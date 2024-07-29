export interface RemoteSearchResultItem {
  name: string;
  state: string;
  country: string;
  lon: number;
  lat: number;
  local_names: {
    [key: string]: string;
  };
}

const countryMap = {
  AU: "Australia",
  US: "United States",
  GB: "United Kingdom",
};

export class SearchResultItemType {
  private readonly _city: string;
  private readonly _state: string;
  private readonly _country: string;
  private readonly _lat: number;
  private readonly _lon: number;
  constructor(item: RemoteSearchResultItem) {
    this._city = item.name;
    this._state = item.state;
    this._country = item.country;
    this._lat = item.lat;
    this._lon = item.lon;
  }

  get city() {
    return this._city;
  }
  get state() {
    return this._state;
  }
  get country() {
    return countryMap[this._country] || this._country;
  }
  get latitude() {
    return this._lat;
  }
  get longitude() {
    return this._lon;
  }
}
