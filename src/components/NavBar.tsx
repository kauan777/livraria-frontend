import { Navbar, Link, Text, Avatar, Dropdown, Badge } from "@nextui-org/react";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../contexts/CartContex";
import { formatCurrency } from "../utils/formatCurrency";
import { ModalCart } from "./Cart/ModalCart";

interface NavBarProps {
  currentPage: "home" | "orders";
}

export function NavBar({ currentPage }: NavBarProps) {
  const collapseItems = ["Inicio", "Pedidos", "Carrinho"];

  const { count, walletBallance } = useCart();
  const [isVisibleCartModal, setIsVisibleCartModal] = useState<boolean>(false);

  function closeCartModal() {
    setIsVisibleCartModal(false);
  }

  return (
    <Navbar isBordered variant="sticky" id="navbar">
      <ModalCart visible={isVisibleCartModal} onClose={closeCartModal} />
      <Navbar.Toggle showIn="xs" />
      <Navbar.Brand
        css={{
          "@xs": {
            w: "12%",
          },
        }}
      >
        <Text className="ml-4" b color="inherit" hideIn="xs">
          ISNEW
        </Text>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight activeColor="secondary" hideIn="xs">
        <Navbar.Link href="/" isActive={currentPage == "home"}>
          Inicio
        </Navbar.Link>
        <Navbar.Link href="/orders" isActive={currentPage == "orders"}>
          Pedidos
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content
        css={{
          "@xs": {
            w: "12%",
            jc: "flex-end",
          },
        }}
      >
        <button onClick={() => setIsVisibleCartModal(true)}>
          <Badge content={count} isInvisible={count == 0} color="error">
            <AiOutlineShoppingCart size={23} />
          </Badge>
        </button>

        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                bordered
                className="md:mr-4"
                as="button"
                color="secondary"
                size="md"
                src="/user.png"
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="secondary"
            onAction={(actionKey: any) => console.log({ actionKey })}
          >
            <Dropdown.Item key="profile" css={{ height: "$14" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Anônimo
              </Text>
              <Text color="inherit" css={{ d: "flex" }}>
                <span className="mr-2">
                  <b>Saldo:</b> {formatCurrency(walletBallance)}
                </span>
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="order" withDivider>
              Ver pedidos
            </Dropdown.Item>

            <Dropdown.Item key="cart">
              <span>Carrinho</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            isActive={index === 2}
          >
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="#"
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
