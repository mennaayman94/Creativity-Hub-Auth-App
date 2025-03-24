import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from 'src/utils/tokens';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['jwt']; // Extract token from cookies
    console.log(req.cookies)
    if (!token) {
      throw new UnauthorizedException('Authentication token is missing');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Add the user data (from token) to the request object for later use
    req["user"] = decoded["data"];
    next();
  }
}
