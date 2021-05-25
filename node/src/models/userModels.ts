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
        unique: true,
    },
    password: {
        type: String,
        required: false,
    }
});

export interface UserDocument extends mongoose.Document {
    name: string,
    email: string,
    password?: string;
}

export default mongoose.model<UserDocument>('User', userSchema);