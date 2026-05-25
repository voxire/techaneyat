export type TeamMember = {
  id: string
  name: string
  title: string
  bio?: string
  photo?: string // path under /public/brand/team/
  linkedin?: string
}

// Placeholder:to be filled with real team data from Ahmad
export const team: TeamMember[] = [
  {
    id: 'placeholder-1',
    name: 'Team Member',
    title: 'Infrastructure Engineer',
    bio: 'Placeholder:to be replaced with real team data.',
  },
]
