const { Schema, model } = require('mongoose');


const MensajeSchema = Schema({
  de : {
    type : Schema.Types.ObjectId,
    ref : 'Usuario',
    required : true
  },
  para : {
    type : Schema.Types.ObjectId,
    ref : 'Usuario',
    required : true
  },
  mensaje : {
    type : String,
    required : true
  }
}, {
  timestamps:true // adiciona fecha de creacion y modificacion
});

MensajeSchema.method('toJSON', function() {
  const { __v,  ...object } = this.toObject();
  return object;
});

module.exports = model('Mensaje', MensajeSchema);

