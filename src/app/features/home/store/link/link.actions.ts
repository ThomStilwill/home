import { createActionGroup, props } from '@ngrx/store';
import { Link } from './link.model';
import { WeatherStation } from './weather.model';

export const LinkActions = createActionGroup({
    source: "Home",
    events: {
        'LoadLinks' : props<{loading: string}>(),
        'LoadLinksSuccess' : props<{links: Link[]}>(),
        'LoadLinksFailure': props<{error: Error}>(),
        'AddLink' : props<{Link: Link}>(),
        'AddLinksuccess' : props<{Link: Link}>(),
        'AddLinkFailure' : props<{error: Error}>(),
        'DeleteLink' : props<{id: string}>(),
        'DeleteLinksuccess' : props<{id: string}>(),
        'DeleteLinkFailure' : props<{error: Error}>(),
        'LoadWeather' : props<{loading: string}>(),
        'LoadWeatherSuccess' : props<{loading: string, stations: WeatherStation[]}>(),
        'LoadWeatherFailure': props<{loading: string , error: Error}>(),
    }
})
