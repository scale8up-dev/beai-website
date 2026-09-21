import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  year: string;
  tag: string;
  image: string;
  link: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
      trim: true,
    },
    tag: {
      type: String,
      required: [true, 'Tag is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL or path is required'],
      trim: true,
    },
    link: {
      type: String,
      required: [true, 'Project link is required'],
      trim: true,
      default: '#',
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

// Prevent mongoose model overwrite error during Next.js hot reloads
const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
