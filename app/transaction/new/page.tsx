import { MultiStepForm } from "@/components/forms/MultiStepForm";

export const metadata = {
  title: "Troow - New Transaction",
  description: "Safe. Fast. Easy."
};

export default function Page() {
  return (
    <main className="container w-full min-h-screen mx-auto p-4 font-sans">
      <h1 className="text-xl font-bold mb-4">New Transaction!</h1>
      <MultiStepForm />
    </main>
  );
}
