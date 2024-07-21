import CloseApproach from './CloseApproach'
import Item from './Item'


export default interface ItemFull extends Item {
  links: {};
  neo_reference_id: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number; 
close_approach_data: CloseApproach[];
 is_sentry_object: boolean;
  km_moon: number;
  dateSort: string;
}