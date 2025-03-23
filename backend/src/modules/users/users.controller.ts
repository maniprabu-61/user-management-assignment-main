import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RoleGuard } from "../auth/role.guard";
import { SetMetadata } from "@nestjs/common";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(RoleGuard)
  @SetMetadata("roles", ["admin"])
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @UseGuards(RoleGuard)
  @SetMetadata("roles", ["admin"])
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(RoleGuard)
  @SetMetadata("roles", ["admin"])
  update(
    @Param("id") id: string,
    @Body() data: { email?: string; role?: string }
  ) {
    return this.usersService.update(id, data);
  }

  @Delete(":id")
  @UseGuards(RoleGuard)
  @SetMetadata("roles", ["admin"])
  delete(@Param("id") id: string) {
    return this.usersService.delete(id);
  }
}
