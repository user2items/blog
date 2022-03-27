import db from "../mongodb";
let visitSchema = db.Schema({
  update_time: String,
  pv: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  numblog: { type: Number, default: 0 },
});

export default db.model("visit", visitSchema);
