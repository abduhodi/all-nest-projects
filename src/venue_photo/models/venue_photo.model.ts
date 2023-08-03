import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Venue } from '../../venue/models/venue.model';

interface VenuePhotoAttribute {
  venueId: number;
  url: string;
}

@Table({ tableName: 'venue_photo' })
export class VenuePhoto extends Model<VenuePhoto, VenuePhotoAttribute> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => Venue)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  venueId: number;

  @Column({
    type: DataType.STRING,
  })
  url: string;

  @BelongsTo(() => Venue)
  venue: Venue;
}
