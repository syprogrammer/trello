'use client'
import Board from "@/components/Board";
import Header from "@/components/Header";
import { useModalStore } from "@/store/ModalStore";


export default function Home() {
  const [isOpen,closeModal] = useModalStore((state)=>[
    state.isOpen,
    state.closeModal
   ])
   console.log("isopen",isOpen)
  return (
    <main className="">
      <Header />
      <Board/>
    </main>
  )
}
