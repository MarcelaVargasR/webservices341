const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db("contacts")
    .collection("contacts")
    .find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  const contactsId = new ObjectId (req.params.id);
  const result = await mongodb
    .getDatabase()
    .db("contacts")
    .collection("contacts")
    .find({ _id: contactsId });
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
  });
};

const createContacts = async(req, res) => {
    const contactsId = new ObjectId(req.params.id)
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne({_id: contactsId}, contact)
    // check the response
    if(response.acknowledged > 0){
      res.status(204).send();
    }else{
      res.status(500).json(response.error || 'some error occurred while updating the user');
    }
};

const updateContacts = async (req, res) => {
  const contactId = new Object(req.params.id);
   const contact = {
      contactName: req.body.contactName,
      name: req.body.name,
      email: req.body.email,
      ipaddress: req.body.ipaddress
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: contactsId}, contact)
    // check the response
    if(response.modifiedCount > 0){
      res.status(204).send();
    }else{
      res.status(500).json(response.error || 'some error occurred while updating the user');
    }
}

const deleteContacts = async(req, res) => {
   const contactId = new Object(req.params.id);
   const response = await mongodb.getDatabase().db().collection('contacts').remove({_id: contactsId}, true)
    // check the response
    if(response.deleteCount > 0){
      res.status(204).send();
    }else{
      res.status(500).json(response.error || 'some error occurred while updating the user');
    }
}


module.exports = {
    getAll,
    getSingle,
    createContacts,
    updateContacts,
    deleteContacts
};