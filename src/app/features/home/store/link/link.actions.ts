import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Link } from './link.model';
import { WeatherStation } from './weather.model';
import { LinkBase } from '../models/linkbase.model';

export const LinkActions = createActionGroup({
    source: "Home",
    events: {
        'LoadLinks' : emptyProps(),
        'LoadLinksSuccess' : props<{links: Link[]}>(),
        'LoadLinksFailure': props<{error: Error}>(),

        'LoadWeather' : emptyProps(),
        'LoadWeatherSuccess' : props<{stations: WeatherStation[]}>(),
        'LoadWeatherFailure': props<{error: Error}>(),

        'AddLink' : props<{Link: Link}>(),
        'AddLinksuccess' : props<{Link: Link}>(),
        'AddLinkFailure' : props<{error: Error}>(),
        'DeleteLink' : props<{id: string}>(),
        'DeleteLinksuccess' : props<{id: string}>(),
        'DeleteLinkFailure' : props<{error: Error}>(),
                
    }
})
