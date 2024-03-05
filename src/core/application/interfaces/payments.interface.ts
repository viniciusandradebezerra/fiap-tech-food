import { EOrdersStatus } from "@enums";

export interface FindOrdersParams {
    excludeStatus?: EOrdersStatus[];
    orderByStatus?: EOrdersStatus[];
  }