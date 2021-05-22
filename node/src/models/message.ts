import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema<MessageDocument>({
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

export interface MessageDocument extends mongoose.Document {
    content: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date,
}

export default mongoose.model<MessageDocument>('Message', messageSchema);