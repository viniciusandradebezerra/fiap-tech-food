import { EOrdersStatus } from "src/core/application/enums";


export class CreateOrderDto {
  userId: number;
  attendantId: number;
  status: EOrdersStatus;
  paymentId: number;
  amount: number;
  deliveryId: number;
  itemIds: number[];
}
