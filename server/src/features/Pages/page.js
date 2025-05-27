import mongoose from 'mongoose';

const { Schema } = mongoose;

const PageSchema = new Schema(
  {
   name: {
      type: String,
      required: [true, "can't be blank"],
      index: true,
    },
    description: {
      type: String,
    },
    slug: {
      type:String,
      index:true,
      unique: true
    },
    meta_title: {
      type: String,
      default: '',
    },
    meta_tags: {
      type:String,
      default:''
    },
    meta_description: {
      type: String,
      default:''
    },
    meta_schema: {
      type: String,
      default:''
    },
    status: {
      type: Boolean,
      default:true
    }

  },{timestamps:true}
);

PageSchema.methods.toJSON = function () {
  
  return {
    id: this.id,
    name: this.name,
    description: this.description,
    slug: this.slug,
    meta_title:this.meta_title,
    meta_tags:this.meta_tags,
    meta_description:this.meta_description,
    meta_schema:this.meta_schema,
    status:this.status
  };
};



const Page = mongoose.model('Page', PageSchema);

export default Page;