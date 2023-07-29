import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from 'react-query/devtools';

export const queryClient = new QueryClient();

export interface ReactQueryProviderProps{
    children: React.ReactNode;
}
export function ReactQueryProvider(props: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools /> */}
      {props.children}
    </QueryClientProvider>
  );
}
