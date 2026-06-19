import { PersonModalContent } from "@/components/entity/PersonModalContent"

const NOAH_EDGE_BAPE_ID = "9"

export default function ProfilePage() {
  return (
    <section className="w-full max-w-2xl rounded-2xl border bg-background p-5 shadow-sm sm:p-6">
      <PersonModalContent personId={NOAH_EDGE_BAPE_ID} />
    </section>
  )
}
