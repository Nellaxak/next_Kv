import CloseApproach from './CloseApproach'
import Aster from './Aster'

export default interface ItemFull {
  links: {};
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number; 
  estimated_diameter: Aster;
is_potentially_hazardous_asteroid: boolean;
close_approach_data: CloseApproach[];
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };
 is_sentry_object: boolean;
 danger: number;
  idView: number;
  dangerView: string;
  diameterView: number;
  result_distance: number;
  dateReq: string;
  km_moon: number;
  dateSort: string;
}