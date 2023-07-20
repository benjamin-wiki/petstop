import OnePet from '@/components/layout/one-pet'
export default function Random() {
  return (
    <div className="mx-auto mt-8 max-w-screen-sm text-center">
      <h1 className="inline-block border-b-4 border-b-pink font-header text-3xl">
        Random
      </h1>
      <OnePet />
    </div>
  )
}
