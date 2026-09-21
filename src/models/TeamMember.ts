import mongoose, { Schema, Model, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  title: string;
  description: string;
  image: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema: Schema = new Schema<ITeamMember>(
  {
    name: {
      type: String,
      required: [true, 'Team member name is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Job title / role is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description / bio is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image path or URL is required'],
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember ||
  mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);

export default TeamMember;
