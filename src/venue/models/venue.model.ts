import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { VenuePhoto } from '../../venue_photo/models/venue_photo.model';
import { VenueType } from '../../venue_type/models/venue_type.model';
import { VenueTypeVenue } from '../../venue_type/models/venue_type_venue.model';

interface VenueAttribute {
  name: string;
  address: string;
  location: string;
  site: string;
  phone: string;
  // venueTypeId: number;
  schema: string;
  regionId: number;
  districtId: number;
}

@Table({ tableName: 'venue' })
export class Venue extends Model<Venue, VenueAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.STRING,
  })
  site: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  // @ForeignKey(() => VenueType)
  // @Column({
  //   type: DataType.INTEGER,
  // })
  // venueTypeId: number;

  @Column({
    type: DataType.STRING,
  })
  schema: string;

  // @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  regionId: number;

  // @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  districtId: number;

  @HasMany(() => VenuePhoto)
  photos: VenuePhoto[];

  @BelongsToMany(() => VenueType, () => VenueTypeVenue)
  venueTypes: VenueType[];
}
