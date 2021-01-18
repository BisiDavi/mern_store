import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Merchant from '../models/merchantModel.js';

// @desc    Auth merchant & get token
// @route   POST /api/merchant/login
// @access  Public
const authMerchant = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const merchant = await Merchant.findOne({ email });

  if (merchant && (await merchant.matchPassword(password))) {
    res.json({
      _id: merchant._id,
      name: merchant.name,
      email: merchant.email,
      isAdmin: merchant.isAdmin,
      token: generateToken(merchant._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new merchant
// @route   POST /api/merchant
// @access  Public
const registerMerchant = asyncHandler(async (req, res) => {
  const { name, email, businessName, businessAddress, password } = req.body;

  const merchantExists = await Merchant.findOne({ email });

  if (merchantExists) {
    res.status(400);
    throw new Error('Merchant already exists');
  }

  const merchant = await Merchant.create({
    name,
    email,
    businessName,
    businessAddress,
    password
  });

  if (merchant) {
    res.status(201).json({
      _id: merchant._id,
      name: merchant.name,
      email: merchant.email,
      businessName: merchant.businessName,
      businessAddress: merchant.businessAddress,
      isAdmin: merchant.isAdmin,
      token: generateToken(merchant._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid merchant data');
  }
});

// @desc    Get merchant profile
// @route   GET /api/merchant/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const merchant = await Merchant.findById(req.merchant._id);

  if (merchant) {
    res.json({
      _id: merchant._id,
      name: merchant.name,
      email: merchant.email,
      isAdmin: merchant.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('Merchant not found');
  }
});

// @desc    Update merchant profile
// @route   PUT /api/merchant/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const merchant = await Merchant.findById(req.merchant._id);

  if (merchant) {
    merchant.name = req.body.name || merchant.name;
    merchant.email = req.body.email || merchant.email;
    if (req.body.password) {
      merchant.password = req.body.password;
    }

    const updatedUser = await merchant.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error('Merchant not found');
  }
});

// @desc    Get all merchant
// @route   GET /api/merchant
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const merchant = await Merchant.find({});
  res.json(merchant);
});

// @desc    Delete merchant
// @route   DELETE /api/merchant/:id
// @access  Private/Admin
const deleteMerchant = asyncHandler(async (req, res) => {
  const merchant = await Merchant.findById(req.params.id);

  if (merchant) {
    await merchant.remove();
    res.json({ message: 'Merchant removed' });
  } else {
    res.status(404);
    throw new Error('Merchant not found');
  }
});

// @desc    Get merchant by ID
// @route   GET /api/merchant/:id
// @access  Private/Admin
const getMerchantById = asyncHandler(async (req, res) => {
  const merchant = await Merchant.findById(req.params.id).select('-password');

  if (merchant) {
    res.json(merchant);
  } else {
    res.status(404);
    throw new Error('Merchant not found');
  }
});

// @desc    Update merchant
// @route   PUT /api/merchant/:id
// @access  Private/Admin
const updateMerchant = asyncHandler(async (req, res) => {
  const merchant = await Merchant.findById(req.params.id);

  if (merchant) {
    merchant.name = req.body.name || merchant.name;
    merchant.email = req.body.email || merchant.email;
    merchant.isAdmin = req.body.isAdmin;

    const updatedUser = await merchant.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('Merchant not found');
  }
});

export {
  authMerchant,
  registerMerchant,
  getMerchantProfile,
  updateMerchantProfile,
  getMerchants,
  deleteMerchant,
  getMerchantById,
  updateMerchant
};
