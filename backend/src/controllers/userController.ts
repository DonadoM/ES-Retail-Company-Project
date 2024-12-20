// import { Request, Response } from 'express';
// import asyncHandler from 'express-async-handler';
// import User, { IUser } from '../models/userModel';
// import jwt from 'jsonwebtoken';

// const generateToken = (id: string) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET as string, {
//     expiresIn: '30d',
//   });
// };

// // @desc    Auth user & get token
// // @route   POST /api/users/login
// // @access  Public
// export const authUser = asyncHandler(async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user && (await user.comparePassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }
// });

// // @desc    Register a new user
// // @route   POST /api/users
// // @access  Public
// export const registerUser = asyncHandler(async (req: Request, res: Response) => {
//   const { name, email, password } = req.body;

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   const user = await User.create({
//     name,
//     email,
//     password,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });

// // @desc    Get user profile
// // @route   GET /api/users/profile
// // @access  Private
// export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
//   const user = await User.findById(req.user?._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

// // @desc    Update user profile
// // @route   PUT /api/users/profile
// // @access  Private
// export const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
//   const user = await User.findById(req.user?._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

// // @desc    Get all users
// // @route   GET /api/users
// // @access  Private/Admin
// export const getUsers = asyncHandler(async (req: Request, res: Response) => {
//   const users = await User.find({});
//   res.json(users);
// });

// // @desc    Delete user
// // @route   DELETE /api/users/:id
// // @access  Private/Admin
// export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     await user.remove();
//     res.json({ message: 'User removed' });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

// // @desc    Get user by ID
// // @route   GET /api/users/:id
// // @access  Private/Admin
// export const getUserById = asyncHandler(async (req: Request, res: Response) => {
//   const user = await User.findById(req.params.id).select('-password');

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

// // @desc    Update user
// // @route   PUT /api/users/:id
// // @access  Private/Admin
// export const updateUser = asyncHandler(async (req: Request, res: Response) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });


// // @desc    Make a user an admin
// // @route   PUT /api/users/make-admin/:id
// // @access  Private/Admin
// export const makeAdmin = async (req: Request, res: Response) => {
//     try {
//       const user = await User.findById(req.params.id);
  
//       if (!user) {
//         res.status(404);
//         throw new Error('User not found');
//       }
  
//       user.isAdmin = true;
//       await user.save();
  
//       res.status(200).json({
//         message: 'User updated to admin successfully',
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//         },
//       });
//     } catch (error) {
//       res.status(500).json({ message: (error as Error).message });
//     }
//   };

