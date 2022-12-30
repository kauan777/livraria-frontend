import { useState } from "react";

import {
  CreditCardIcon,
  LibraryIcon,
  QrcodeIcon,
} from "@heroicons/react/solid";

export function PaymentMethods() {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const [openTab, setOpenTab] = useState(1);

  const tabs = [
    {
      name: "Cartão de crédito",
      href: "#",
      icon: CreditCardIcon,
      current: true,
    },
    {
      name: "Boleto",
      href: "#",
      icon: LibraryIcon,
      current: false,
    },
    { name: "PIX", href: "#", icon: QrcodeIcon, current: false },
  ];

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current)?.name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab, index) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-500"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(index);
                  console.log(openTab);
                }}
              >
                <tab.icon
                  className={classNames(
                    tab.current
                      ? "text-indigo-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
        <div className="col-span-3 sm:col-span-4">
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700"
          >
            Número do cartão
          </label>
          <div className="mt-1">
            <input
              type="text"
              required
              id="card-number"
              name="card-number"
              autoComplete="cc-number"
              className="h-8 p-2 block w-full border-gray-300 border rounded-md shadow-sm outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="col-span-2 sm:col-span-3">
          <label
            htmlFor="expiration-date"
            className="block text-sm font-medium text-gray-700"
          >
            Data de expiração (MM/YY)
          </label>
          <div className="mt-1">
            <input
              required
              type="text"
              name="expiration-date"
              id="expiration-date"
              autoComplete="cc-exp"
              className="h-8 p-2 block w-full border-gray-300 border rounded-md shadow-sm outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="cvc"
            className="block text-sm font-medium text-gray-700"
          >
            CVC
          </label>
          <div className="mt-1">
            <input
              required
              type="text"
              name="cvc"
              id="cvc"
              autoComplete="csc"
              className="h-8 p-2 block w-full border-gray-300 rounded-md shadow-sm border outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
