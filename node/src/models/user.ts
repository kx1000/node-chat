import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema<UserDocument>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

export interface UserDocument extends mongoose.Document {
    name: string,
    email: string,
}

export default mongoose.model('User', userSchema);