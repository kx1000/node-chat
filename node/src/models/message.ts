import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    }
});

export default mongoose.model('Message', messageSchema);