import { Button } from '#/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center">Welcome to TanStack Start</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
    </div>
    <div>
      <Button variant="outline" asChild>
        <Link to="/recipes">Recipes</Link>
      </Button>
    </div>
    </>
  )
}
