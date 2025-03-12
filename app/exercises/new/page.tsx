"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Plus, Save, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function NewExercisePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [tag, setTag] = useState("")
  const [tags, setTags] = useState<string[]>([])

  const addTag = () => {
    if (tag.trim() && !tags.includes(tag.trim().toLowerCase())) {
      setTags([...tags, tag.trim().toLowerCase()])
      setTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const saveExercise = () => {
    // In a real app, this would save to your database
    console.log({
      name,
      tags,
    })

    // Navigate back to exercises page
    router.push("/exercises")
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/exercises">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create New Exercise</h1>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="exercise-name">Exercise Name</Label>
          <Input
            id="exercise-name"
            placeholder="Bench Press, Squat, etc."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="exercise-tags">Tags</Label>
          <div className="flex gap-2">
            <Input
              id="exercise-tags"
              placeholder="chest, legs, push, etc."
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button onClick={addTag}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" asChild>
            <Link href="/exercises">Cancel</Link>
          </Button>
          <Button onClick={saveExercise} disabled={!name}>
            <Save className="h-4 w-4 mr-2" />
            Save Exercise
          </Button>
        </div>
      </div>
    </div>
  )
}

