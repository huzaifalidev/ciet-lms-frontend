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
    title: "O Level Computer Science (2210)",
    description:
      "Comprehensive coverage of the Cambridge O Level Computer Science syllabus with practical coding exercises in Python.",
    price: 18000, // PKR
    durationWeeks: 10,
    level: "Intermediate",
  },
  {
    id: 2,
    title: "AS Level Mathematics (9709)",
    description:
      "Master the core concepts of Pure Mathematics, Mechanics, and Statistics as per the CAIE AS Level curriculum.",
    price: 22000, // PKR
    durationWeeks: 12,
    level: "Advanced",
  },
  {
    id: 3,
    title: "O Level Islamiat (2058)",
    description:
      "Deep dive into Islamic history, teachings, and contemporary issues aligned with the Pakistan Studies O Level syllabus.",
    price: 12000, // PKR
    durationWeeks: 8,
    level: "Beginner",
  },
  {
    id: 4,
    title: "A Level Business Studies (9609)",
    description:
      "Learn the key principles of business management, marketing, and finance in line with the A Level CAIE syllabus.",
    price: 24000, // PKR
    durationWeeks: 10,
    level: "Advanced",
  },
  {
    id: 5,
    title: "O Level Pakistan Studies (2059)",
    description:
      "Understand Pakistan’s history, geography, and development — perfectly designed for O Level students.",
    price: 13000, // PKR
    durationWeeks: 9,
    level: "Intermediate",
  },
  {
    id: 6,
    title: "O Level English Language (1123)",
    description:
      "Build strong reading, writing, and comprehension skills aligned with the Cambridge O Level English syllabus.",
    price: 15000, // PKR
    durationWeeks: 8,
    level: "Beginner",
  },
  {
    id: 7,
    title: "A Level Economics (9708)",
    description:
      "Study microeconomics and macroeconomics concepts following the CAIE A Level pattern with real-world examples from Pakistan.",
    price: 25000, // PKR
    durationWeeks: 10,
    level: "Advanced",
  },
];

