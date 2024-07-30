import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { RegisterDTO } from './dto/register.dto';
import { HashService } from './hash.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService
    ) {}

    async register(registerDTO: RegisterDTO) {
        const { password, username, email, confirmedPassword } = registerDTO;
    
        const hashedPassword = this.hashService.hashPassword(password);

        // Check if username or email already exists
        const existingUser = await this.userModel.findOne({
            $or: [{ username }, { email }],
        }).exec();

        if (existingUser) {
            throw new ConflictException('Username or email already exists');
        }

        const newUser = new this.userModel({
            username: registerDTO.username,
            email: registerDTO.email,
            password: hashedPassword,
        });
    
        return newUser.save();
    }

    async findByUsername(username: string) {
        return this.userModel.findOne({ username }).exec();
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string) {
        return this.userModel.findById(id).exec();
    }

    async validateUser(identity: string, password: string): Promise<User | null> {
        const [userByUname, userByMail] = await Promise.all([
            this.findByUsername(identity),
            this.findByEmail(identity),
        ]);

        
        let user = userByUname || userByMail;
    
        if (!user) {
            return null;
        }
    
        if (await this.hashService.comparePasswords(password, user.password)) {

            const { password: _, ...result } = user.toObject();
            return result as User;
        }
    
        return null;
    }
    

    async login(identity: string, password: string): Promise<any> {
        const user = await this.validateUser(identity, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user._id };
        const accessToken = this.jwtService.sign(payload);

        return { access_token: accessToken };
    }
}
