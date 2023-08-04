import "@/styles/globals.scss"
import { AxiosError } from "axios"
import type { AppProps } from "next/app"
import toast, { Toaster } from "react-hot-toast"
import { QueryCache, QueryClient, QueryClientProvider } from "react-query"
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      toast.error((error as AxiosError).message)
    },
    onSuccess: () => {
      toast.success("Đã lấy dữ liệu mới")
    },
  }),
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        containerClassName="mt-[60px] lg:mt-0 z-[9999]"
        toastOptions={{ className: "" }}
      ></Toaster>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
