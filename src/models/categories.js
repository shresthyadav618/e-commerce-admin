import mongoose from "mongoose";
const categoriesSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    }
});

const categoriesModel = mongoose.models.categories || mongoose.model('categories',categoriesSchema);
export { categoriesModel };
