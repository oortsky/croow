export function formatRupiah(value?: number | string): string {
  if (!value) return "";
  const number =
    typeof value === "string" ? parseInt(value.replace(/\D/g, "")) : value;
  if (isNaN(number)) return "";
  return number.toLocaleString("id-ID");
}

export function parseRupiah(input: string): number {
  const digitsOnly = input.replace(/\D/g, "");
  return digitsOnly ? parseInt(digitsOnly) : 0;
}
