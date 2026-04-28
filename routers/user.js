const express = require("express");

const User = require("../models/user");

const router = express.Router();
////////////////////////////////
// 1- Use POST to add 5 users to the collection.
// Each user should contain (name, age, city).
// Return the created users.

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
//////////////////////////////////////////////////////
// 2- Use GET to retrieve all users from the collection.
// Display all user documents.

router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (!allUsers) {
      return res.status(404).send("Users not found");
    }

    res.status(201).send(allUsers);
  } catch (e) {
    res.status(500).send(e);
  }
});
////////////////////////////////////////////////////////
// 3- Use GET by ID to retrieve a specific user using _id.
// Return the user data if found.

router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

////////////////////////////////////////
// 4- Use PATCH to update a user using _id.
// Update any field (e.g., name or age).
// Return the updated user.

router.patch("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send("user not found");
    }
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
/////////////////////////////////////////
// 5- Use DELETE by ID to delete a user using _id.
// Return a message confirming deletion.

router.delete('/users/:id',async(req,res)=>{
    try{
const _id=req.params.id
const user=await User.findByIdAndDelete(_id)
if(!user){
      return res.status(404).send("user not found");
}
    res.status(201).send("user has deleted successfuly");

    }
    catch (e) {
    res.status(500).send(e);
  }
})



module.exports = router;
