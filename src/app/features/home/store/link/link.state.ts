import { Link } from "./link.model";
import { WeatherStation } from "./weather.model";

export interface LinkState {
  links: Link[];
  stations: WeatherStation[];
  error: any;
}
