

import mongoose from "mongoose";
import { connect } from "../dbConfig/dbConfig";
connect();

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    desc : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }

});

const productModel = mongoose.models.product ||  mongoose.model('product',productSchema);
export { productModel };
