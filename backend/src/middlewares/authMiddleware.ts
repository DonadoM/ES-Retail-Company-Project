// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import User, { IUser } from '../models/userModel';

// interface JwtPayload {
//   id: string;
// }

// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUser | undefined;
//     }
//   }
// }

// export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

//       const user = await User.findById(decoded.id).select('-password');
//       if (!user) {
//         res.status(401);
//         throw new Error('Not authorized, user not found');
//       }
//       req.user = user;

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error('Not authorized, token failed');
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }
// });

// export const admin = (req: Request, res: Response, next: NextFunction) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401);
//     throw new Error('Not authorized as an admin');
//   }
// };

