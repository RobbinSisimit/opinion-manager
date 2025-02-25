import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El Nombre Es Obligatorio"]
    },
    username: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"]
    },
    email:{
        type: String,
        required: [true, "El correo es obligatorio :D"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatorio :D"]
    },
    role: {
        type: String,
        required: [true, "El Rol Es Obligatorio"],
        enum: ["ADMIN_ROLE","USER_ROLE"],
        default: "USER_ROLE"
    },
    estado: {   
        type: Boolean,
        default: true
    }
});


UserSchema.methods.toJSON = function() {
    const {__v,password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model("User", UserSchema);
