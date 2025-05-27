import mongoose from 'mongoose';

const { Schema } = mongoose;


const CustomizeSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "can't be blank"]
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, "can't be blank"]
        },
        category: { type: String },
        price: { type: Number },
        alias : {type : String},
        description: { type: String, default: '' },
        status: { type: Boolean, default: true },
        stock:{type:Boolean,default: true},
        softdelete: { type: Boolean, default: false }
    }
);


CustomizeSchema.methods.toJSON = function () {

    return {
        id: this.id,
        name: this.name,
        slug: this.slug,
        category: this.category,
        alias : this.alias,
        price: this.price,
        stock:this.stock,
        description: this.description,
        status: this.status,
        softdelete: this.softdelete
    }
}

const Customize = mongoose.model('Customize', CustomizeSchema)

export default Customize;
