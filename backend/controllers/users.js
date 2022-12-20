const UsersModels = require('../models/users');

/**
 *  Retrieve tout les utilisateurs
 */
const getAllUsers = (req,res) => {
  UsersModels.find({}, (err, data)=>{
    if (err){
        return res.json({Error: err});

    }
    return res.json(data);

  })

};

/**
 *  Nouvel utilisateur
 */
const newUser = (req,res) => {
  UsersModels.findOne({ name: req.body.name},(err, data) =>{
    if(!data){
      const newUser = new UsersModels({
        name:req.body.name,
        comments: req.body.comments,
        level:req.body.level,

      })
      newUser.save((err,data)=>{
        if(err) return res.json({error: err});
        return res.json(data);

      })

    }else{
      if(err) return res.json('Somthing went wrong. ${err}');
      return res.json({message:"The user is already in your list"});

    }

  })

};

/**
 * Supprime tout les utilisateurs
 */
const deleteAllUsers = (req, res) => {
  UsersModels.deleteMany({}, err => {
    if(err) {
      return res.json({message: "Complete delete failed"});
    }
    return res.json({message: "Complete delete successful"});
})
};

/**
 * Retrieve un utilisateur
 */
const getOneUser = (req, res, next) => {
  let name = req.params.name; 

  UsersModels.findOne({name:name}, (err, data) => {
  if(err || !data) {
      return res.json({message: "User doesn't exist."});
  }
  else return res.json(data); 
  });
};

/**
 * Ajoute un commentaire au joueur (à faire : plutôt modifier)
 */
const newComment = (req, res) => {
  res.json({message: "DELETE 1 user"});
   /*let name = req.params.name; 
  let newComment = req.body.comments; 
  
  const comment = {
      text: newComment,
  }

  UsersModels.findOne({name:name}, (err, data) => {
      if(err || !data || !newComment) {
          return res.json({message: "The user specified doesn't exist."});
      }
      else {
          
          data.comment.push(comment);
          
          data.save(err => {
              if (err) { 
              return res.json({message: "Comment failed to add.", error:err});
              }
              return res.json(data);
          })  
      } 
  })*/
};

/**
 * Supprime un utilisateur
 */
const deleteOneUser = (req, res, next) => {
  let name = req.params.name; 

  UsersModels.deleteOne({name:name}, (err, data) => {
   
    if( data.deletedCount == 0) return res.json({message: "User doesn't exist."});
  
    else if (err) return res.json(`Something went wrong, please try again. ${err}`);
   
    else return res.json({message: "User deleted."});
    });
};


module.exports = {
  getAllUsers, 
  newUser,
  deleteAllUsers,
  getOneUser,
  newComment,
  deleteOneUser
};
