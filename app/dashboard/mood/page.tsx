"use client"

import { useState } from "react"
import { CalendarIcon, ChevronDown, Download, Filter, Frown, Meh, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"

export default function MoodDashboardPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [team, setTeam] = useState<string>("All Teams")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Mood Dashboard</h2>
          <p className="text-muted-foreground">Monitor and analyze your team&apos;s emotional wellbeing</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left md:w-auto">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                {team}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTeam("All Teams")}>All Teams</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTeam("Development")}>Development</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTeam("Design")}>Design</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTeam("Marketing")}>Marketing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Trends</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Mood Distribution</CardTitle>
                <CardDescription>Today&apos;s team mood breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-4">
                  <div className="h-40 w-40 rounded-full border-8 border-muted bg-muted/30 flex items-center justify-center relative">
                    <div className="text-center">
                      <div className="text-2xl font-bold">75%</div>
                      <div className="text-xs text-muted-foreground">Positive</div>
                    </div>
                    <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-green-100 border-4 border-background flex items-center justify-center">
                      <Smile className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 h-10 w-10 rounded-full bg-yellow-100 border-4 border-background flex items-center justify-center">
                      <Meh className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-red-100 border-4 border-background flex items-center justify-center">
                      <Frown className="h-4 w-4 text-red-500" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-md bg-green-100 p-2">
                    <div className="font-medium text-green-700">Happy</div>
                    <div className="text-green-700">65%</div>
                  </div>
                  <div className="rounded-md bg-yellow-100 p-2">
                    <div className="font-medium text-yellow-700">Neutral</div>
                    <div className="text-yellow-700">25%</div>
                  </div>
                  <div className="rounded-md bg-red-100 p-2">
                    <div className="font-medium text-red-700">Stressed</div>
                    <div className="text-red-700">10%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Team Mood Map</CardTitle>
                <CardDescription>Individual mood status for {format(date, "MMMM d, yyyy")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {Array.from({ length: 9 }).map((_, i) => {
                    const moodType = i % 3 === 0 ? "happy" : i % 3 === 1 ? "neutral" : "stressed"
                    const MoodIcon = moodType === "happy" ? Smile : moodType === "neutral" ? Meh : Frown
                    const moodColor =
                      moodType === "happy"
                        ? "bg-green-100 text-green-700"
                        : moodType === "neutral"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"

                    return (
                      <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                        <div className="flex-shrink-0">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${moodColor}`}>
                            <MoodIcon className="h-5 w-5" />
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">Team Member {i + 1}</div>
                          <div className="text-xs text-muted-foreground">
                            {moodType === "happy"
                              ? "Feeling great"
                              : moodType === "neutral"
                                ? "Doing okay"
                                : "Feeling stressed"}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mood Factors Analysis</CardTitle>
              <CardDescription>Key factors affecting team mood today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground">
                Mood Factors Chart
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Comments</CardTitle>
                <CardDescription>Recent check-in comments from team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const moodType = i % 3 === 0 ? "happy" : i % 3 === 1 ? "neutral" : "stressed"
                    const MoodIcon = moodType === "happy" ? Smile : moodType === "neutral" ? Meh : Frown
                    const moodColor =
                      moodType === "happy"
                        ? "text-green-500"
                        : moodType === "neutral"
                          ? "text-yellow-500"
                          : "text-red-500"

                    return (
                      <div key={i} className="rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <MoodIcon className={`h-4 w-4 ${moodColor}`} />
                          <span className="font-medium">Team Member {i + 1}</span>
                          <span className="ml-auto text-xs text-muted-foreground">{i * 30 + 10} min ago</span>
                        </div>
                        <p className="mt-2 text-sm">
                          {moodType === "happy"
                            ? "Feeling productive today! The team meeting was really helpful in clarifying our goals."
                            : moodType === "neutral"
                              ? "Just a regular day. Working through my tasks at a steady pace."
                              : "Feeling a bit overwhelmed with the current deadline. Could use some support."}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription>Suggested interventions based on mood data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Team Check-in Meeting</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Schedule a 15-minute team check-in to address concerns about the current project deadline.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Schedule
                    </Button>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Workload Redistribution</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Consider redistributing tasks among team members to alleviate stress points.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      View Recommendations
                    </Button>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Wellness Break</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Encourage a 15-minute wellness break for the team to reduce stress levels.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Send Notification
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Mood Trends</CardTitle>
              <CardDescription>Team mood patterns over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground">
                Weekly Mood Trend Chart
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Day-by-Day Breakdown</CardTitle>
                <CardDescription>Mood distribution for each day of the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, i) => (
                    <div key={day} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{day}</span>
                        <div className="flex items-center gap-2">
                          <Smile className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-muted-foreground">{70 - i * 5}%</span>
                          <Meh className="h-4 w-4 text-yellow-500" />
                          <span className="text-xs text-muted-foreground">{20 + i * 2}%</span>
                          <Frown className="h-4 w-4 text-red-500" />
                          <span className="text-xs text-muted-foreground">{10 + i * 3}%</span>
                        </div>
                      </div>
                      <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="bg-green-500" style={{ width: `${70 - i * 5}%` }} />
                        <div className="bg-yellow-500" style={{ width: `${20 + i * 2}%` }} />
                        <div className="bg-red-500" style={{ width: `${10 + i * 3}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weekly Insights</CardTitle>
                <CardDescription>Key observations from this week&apos;s mood data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Mood Decline on Thursday</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      There was a noticeable decline in team mood on Thursday, coinciding with the project deadline
                      announcement.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Morning vs Afternoon Patterns</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Team members consistently report better moods in the morning compared to afternoon check-outs.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Correlation with Workload</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      There appears to be a strong correlation between reported workload and negative mood indicators.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Mood Analysis</CardTitle>
              <CardDescription>Long-term mood trends and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center text-muted-foreground">
                Monthly Mood Analysis Chart
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Mood Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="text-3xl font-bold text-green-500">+12%</div>
                  <p className="text-sm text-muted-foreground">Improvement in positive mood indicators</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Stress Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="text-3xl font-bold text-red-500">-8%</div>
                  <p className="text-sm text-muted-foreground">Decrease in reported stress levels</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Check-in Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="text-3xl font-bold">92%</div>
                  <p className="text-sm text-muted-foreground">Average daily check-in rate</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Report Summary</CardTitle>
              <CardDescription>Key findings and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Key Findings</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="rounded-full bg-green-100 p-1">
                        <Smile className="h-4 w-4 text-green-500" />
                      </span>
                      <span>Overall team mood has improved by 12% compared to last month</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="rounded-full bg-yellow-100 p-1">
                        <Meh className="h-4 w-4 text-yellow-500" />
                      </span>
                      <span>Mondays and Fridays show the most fluctuation in mood patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="rounded-full bg-red-100 p-1">
                        <Frown className="h-4 w-4 text-red-500" />
                      </span>
                      <span>Project deadlines continue to be the primary source of stress</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Recommendations</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">1</span>
                      <span>Implement more frequent but shorter team check-ins to distribute workload more evenly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">2</span>
                      <span>
                        Consider introducing wellness activities on Monday mornings to start the week positively
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="rounded-full bg-primary/10 p-1 text-primary">3</span>
                      <span>Review project planning process to better manage deadline-related stress</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
