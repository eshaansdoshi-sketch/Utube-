import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema = new Schema(
    {
        VideoFile: {
            type: String, // Cloudinary url
            required: true,
        },
        thumbnail: {
            type: String, // Cloudinary url
            required: true,
        },
        title: {
            type: String, 
            required: true,
        },
        Description: {
            type: String, 
            required: true,
        },
        Duration: {
            type: Number, // Cloudinary url
            required: true,
        },
        Views: {
            type: Number, // Cloudinary url
            default: 0
        },
        isPublished: {
            type: Boolean, // Cloudinary url
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

VideoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", VideoSchema)