import { Body, Controller, Param, Get, Post, UseGuards, Req, Patch } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtGuard } from "../../auth/guards/jwt.guard";
import { SignUpDto } from "../dtos/sign-up.dto";
import { UpdateProfile } from "../dtos/update-profile.dto";
import { Gender, Relationship } from "../../config/enum.constants";
import { ChangeEmailDto } from "../dtos/change-email.dto";

@ApiTags('User')

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: 'Đăng ký dành cho người dùng', description: 'Đăng ký thành công sẽ tạo người dùng mới' })
    @ApiParam({ name: 'gender', enum: Gender, required: false })
    @ApiResponse({ status: 201, description: 'Thành công' })
    @ApiResponse({ status: 400, description: 'Sai thông tin đăng ký của người dùng' })
    @ApiResponse({ status: 409, description: 'Người dùng đã được đăng ký' })
    @ApiResponse({ status: 500, description: 'Lỗi máy chủ' })
    @Post()
    async signup(@Body() dto: SignUpDto): Promise<any> {
        return await this.userService.signup(dto)
    }

    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Xem tài khoản người dùng', description: 'Thông tin tài khoản đăng nhập' })
    @ApiResponse({ status: 200, description: 'Thành công' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy tài khoản' })
    @ApiResponse({ status: 500, description: 'Lỗi máy chủ' })
    @Get()
    async getUserLogin(@Req() req): Promise<any> {
        return await this.userService.getUserLogin(req.user.id)
    }

    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Chỉnh sửa thông tin tài khoản', description: 'Thông tin tài khoản được thay đổi' })
    @ApiResponse({ status: 200, description: 'Thành công' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy Tài khoản' })
    @ApiResponse({ status: 500, description: 'Lỗi máy chủ' })
    @Patch()
    async changeUserEmail(@Body() dto: ChangeEmailDto, @Req() req): Promise<any> {
        return await this.userService.changeUserEmail(dto, req.user.id)
    }
}