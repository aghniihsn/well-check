"use client"

import Link from "next/link"
import { ArrowUpRight, BarChart3, CheckCircle, Clock, Frown, Meh, Smile, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { api, UserProfile } from "@/lib/api"

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState<UserProfile[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [checkins, setCheckins] = useState<any[]>([])

  useEffect(() => {
    Promise.all([
      api.user.getProfile(),
      api.user.getAll(),
      api.projects.getAll(),
      api.checkins.getAll()
    ])
      .then(([profile, users, projects, checkins]) => {
        setUser(profile)
        setMembers(users)
        setProjects(projects)
        setCheckins(checkins.data || checkins)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading dashboard...</div>

  // Role-based dashboard logic
  const isAdmin = user?.role === "admin" || user?.role === "project_manager"
  const roleLabel = isAdmin ? (user?.role === "admin" ? "Admin" : "Project Manager") : "Team Member"

  // Calculate stats
  const teamMemberCount = members.length
  const activeProjectCount = projects.length
  const recentCheckins = checkins.slice(0, 5)
  // Example: calculate check-in rate (dummy logic, adjust as needed)
  const checkinRate = teamMemberCount ? Math.round((checkins.length / (teamMemberCount * 30)) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard <span className="ml-2 text-base font-normal text-muted-foreground">({roleLabel})</span></h2>
          <p className="text-muted-foreground">
            {user ? (
              <>Welcome back, {user.name}! {isAdmin ? "Here’s an overview of your team’s wellbeing." : "Here’s your personal wellbeing overview."}</>
            ) : (
              <>Welcome back! Here&apos;s an overview of your team&apos;s wellbeing.</>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/checkin">
              Daily Check-in
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          {isAdmin ? (
            <div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{teamMemberCount}</div>
                    <p className="text-xs text-muted-foreground">Total members</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Check-in Rate</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{checkinRate}%</div>
                    <p className="text-xs text-muted-foreground">(est. this month)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
                    <Smile className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">-</div>
                    <p className="text-xs text-muted-foreground">(coming soon)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{activeProjectCount}</div>
                    <p className="text-xs text-muted-foreground">Total projects</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Team Mood Overview</CardTitle>
                    <CardDescription>Daily mood distribution for the past week</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[200px] w-full bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground">
                      Mood Chart Visualization
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Today&apos;s Mood</CardTitle>
                    <CardDescription>Current team mood distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* You can map real mood data here if available */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Smile className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">Happy</span>
                          </div>
                          <span className="text-sm text-muted-foreground">-</span>
                        </div>
                        <Progress value={0} className="h-2 bg-muted" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Meh className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">Neutral</span>
                          </div>
                          <span className="text-sm text-muted-foreground">-</span>
                        </div>
                        <Progress value={0} className="h-2 bg-muted" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Frown className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium">Stressed</span>
                          </div>
                          <span className="text-sm text-muted-foreground">-</span>
                        </div>
                        <Progress value={0} className="h-2 bg-muted" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/mood">View detailed mood dashboard</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Check-ins</CardTitle>
                    <CardDescription>Latest team member check-ins</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentCheckins.map((c, i) => (
                        <div key={c.id || i} className="flex items-center gap-4 rounded-lg border p-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <Smile className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">{members.find(m => m.id === c.userId)?.name || 'Member'}</p>
                            <p className="text-xs text-muted-foreground">{c.mood || '-'}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">{c.createdAt ? new Date(c.createdAt).toLocaleTimeString() : ''}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/checkin">View all check-ins</Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Team Comfort Tips</CardTitle>
                    <CardDescription>Recommended wellbeing tips for your team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">Take regular breaks</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Encourage team members to take short breaks every hour to reduce eye strain and mental fatigue.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">Team check-in meeting</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Schedule a 15-minute team check-in to discuss progress and address any blockers.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <h3 className="font-medium">Mindfulness session</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Consider a short guided meditation session to help reduce team stress levels.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/dashboard/tips">View all tips</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Your Mood History</CardTitle>
                  <CardDescription>Track your mood over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                  <div className="text-muted-foreground">Personal Mood Chart</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Check-ins</CardTitle>
                  <CardDescription>Your latest check-ins</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {checkins.filter(c => c.userId === user?.id).slice(0, 5).map((c, i) => (
                      <div key={c.id || i} className="flex items-center gap-2">
                        <Smile className="h-4 w-4 text-green-500" />
                        <span>{c.mood || '-'}</span>
                        <span className="text-xs">{c.createdAt ? new Date(c.createdAt).toLocaleTimeString() : ''}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Projects</CardTitle>
                  <CardDescription>Projects you are involved in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {projects.filter(p => (p.teams || []).some((t: any) => (t.members || []).includes(user?.id))).map((p, i) => (
                      <div key={p.id || i}>{p.name}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Mood Analysis</CardTitle>
              <CardDescription>Mood trends and patterns over the past week</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
              <div className="text-muted-foreground">Weekly Mood Chart</div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Correlation between mood and productivity</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                <div className="text-muted-foreground">Performance Chart</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Wellbeing Factors</CardTitle>
                <CardDescription>Key factors affecting team wellbeing</CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                <div className="text-muted-foreground">Factors Chart</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Absence Report</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">Absence rate this month</p>
                <div className="mt-4 h-[100px] w-full bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground">
                  Absence Chart
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/reports">View full report</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Mood Report</CardTitle>
                <Smile className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">+5%</div>
                <p className="text-xs text-muted-foreground">Improvement in team mood</p>
                <div className="mt-4 h-[100px] w-full bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground">
                  Mood Trend Chart
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/reports">View full report</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Project Status</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">Projects on schedule</p>
                <div className="mt-4 h-[100px] w-full bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground">
                  Project Status Chart
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/dashboard/projects">View projects</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Report Summary</CardTitle>
              <CardDescription>Key metrics and insights for the current month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Team Wellbeing Score</div>
                    <div className="text-2xl font-bold">78/100</div>
                    <Progress value={78} className="h-2" />
                    <div className="text-xs text-muted-foreground">+3 points since last month</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Productivity Score</div>
                    <div className="text-2xl font-bold">82/100</div>
                    <Progress value={82} className="h-2" />
                    <div className="text-xs text-muted-foreground">+5 points since last month</div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Key Insights</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Team mood has improved consistently over the past 3 weeks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Check-in compliance rate has reached an all-time high of 92%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Project completion rate has improved by 12% since implementing mood tracking</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/reports">Generate detailed report</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
