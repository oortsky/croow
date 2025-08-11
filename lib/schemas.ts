import { z } from "zod";
import { randomID } from "@/utils/id";

export enum StatusEnum {
  Pending = "pending",
  Paid = "paid",
  Proceeded = "proceeded",
  Received = "received",
  Released = "released",
  Completed = "completed",
  Cancelled = "cancelled",
  Refunded = "refunded"
}

export enum BanksEnum {
  BCA = "bca",
  BRI = "bri",
  BNI = "bni",
  Mandiri = "mandiri",
  Permata = "permata",
  CIMB = "cimb"
}

export enum CategoriesEnum {
  Lifestyle = "lifestyle",
  Automotive = "automotive"
}

export const userSchema = z.object({
  id: z.string().min(1, { message: "USR (PYR/PYE) ID is required." }),
  first_name: z.string().min(3, { message: "First name is required." }),
  last_name: z.string().min(3, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .regex(/^\+62\d{9,13}$/, { message: "Phone number at least 11 digits." }),
  bank: z.nativeEnum(BanksEnum, { message: "Please select a bank." }),
  account_number: z.string().min(5, { message: "Account number is required" }),
  account_holder_name: z
    .string()
    .min(3, { message: "Account holder name is required." }),
  same_as_name: z.boolean().optional()
});

export const transactionSchema = z.object({
  id: z.string().min(1, { message: "TRX ID is required." }),
  payer_id: z.string().min(1, { message: "Payer ID is required." }),
  payee_id: z.string().min(1, { message: "Payee ID is required." }),
  name: z.string().min(3, { message: "Name is required." }),
  category: z.nativeEnum(CategoriesEnum, {
    message: "Please select a category."
  }),
  amount: z.number().min(10000, { message: "Min. Rp10.000" }),
  service_fee: z.number().min(8000, { message: "Min. Rp8.000" }),
  total: z.number().min(18000, { message: "Min. Rp.18.000" }),
  note: z.string().optional(),
  status: z.nativeEnum(StatusEnum, { message: "Invalid status." }),
  snap: z.object({
    transaction_details: z.object({
      order_id: z.string().min(1, "Order ID is required."),
      gross_amount: z.number().min(1, "Gross amount is required.")
    }),
    item_details: z.array(
      z.object({
        name: z.string().min(1, "Item name is required."),
        price: z.number().min(1, "Item price is required."),
        quantity: z.number().min(1).default(1)
      })
    ),
    customer_details: z.object({
      first_name: z.string().min(3, "First name is required."),
      last_name: z.string().min(3, "Last name is required."),
      email: z.string().email("Invalid email address."),
      phone: z
        .string()
        .regex(/^\+62\d{9,13}$/, "Phone number at least 11 digits.")
    })
  })
});

export const snapSchema = transactionSchema.shape.snap;

export const additionalSchema = z.object({
  isAcceptTermsAndPrivacy: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and privacy policy."
  })
});

export const stepOneSchema = z.object({
  payer: userSchema
});

export const stepTwoSchema = z.object({
  payee: userSchema
});

export const stepThreeSchema = z.object({
  transaction: transactionSchema.omit({
    payer_id: true,
    payee_id: true,
    snap: true
  })
});

export const stepFourSchema = z.object({
  additional: additionalSchema
});

export const fullFormSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema)
  .merge(stepFourSchema)
  .transform(data => {
    const payer_id = data.payer.id || randomID("PYR");
    const payee_id = data.payee.id || randomID("PYE");
    const transaction_id = data.transaction.id || randomID("TRX");

    const payer = {
      ...data.payer,
      payer_id
    };

    const payee = {
      ...data.payee,
      payee_id
    };

    const transaction = {
      ...data.transaction,
      id: transaction_id,
      payer_id,
      payee_id,
      snap: {
        transaction_details: {
          order_id: transaction_id,
          gross_amount: data.transaction.total
        },
        item_details: [
          {
            name: data.transaction.name,
            price: data.transaction.amount,
            quantity: 1
          },
          {
            name: "Service Fee",
            price: data.transaction.service_fee,
            quantity: 1
          }
        ],
        customer_details: {
          first_name: data.payer.first_name,
          last_name: data.payer.last_name,
          email: data.payer.email,
          phone: data.payer.phone
        }
      }
    };

    return {
      payer: data.payer,
      payee: data.payee,
      transaction,
      additional: data.additional
    };
  });
