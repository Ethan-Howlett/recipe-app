import { pgTable, serial, varchar, integer, boolean, decimal, timestamp, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. Core Recipes
export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 512 }),
  instructions: varchar('instructions').notNull(),
  imgUrl: varchar('img_url', { length: 512 }),
  createdAt: timestamp('created_at').defaultNow(),
})

// 2. Generic Ingredients (e.g., 'Whole Milk')
export const ingredients = pgTable('ingredients', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
})

// 3. Recipe <-> Ingredient Relationships
export const recipeIngredients = pgTable('recipe_ingredients', {
  id: serial('id').primaryKey(),
  recipeId: integer('recipe_id').references(() => recipes.id).notNull(),
  ingredientId: integer('ingredient_id').references(() => ingredients.id).notNull(),
  quantity: decimal('quantity').notNull(),
  unit: varchar('unit', { length: 50 }).notNull(),
})

// 4. Kroger UPC Mapping
export const krogerUpcs = pgTable('kroger_upcs', {
  upc: varchar('upc', { length: 20 }).primaryKey(),
  ingredientId: integer('ingredient_id').references(() => ingredients.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  isDefault: boolean('is_default').notNull().default(false),
})

// --- Relations ---
export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  upcs: many(krogerUpcs),
  recipes: many(recipeIngredients),
}))

// --- Kroger Token ---
export const krogerTokens = pgTable('kroger_tokens', {
  id: serial('id').primaryKey(),
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
})