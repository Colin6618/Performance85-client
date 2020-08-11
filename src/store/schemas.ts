import { schema } from 'normalizr';


const commentSchema = new schema.Entity("comments");

const performanceSchema = new schema.Object({
  comments: new schema.Array(commentSchema)
})
export { commentSchema, performanceSchema };

