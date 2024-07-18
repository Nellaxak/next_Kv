import RelativeVelocity from '@/types/RelativeVelocity'
import MissDistance from '@/types/MissDistance'

export default interface ListDetail{
close_approach_date: string,
      close_approach_date_full: string,
      epoch_date_close_approach: number,
      relative_velocity: RelativeVelocity,
      miss_distance: MissDistance,
      orbiting_body: string
}
