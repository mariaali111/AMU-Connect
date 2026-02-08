import { Toaster as Sonner } from "sonner@2.0.3";

const Toaster = () => {
  return (
    <Sonner
      position="top-center"
      richColors
      closeButton
      expand={false}
      duration={3000}
      toastOptions={{
        style: {
          background: "var(--card)",
          color: "var(--card-foreground)",
          border: "1px solid var(--border)",
        },
      }}
    />
  );
};

export { Toaster };
