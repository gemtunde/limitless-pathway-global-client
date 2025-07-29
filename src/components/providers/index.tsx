"use client";
import React, { ReactNode, useState } from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
//import { AuthProvider } from '@/context/useAuth'

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
//import 'react-toastify/dist/ReactToastify.css'
//import 'react-circular-progressbar/dist/styles.css'

function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchInterval: false,
          },
        },
        queryCache: new QueryCache(),
      })
  );
  // useState, useEffect hook

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default Providers;
