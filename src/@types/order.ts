type StatusOrderProps =
  | "CANCELADO"
  | "PENDENTE"
  | "APROVADO"
  | "EM ROTA"
  | "ENTREGUE";

export interface OrderProps {
  id: string;
  countItems: number;
  emailCustomer: string;
  total: number;
  status: StatusOrderProps;
}
