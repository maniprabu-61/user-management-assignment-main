import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signup(@Body() dto: { email: string; password: string }) {
    return this.authService.signup(dto.email, dto.password);
  }

  @Post("signin")
  async signin(@Body() dto: { email: string; password: string }) {
    return this.authService.signin(dto.email, dto.password);
  }
}
