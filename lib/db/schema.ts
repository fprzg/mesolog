import { relations } from "drizzle-orm"
import { integer, pgTable, serial, text, timestamp, boolean, json } from "drizzle-orm/pg-core"

// Users table
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  preferences: json("preferences")
    .$type<{
      units: "kg" | "lb"
      language: string
      theme: "light" | "dark" | "system"
    }>()
    .default({
      units: "kg",
      language: "en",
      theme: "system",
    }),
})

// Exercises table
export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  tags: text("tags").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Routines table
export const routines = pgTable("routines", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastPerformedAt: timestamp("last_performed_at"),
})

// Routine exercises junction table
export const routineExercises = pgTable("routine_exercises", {
  id: serial("id").primaryKey(),
  routineId: integer("routine_id")
    .notNull()
    .references(() => routines.id, { onDelete: "cascade" }),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercises.id, { onDelete: "cascade" }),
  order: integer("order").notNull(),
  sets: json("sets")
    .$type<
      {
        reps: number
        weight: number
      }[]
    >()
    .notNull(),
})

// Workouts table
export const workouts = pgTable("workouts", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  routineId: integer("routine_id").references(() => routines.id),
  date: timestamp("date").defaultNow().notNull(),
  duration: integer("duration"), // in seconds
  notes: text("notes"),
})

// Workout exercises table
export const workoutExercises = pgTable("workout_exercises", {
  id: serial("id").primaryKey(),
  workoutId: integer("workout_id")
    .notNull()
    .references(() => workouts.id, { onDelete: "cascade" }),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercises.id, { onDelete: "cascade" }),
  order: integer("order").notNull(),
})

// Sets table
export const sets = pgTable("sets", {
  id: serial("id").primaryKey(),
  workoutExerciseId: integer("workout_exercise_id")
    .notNull()
    .references(() => workoutExercises.id, { onDelete: "cascade" }),
  reps: integer("reps").notNull(),
  weight: integer("weight").notNull(), // stored in grams for precision
  completed: boolean("completed").notNull().default(false),
})

// Relations
export const exercisesRelations = relations(exercises, ({ many }) => ({
  routineExercises: many(routineExercises),
  workoutExercises: many(workoutExercises),
}))

export const routinesRelations = relations(routines, ({ one, many }) => ({
  user: one(users, {
    fields: [routines.userId],
    references: [users.id],
  }),
  routineExercises: many(routineExercises),
  workouts: many(workouts),
}))

export const routineExercisesRelations = relations(routineExercises, ({ one }) => ({
  routine: one(routines, {
    fields: [routineExercises.routineId],
    references: [routines.id],
  }),
  exercise: one(exercises, {
    fields: [routineExercises.exerciseId],
    references: [exercises.id],
  }),
}))

export const workoutsRelations = relations(workouts, ({ one, many }) => ({
  user: one(users, {
    fields: [workouts.userId],
    references: [users.id],
  }),
  routine: one(routines, {
    fields: [workouts.routineId],
    references: [routines.id],
  }),
  workoutExercises: many(workoutExercises),
}))

export const workoutExercisesRelations = relations(workoutExercises, ({ one, many }) => ({
  workout: one(workouts, {
    fields: [workoutExercises.workoutId],
    references: [workouts.id],
  }),
  exercise: one(exercises, {
    fields: [workoutExercises.exerciseId],
    references: [exercises.id],
  }),
  sets: many(sets),
}))

export const setsRelations = relations(sets, ({ one }) => ({
  workoutExercise: one(workoutExercises, {
    fields: [sets.workoutExerciseId],
    references: [workoutExercises.id],
  }),
}))

