import { Controller, Post, Body, Param, Patch, Get, Delete } from "@nestjs/common";
import { OrdersService } from "@services";
import { CreateOrderDto, CreateOrderItemDto, UpdateOrderStatusDto, CreatePaymentDto } from "@dtos";

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Post(':orderId/item')
  async addItem(@Param('orderId') orderId: number, @Body() createOrderItemDto: CreateOrderItemDto) {
    return this.ordersService.addItem(orderId, createOrderItemDto);
  }

  @Get('list')
  async list() {
    return this.ordersService.getList();
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, updateOrderStatusDto);
  }

  @Post(':id/payment')
  addPayment(@Param('id') orderId: number, @Body() createPaymentDto: CreatePaymentDto) {
    return this.ordersService.addPayment(orderId, createPaymentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

  @Delete(':orderId/item/:itemId')
  removeItem(@Param('orderId') orderId: number, @Param('itemId') itemId: number) {
    return this.ordersService.removeItem(orderId, itemId);
  }
}
