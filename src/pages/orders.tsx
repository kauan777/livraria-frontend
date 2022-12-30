import { useEffect } from "react";
import { Table, Row, Col, Tooltip, User, Text, Badge } from "@nextui-org/react";
import { useState } from "react";
BiSearchAlt;
import { BiSearchAlt } from "react-icons/bi";
import { SlClose } from "react-icons/sl";
import { api } from "../utils/api";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";
import { OrderProps } from "../@types/order";
import { NavBar } from "../components/NavBar";

export default function Orders() {
  const [orders, setOrders] = useState<OrderProps[] | null>(null);
  const [email, setEmail] = useState<string>("");

  const columns = [
    { name: "Data do pedido", uid: "name" },
    { name: "Valor total", uid: "role" },
    { name: "Status", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleGetOrdersByEmail = async () => {
    const { data } = await api.get(`/orders/${email}`);
    setOrders(data.orders);
  };

  console.log(orders);
  const renderCell = (item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            squared
            src={"/box.jpg"}
            name={formatDate(new Date().toString())}
            css={{ p: 0 }}
          >
            {item.countItems} itens
          </User>
        );

      case "role":
        return (
          <Col>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                {formatCurrency(item.total)}
              </Text>
            </Row>
          </Col>
        );

      case "status":
        return (
          <Badge
            variant={item.status !== "ENTREGUE" ? "bordered" : "default"}
            color={
              item.status == "PENDENTE"
                ? "warning"
                : item.status == "APROVADO"
                ? "success"
                : item.status == "CANCELADO"
                ? "error"
                : item.status == "EM ROTA"
                ? "secondary"
                : "success"
            }
          >
            {item.status}
          </Badge>
        );

      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Cancelar pedido" color="error">
                <button></button>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <>
      <NavBar currentPage="orders" />

      <div className="px-8 py-4">
        <div className="flex w-full border mt-2  h-[60px] items-center mb-4">
          <input
            className="w-full rounded-l-sm px-3 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email..."
          />
          <button
            onClick={handleGetOrdersByEmail}
            className="flex items-center justify-center rounded-r-sm  w-[60px] h-full bg-indigo-600 border border-indigo-600"
          >
            <BiSearchAlt size={24} color="white" />
          </button>
        </div>
        {orders !== null && orders.length > 0 && (
          <Table
            aria-label="Example table with custom cells"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="none"
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column
                  key={column.uid}
                  hideHeader={column.uid === "actions"}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body items={orders}>
              {(item: OrderProps) => (
                <Table.Row>
                  {(columnKey) => (
                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        )}
        {orders?.length == 0 && (
          <span className="w-full mt-4 flex items-center justify-center font-semibold text-lg text-gray-500">
            Nenhum pedido encontrado para esse email
          </span>
        )}
        {orders == null && (
          <div className="w-full mt-4 flex items-center justify-center">
            <span>Procure seus pedidos pelo seu email</span>
          </div>
        )}
      </div>
    </>
  );
}
