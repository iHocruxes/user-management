import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "../entities/token.entity";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Token) private readonly tokenRepository: Repository<Token>
    ) {
    }

    async use(req: Request, res: Response, next: (error?: NextFunction) => void) {
        const path = req.route?.path;
        const refresh_token = req.cookies.refresh_token
        
        const token = await this.tokenRepository.findOne({ where: { 'refresh_token': refresh_token, 'check_valid': true } })
        const access_token = token.access_token

        const decoded = this.jwtService.verify(access_token)
        const user = await this.userRepository.findOne({ where: { 'phone': decoded.phone } })

        if (path === '/user-manegement/user/:id') {
            if (req.params.id === user.id) {
                next();
            }
            else {
                const errorMessage = 'Forbidden';
                const httpStatusCode = 402;
                res.status(httpStatusCode).json({ error: errorMessage, statuscode: httpStatusCode });
            }
        }
        else {
            // no path matches
            const errorMessage = 'Path not found';
            const httpStatusCode = 404;
            res.status(httpStatusCode).json({ error: errorMessage, statuscode: httpStatusCode });
        }
    }

}