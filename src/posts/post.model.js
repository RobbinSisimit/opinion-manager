import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "El Titulo Es Obligatorio"]
    },
    category: {  
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',  
        required: true 
    },
    content: {
        type: String,
        required: [true, "El Contenido Es Obligatorio"]
    },
    keeper: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,  
    versionKey: false   
});

export default mongoose.model("Post", PostSchema);
