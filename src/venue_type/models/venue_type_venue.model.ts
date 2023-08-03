import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Venue } from '../../venue/models/venue.model';
import { VenueType } from './venue_type.model';

interface VenueTypeVenueAttribute {
  venueId: number;
  venueTypeId: number;
}

@Table({ tableName: 'venue_type_venue' })
export class VenueTypeVenue extends Model<
  VenueTypeVenue,
  VenueTypeVenueAttribute
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Venue)
  @Column({
    type: DataType.INTEGER,
  })
  venueId: number;

  @ForeignKey(() => VenueType)
  @Column({
    type: DataType.INTEGER,
  })
  venueTypeId: number;
}
