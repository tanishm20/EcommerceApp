export type TProductType = {
  id: string;
  name: string;
  image: string;
  price: number;
  tags?: string[];
  count?: number; // added only when in cart
};
