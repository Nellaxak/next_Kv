import CloseApproach from '@/types/CloseApproach'

export interface Meters {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
}
export interface Aster {
  meters: Meters;
  kilometers:Meters;
  miles:Meters;
  feet:Meters;
}

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
  //close_approach_date: string;
  //epoch_date_close_approach: number;
//orbiting_body:string;
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