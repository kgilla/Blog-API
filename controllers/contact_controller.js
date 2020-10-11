const Contact = require("../models/contact");
const { body, validationResult } = require("express-validator");

exports.createPost = [
  body("name").isLength({ min: 1, max: 160 }),
  body("email")
    .isEmail()
    .withMessage("Must be vaild email")
    .isLength({ min: 1, max: 100 }),
  body("message").isLength({ min: 1, max: 400 }),
  (req, res) => {
    const errors = validationResult(req);
    const { name, email, message } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    new Contact({
      name,
      email,
      message,
    }).save((err, contact) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        message: "Message sent successfully, thanks for reaching out!",
        contact: contact,
      });
    });
  },
];

exports.indexGet = (req, res) => {
  Contact.find().exec((err, contacts) => {
    if (err) {
      return res.status(400).json({
        error: err,
        message: "Somthing went wrong",
      });
    }
    return res.status(200).json({
      contacts,
    });
  });
};

exports.contactViewGet = (req, res) => {
  Contact.findById(req.params.id).exec((err, contact) => {
    if (err) {
      return res.status(400).json({
        error: err,
        message: "Somthing went wrong",
      });
    }
    return res.status(200).json({
      contact,
    });
  });
};

exports.deletePost = (req, res) => {
  Contact.findByIdAndDelete(req.params.id, {}, (err, contact) => {
    if (err) {
      return res.status(200).json({
        error: err,
        message: "Something went wrong",
      });
    }
    return res.status(200).json({
      message: `Contact with name ${contact.name} has been deleted`,
    });
  });
};
