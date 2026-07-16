import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { ArrowLeftIcon, PlusIcon } from 'lucide-react'
import { RecipeCard } from '#/components/recipeCard'

const getRecipesCount = createServerFn({ method: 'GET' }).handler(() => {
  return db.query.recipes.findMany()
})

export const Route = createFileRoute('/recipes/')({
  component: RecipesView,
  loader: () => {
    return getRecipesCount()
  },
})

function RecipesView() {
  const recipes = Route.useLoaderData()
  const recipesCount = recipes.length

  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl space-y-8 p-4">
      <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
        <Link to="/">
          <ArrowLeftIcon /> Home
        </Link>
      </Button>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold">Recipes</h1>
          {recipesCount > 0 && (
            <Badge variant="outline">{recipesCount} recipes found</Badge>
          )}
        </div>
        <Button asChild>
          <Link to="/recipes/new">
            <PlusIcon /> New Recipe
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
