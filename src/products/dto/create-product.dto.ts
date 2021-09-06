import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    name: string;
    @ApiProperty({required: false}) //показывает в Swagger, что это поле является не обязательным и убираются галочки
    description?: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    sku: string;
    @ApiProperty({required: false}) //показывает в Swagger, что это поле является не обязательным и убираются галочки
    published: boolean;
}
