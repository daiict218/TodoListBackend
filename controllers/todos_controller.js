exports.create = function(req, res, next){
  const user = req.user,
    text = req.body.text,
    count = user.todos.push({
      text: text
    }),
    _id = user.todos[count-1]._id;

  user.save(function(err){
    if(err) { return next(err);}
    res.json({todo: {text: text, _id: _id}});
  });
}

exports.index = function(req, res, next){
  res.json({todos: req.user.todos});
}
