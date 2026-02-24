const ContactConfig = require('../models/ContactConfig');

const getContact = async (req, res) => {
  try {
    const config = await ContactConfig.getConfig();
    res.status(200).json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error: Could not fetch configuration' });
  }
};

const updateContact = async (req, res) => {
  try {
    let config = await ContactConfig.findOne();
    if (!config) config = new ContactConfig();

    Object.assign(config, req.body);
    await config.save();

    res.status(200).json({ success: true, message: 'Updated successfully', data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error: Could not update configuration' });
  }
};

const resetContact = async (req, res) => {
  try {
    const config = await ContactConfig.resetConfig();
    res.status(200).json({ success: true, message: 'Reset successfully', data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error: Could not reset configuration' });
  }
};

module.exports = { getContact, updateContact, resetContact };