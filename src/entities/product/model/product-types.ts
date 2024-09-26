export type ProductType = {
  Product: string;
  Status: "Sellable" | "Unfulfillable" | "Inbound";
  "Fulfilment centr": string;
  Qty: number;
  Value: number;
};
