import RelativeVelocity from './RelativeVelocity'
import Aster from './Aster'

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
  relative_velocity: RelativeVelocity;
  close_approach_date: string;
  epoch_date_close_approach: number;
orbiting_body:string;
is_potentially_hazardous_asteroid: boolean;
}