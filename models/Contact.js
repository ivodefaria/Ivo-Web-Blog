import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    email: String,
    name: String,
    message: String,
});


module.exports = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

