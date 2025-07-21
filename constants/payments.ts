export const payments = [
  {
    value: "QRIS",
    label: "QRIS",
    description: "Pay quickly via e-wallet or m-banking. Transaction Cost 0.7%",
    cost: 0.7
  },
  {
    value: "VA",
    label: "Virtual Account",
    description: "Transfer to virtual bank account. Transaction Cost Rp4.000",
    cost: 4000
  }
];

export const paymentValues = payments.map(p => p.value);
