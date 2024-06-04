export interface ChartDataType {
    x: number,
    y:number
}

export interface LocationData {
    id: number,
    name: string,
    country: string,
    adminArea: string,
    lon: number,
    lat: number
}


export interface WeatherData {
    current: {
      time: string;
      symbol: string;
      symbolPhrase: string;
      temperature: number;
      feelsLikeTemp: number;
      relHumidity: number;
      dewPoint: number;
      windSpeed: number;
      windDirString: string;
      windGust: number;
      precipProb: number;
      precipRate: number;
      cloudiness: number;
      thunderProb: number;
      uvIndex: number;
      pressure: number;
      visibility: number;
    };
  }