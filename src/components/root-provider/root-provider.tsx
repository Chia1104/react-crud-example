import { type FC, type ReactNode, useState } from "react";
import { Provider as RProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import stores from "@/stores";

const RootProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <RProvider store={stores}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RProvider>
  );
};

export default RootProvider;
