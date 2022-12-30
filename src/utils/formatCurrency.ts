export function formatCurrency(value: number): string {
	return new Intl.NumberFormat("pt-br", {
		style: "currency",
		currency: "BRL",
	}).format(value);
}
