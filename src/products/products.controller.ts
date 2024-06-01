import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductTCP } from '../common/constants';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  @MessagePattern({ cmd: ProductTCP.CREATE })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ cmd: ProductTCP.FIND_ALL })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: ProductTCP.FIND_ONE })
  findOne(@Payload('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @MessagePattern({ cmd: ProductTCP.UPDATE })
  update(
    // @Payload('id') id: string,
    @Payload() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern({ cmd: ProductTCP.DELETE })
  remove(@Payload('id') id: string) {
    return this.productsService.remove(+id);
  }
}
