"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Edit, MoreHorizontal, Plus, Search, Trash, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Sample team data
const teams = [
  {
    id: 1,
    name: "Development Team",
    description: "Frontend and backend developers",
    members: 8,
    projects: 3,
    lead: "Alex Johnson",
  },
  {
    id: 2,
    name: "Design Team",
    description: "UI/UX and graphic designers",
    members: 5,
    projects: 2,
    lead: "Sarah Williams",
  },
  {
    id: 3,
    name: "Marketing Team",
    description: "Marketing and content specialists",
    members: 6,
    projects: 4,
    lead: "Michael Brown",
  },
  {
    id: 4,
    name: "Product Team",
    description: "Product managers and analysts",
    members: 4,
    projects: 2,
    lead: "Emily Davis",
  },
]

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newTeamName, setNewTeamName] = useState("")
  const [newTeamDescription, setNewTeamDescription] = useState("")
  const { toast } = useToast()

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateTeam = () => {
    if (!newTeamName.trim()) {
      toast({
        title: "Team name required",
        description: "Please enter a name for the team.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would call an API to create the team
    toast({
      title: "Team created",
      description: `${newTeamName} has been created successfully.`,
    })

    setNewTeamName("")
    setNewTeamDescription("")
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Teams</h2>
          <p className="text-muted-foreground">Manage your teams and team members</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>Add a new team to your organization</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="team-name">Team Name</Label>
                <Input
                  id="team-name"
                  placeholder="e.g. Marketing Team"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="team-description">Description</Label>
                <Input
                  id="team-description"
                  placeholder="Brief description of the team"
                  value={newTeamDescription}
                  onChange={(e) => setNewTeamDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="team-lead">Team Lead</Label>
                <Select>
                  <SelectTrigger id="team-lead">
                    <SelectValue placeholder="Select team lead" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">John Doe</SelectItem>
                    <SelectItem value="user2">Jane Smith</SelectItem>
                    <SelectItem value="user3">Robert Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTeam}>Create Team</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teams..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All Teams</DropdownMenuItem>
            <DropdownMenuItem>My Teams</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sort by Name</DropdownMenuItem>
            <DropdownMenuItem>Sort by Members</DropdownMenuItem>
            <DropdownMenuItem>Sort by Projects</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTeams.map((team) => (
          <Card key={team.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{team.name}</CardTitle>
                  <CardDescription>{team.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Team
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      Manage Members
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Team
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {Array.from({ length: Math.min(4, team.members) }).map((_, i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={`Team member ${i + 1}`} />
                      <AvatarFallback>TM</AvatarFallback>
                    </Avatar>
                  ))}
                  {team.members > 4 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                      +{team.members - 4}
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{team.members} members</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Team Lead</span>
                  <span className="font-medium">{team.lead}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Projects</span>
                  <span className="font-medium">{team.projects} active</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/dashboard/teams/${team.id}`}>View Team</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Users className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No teams found</h3>
          <p className="mt-2 text-sm text-muted-foreground">We couldn&apos;t find any teams matching your search.</p>
          <Button className="mt-4" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  )
}
