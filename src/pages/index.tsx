import Image from "next/image"
import { Inter } from "next/font/google"
import { Flow } from "../../components/flow"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main className={`w-screen h-screen bg-lime-100 ${inter.className}`}>
      <Flow />
    </main>
  )
}
