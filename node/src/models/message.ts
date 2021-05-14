import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Message', messageSchema);