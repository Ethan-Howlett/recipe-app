import { Button } from '#/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '#/components/ui/card'
import { RecipeForm } from '#/components/recipeForm'

export const Route = createFileRoute('/recipes/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='container space-y-2'>
      <Button asChild variant='ghost' size='sm'
        className='text-muted-foreground'
      >
        <Link to='/recipes'>
          <ArrowLeftIcon /> Back to Recipes
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>New Recipe</CardTitle>
          <CardDescription>Create a new recipe</CardDescription>
        </CardHeader>
        <CardContent>
          <RecipeForm />
        </CardContent>
      </Card>
    </div>
  )
}
