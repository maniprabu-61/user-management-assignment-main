import { Injectable, ForbiddenException } from "@nestjs/common";
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async signup(email: string, password: string) {
    const hashedPassword = await argon2.hash(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      console.log(
        `Simulated email: Welcome ${email}, your account is created!`
      );
      return { message: "User registered successfully" };
    } catch (error) {
      throw new ForbiddenException("Email already exists");
    }
  }

  async signin(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new ForbiddenException("Invalid credentials");

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) throw new ForbiddenException("Invalid credentials");

    await this.prisma.user.update({
      where: { email },
      data: { lastLoginAt: new Date() },
    });

    return this.generateToken(user.id, user.email, user.role);
  }

  private async generateToken(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: "1h",
      secret: this.config.get<string>("JWT_SECRET"),
    });

    return {
      accessToken: token,
      user: { id: userId, email: email, role: role },
    };
  }
}
