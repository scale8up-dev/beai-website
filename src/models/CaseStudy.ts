import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IMetric {
  label: string;
  value: string;
}

export interface ICaseStudy extends Document {
  title: string;
  cardTitle?: string;
  slug?: string;
  client: string;
  shortDescription: string;
  metrics: IMetric[];
  tags: string[];
  duration: string;
  category: string;
  deliverables: string[];
  link: string;
  markdown: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const MetricSchema = new Schema<IMetric>(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const CaseStudySchema: Schema = new Schema<ICaseStudy>(
  {
    title: {
      type: String,
      required: [true, 'Case study title is required'],
      trim: true,
    },
    cardTitle: {
      type: String,
      maxlength: [25, 'Card title cannot exceed 25 characters'],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    client: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [150, 'Short description cannot exceed 150 characters'],
      trim: true,
    },
    metrics: {
      type: [MetricSchema],
      validate: [
        (val: IMetric[]) => val.length <= 3,
        'Cannot exceed 3 metrics',
      ],
      default: [],
    },
    tags: {
      type: [String],
      validate: [
        (val: string[]) => val.length <= 5,
        'Cannot exceed 5 tags',
      ],
      default: [],
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    deliverables: {
      type: [String],
      default: [],
    },
    link: {
      type: String,
      default: '#',
      trim: true,
    },
    markdown: {
      type: String,
      required: [true, 'Markdown content is required'],
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

if (mongoose.models && mongoose.models.CaseStudy) {
  delete mongoose.models.CaseStudy;
}

const CaseStudy: Model<ICaseStudy> =
  mongoose.models.CaseStudy ||
  mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);

export default CaseStudy;
