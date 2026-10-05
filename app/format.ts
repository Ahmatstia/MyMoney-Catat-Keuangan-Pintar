export const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

// Angka tanpa simbol, untuk baris struk yang sempit.
export const formatNumber = (num: number) =>
  new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(num);
