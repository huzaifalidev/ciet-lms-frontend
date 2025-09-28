export type Course = {
  id: number
  title: string
  description: string
  price: number
  durationWeeks: number
  level: "Beginner" | "Intermediate" | "Advanced"
}

export const coursesCatalog: Course[] = [
  {
    id: 1,
    title: "React Fundamentals",
    description: "Learn the basics of React development",
    price: 149,
    durationWeeks: 8,
    level: "Beginner",
  },
  {
    id: 2,
    title: "JavaScript Basics",
    description: "Introduction to JavaScript programming",
    price: 129,
    durationWeeks: 6,
    level: "Beginner",
  },
  {
    id: 3,
    title: "Advanced CSS",
    description: "Master advanced CSS techniques",
    price: 119,
    durationWeeks: 5,
    level: "Intermediate",
  },
  {
    id: 4,
    title: "Python for Beginners",
    description: "Start your journey with Python",
    price: 139,
    durationWeeks: 8,
    level: "Beginner",
  },
  {
    id: 5,
    title: "Database Design",
    description: "Learn database design principles",
    price: 159,
    durationWeeks: 7,
    level: "Intermediate",
  },
]
