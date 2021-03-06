import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({data: createProductDto})
  }

   findAll() {
    return this.prisma.product.findMany({where:{ published: true}})
  }

  findDrafts() {
    return this.prisma.product.findMany({where:{ published: false}})
  } 

  //поменял входное id на string потому что в prisma.schema у нас id: String
  findOne(id: string) {
    return this.prisma.product.findUnique({where: { id:id}})
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({where: {id: id}, data: updateProductDto})
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: {id: id}})
  }
}
