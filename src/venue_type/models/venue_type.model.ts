import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Venue } from '../../venue/models/venue.model';
import { VenueTypeVenue } from './venue_type_venue.model';

interface VenueTypeAttribute {
  name: string;
}

@Table({ tableName: 'venue-type' })
export class VenueType extends Model<VenueType, VenueTypeAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Venue, () => VenueTypeVenue)
  venues: Venue[];
}
