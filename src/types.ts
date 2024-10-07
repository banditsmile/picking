export interface PickItem {
  id: number;
  order_id: number;
  customer: string;
  operator: string;
  type: 'pickup' | 'delivery';
  status: number;
  goods: number;
  money: number;
  need_time: string;
  add_time: string;
  finish_time: string;
}

export interface PickGoodsItem {
  id: number;
  product_id: number;
  item_no: string;
  store_name: string;
  num: number;
  stock: number;
  price: number;
  total_price: number;
  pack: number;
  status: number;
  image: string;
  add_time: string;
  pick_time: string;
  is_del: number;
}

export interface PickDetails {
  id: number;
  order_id: string;
  uid: number;
  customer: string;
  total_price: string;
  status: number;
  delivery_type: 'pickup' | 'delivery';
  need_time: string;
  data: PickGoodsItem[];
}