import { createFileRoute } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { Link, Trash2Icon, ArrowLeftIcon } from 'lucide-react'

export const Route = createFileRoute('/recipes/$id/view/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl space-y-8 p-4">
      <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
        <Link to="/recipes">
          <ArrowLeftIcon /> Recipes
        </Link>
      </Button>
      <Button variant='destructive' size='sm'>
      <Trash2Icon /> Delete Recipe
    </Button>
    </div>
  )
}
