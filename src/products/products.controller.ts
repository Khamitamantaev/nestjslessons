import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
@ApiTags("Продукты")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ type: ProductEntity})
  async create(@Body() createProductDto: CreateProductDto) {
    return new ProductEntity( await this.productsService.create(createProductDto))
  }

  @Get()
  @ApiOkResponse({type: ProductEntity, isArray: true})
  async findAll() {
    const products = await this.productsService.findAll();
    return products.map(product => new ProductEntity(product))
  }

  @Get('drafts')
  @ApiOkResponse({type: ProductEntity, isArray: true})
  async findDrafts() {
    const drafts = await this.productsService.findDrafts();
    return drafts.map(draft => new ProductEntity(draft))
  }

  @Get(':id')
  @ApiOkResponse({type: ProductEntity})
   async findOne(@Param('id') id: string) { 
    return new ProductEntity(await this.productsService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ProductEntity})
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return new ProductEntity( await this.productsService.update(id, updateProductDto) ) ;
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ProductEntity})
  async remove(@Param('id') id: string) {
    return new ProductEntity(await this.productsService.remove(id));
  }
}
