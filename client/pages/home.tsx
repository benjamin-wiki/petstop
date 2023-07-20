import TwoPets from '@/components/layout/two-pets'

export default function Home() {
  return (
    <div className="mx-auto mt-8 max-w-screen-sm text-center">
      <h1 className="inline-block border-b-4 border-b-blue font-header text-3xl">
        Welcome to Pet Stop
      </h1>
      <TwoPets />
    </div>
  )
}
