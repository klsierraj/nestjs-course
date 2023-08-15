import { PaginationDto } from './../common/dtos/pagination.dto';
import { Product } from './entities/product.entity';
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';
import {Connection} from "typeorm"

@Injectable()
export class ProductsService {

  private readonly  logger = new Logger('ProductsService')

 constructor (
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>,
  @InjectRepository(ProductImage)
  private readonly productImageRepository: Repository<ProductImage>,

  private readonly dataSource: Connection
 ) {} 
  async create(createProductDto: CreateProductDto) {
    try {
    const { images = [], ...productDetails } = createProductDto

     const product = this.productRepository.create({
      ...productDetails, 
      images: images.map(image => this.productImageRepository.create({url:image}) )}) 
     await this.productRepository.save(product);
     return {...product, images}
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('Error')
    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit= 10, offset = 0 } = paginationDto
    return this.productRepository.find({
      take:limit,
      skip: offset,
    })
  }

  async searchById(id: string): Promise<any> {
    // Realizar búsqueda en la base de datos por el nombre
    const productos = await this.productRepository.find({
      where: { id },
    });

    return productos;
  }

  async update( id: string, updateProductDto: UpdateProductDto ) {

    const {images, ...toUpdate} = updateProductDto

    const product = await this.productRepository.preload({
      id,
      ...toUpdate
     
    });

    if ( !product ) throw new NotFoundException(`Product with id: ${ id } not found`);

    //Create query Runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if( images ) {
      await queryRunner.manager.delete( ProductImage, {product:{ id }})
      product.images = images.map(image => this.productImageRepository.create({url:image}))
      }

      await queryRunner.manager.save(product)
     // await this.productRepository.save( product );
     await queryRunner.commitTransaction()
     await queryRunner.release()
      return product;
      
    } catch (error) {
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
      console.log(error)
    }

  }

   async remove(id: string) {
    const producto = await this.productRepository.findOne(id);
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Eliminar el producto de la base de datos
    await this.productRepository.delete(id);
  }
  }

