import { Button } from '#/components/ui/button'
import { Link } from '@tanstack/react-router'
import { EyeIcon } from 'lucide-react'

type RecipeCardProps = {
  recipe: {
    id: string
    imgUrl: string | undefined
    name: string
    description: string
  }
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 shadow-md">
      <img src={recipe.imgUrl} alt={recipe.name} className="h-48 w-full rounded-lg object-cover" />
      <h2 className="text-2xl font-bold">{recipe.name}</h2>
      <p className="text-sm text-muted-foreground">{recipe.description}</p>
      <Button asChild variant='outline' size='sm'>
        <Link to="/recipes/$id/view" params={{ id: recipe.id }}>
          <EyeIcon /> View Recipe
        </Link>
      </Button>
    </div>
  )
}
