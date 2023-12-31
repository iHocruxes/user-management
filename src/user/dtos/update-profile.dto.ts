import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { SignUpDto } from "./sign-up.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Gender, Relationship } from "../../config/enum.constants";

export class UpdateProfile {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'ID profile' })
    profileId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'anh dai dien' })
    avatar: string

    @IsNotEmpty()
    @IsString()
    @Length(2, 30)
    @ApiProperty({ example: 'New Customer Name' })
    full_name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '09/20/2023' })
    date_of_birth: string

    @IsNotEmpty()
    @IsEnum(Gender, { message: "wrong_syntax" })
    @ApiProperty({ example: 'Male' })
    gender: string

    @IsString()
    @ApiProperty({ example: 'Other' })
    relationship: string

    @IsString()
    @Length(0, 50)
    @ApiProperty({ example: 'HCM' })
    address: string
}