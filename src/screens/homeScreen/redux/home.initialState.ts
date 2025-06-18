export interface IProductDataType {
  id: string;
  name: string;
  image: string;
  price: number;
  tags?: string[];
  description: string;
}
type TAuthState = {
  filteredData?: IProductDataType[];
};

export const initialAuthState: TAuthState = {
  filteredData: undefined,
};
