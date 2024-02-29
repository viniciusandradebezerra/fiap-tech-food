import { Injectable, NotFoundException } from "@nestjs/common";
import { Order, Payment, OrderItem } from "src/core/domain/entities";
import { OrdersRepository, ProductsRepository, AttendantRepository, OrderItemRepository, PaymentRepository, UsersRepository } from "src/core/infrastructure/db/repositories";
import { CreateOrderDto, UpdateOrderStatusDto, CreatePaymentDto, CreateOrderItemDto } from "src/core/infrastructure/http/dtos";
import { EPaymentStatus } from "../enums";

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly productsRepository: ProductsRepository,
    private readonly attendantRepository: AttendantRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userRepository.findOne(createOrderDto.userId,);
    if (!user) {
      throw new NotFoundException(`User #${createOrderDto.userId} not found`);
    }

    const attendant = await this.attendantRepository.findOne(createOrderDto.attendantId);
    if (!attendant) {
      throw new NotFoundException(
        `Attendant #${createOrderDto.attendantId} not found`,
      );
    }

    let totalAmount = 0;

    if (createOrderDto.itemIds && createOrderDto.itemIds.length > 0) {
      for (const itemId of createOrderDto.itemIds) {
        const product = await this.productsRepository.findOne(itemId);
        if (!product) {
          throw new NotFoundException(`Product #${itemId} not found`);
        }
        totalAmount += product.price;
      }
    }

    return await this.ordersRepository.create(createOrderDto);
  }

  async updateStatus(
    orderId: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order = await this.ordersRepository.findOne(orderId);

    if (!order) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }

    order.status = updateOrderStatusDto.status;
    await this.ordersRepository.save(order);

    return order;
  }

  async addPayment(
    orderId: number,
    createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    const order = await this.ordersRepository.findOne(orderId);
    if (!order) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }

    console.log(createPaymentDto.paymentMethod)

    return await this.paymentRepository.create(order, {
      method: createPaymentDto.paymentMethod,
      status: EPaymentStatus.PENDING,
    });
  }

  async updateOrderTotalValue(order: Order): Promise<void> {
    const orderItems = await this.orderItemRepository.findByOrderId(order.id);

    const totalValue = orderItems.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0,
    );

    order.amount = totalValue;
    await this.ordersRepository.save(order);
  }

  async addItem(
    orderId: number,
    createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItem> {
    const order = await this.ordersRepository.findOne(orderId);
    if (!order) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }
    const product = await this.productsRepository.findOne(createOrderItemDto.productId);
    if (!product) {
      throw new NotFoundException(
        `Product #${createOrderItemDto.productId} not found`,
      );
    }

    let orderItem = await this.orderItemRepository.findOneByOrderId(orderId, createOrderItemDto);

    if (orderItem) {
      orderItem.quantity += createOrderItemDto.quantity;
      orderItem.unitPrice = product.price;
    } else {
      orderItem = await this.orderItemRepository.create({
        order: order,
        orderId,
        product: product,
        quantity: createOrderItemDto.quantity,
        unitPrice: product.price,
      });
    }

    await this.orderItemRepository.save(orderItem);
    await this.updateOrderTotalValue(order);

    return orderItem;
  }

  async findOne(orderId: number): Promise<Order> {
    const order = await this.ordersRepository.findOne(orderId);

    if (!order) {
      throw new NotFoundException(`Order #${orderId} not found`);
    }

    return order;
  }

  async removeItem(
    orderId: number,
    itemId: number,
  ): Promise<{ message: string }> {
    const orderItem = await this.orderItemRepository.findOne(itemId);

    if (!orderItem) {
      throw new NotFoundException(
        `Order item #${itemId} for order #${orderId} not found`,
      );
    }

    await this.orderItemRepository.remove(orderItem.id);

    return { message: `Order item #${itemId} for order #${orderId} deleted` };
  }
}