export interface Meters {
  estimated_diameter_min: number
}
export interface Aster {
  meters: Meters
}
export default interface Item {
  id: number;
  name: string;
  danger: number;
  idView: number;
  dangerView: string;
  diameterView: number;
  result_distance: number;
  dateReq: string;
  estimated_diameter: Aster;
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };
  close_approach_date: string;
  epoch_date_close_approach: number;
orbiting_body:string;
is_potentially_hazardous_asteroid: boolean;
}