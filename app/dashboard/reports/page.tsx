"use client"

import { useState } from "react"
import { BarChart3, Calendar, ChevronDown, Download, FileDown, Filter, Meh, Smile, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function ReportsPage() {
  const [reportType, setReportType] = useState("mood")
  const [reportPeriod, setReportPeriod] = useState("weekly")
  const [team, setTeam] = useState("all")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerateReport = () => {
    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "Report generated",
        description: `Your ${reportPeriod} ${reportType} report has been generated successfully.`,
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">Generate and view team wellbeing and performance reports</p>
        </div>
      </div>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>Create a custom report based on your requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mood">Mood Analysis</SelectItem>
                      <SelectItem value="absence">Absence Report</SelectItem>
                      <SelectItem value="performance">Team Performance</SelectItem>
                      <SelectItem value="wellbeing">Wellbeing Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-period">Time Period</Label>
                  <Select value={reportPeriod} onValueChange={setReportPeriod}>
                    <SelectTrigger id="report-period">
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {reportPeriod === "custom" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="team-select">Team</Label>
                <Select value={team} onValueChange={setTeam}>
                  <SelectTrigger id="team-select">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    <SelectItem value="development">Development Team</SelectItem>
                    <SelectItem value="design">Design Team</SelectItem>
                    <SelectItem value="marketing">Marketing Team</SelectItem>
                    <SelectItem value="product">Product Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-format">Report Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger id="report-format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                    <SelectItem value="dashboard">Interactive Dashboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-options">Additional Options</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="include-charts" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="include-charts" className="text-sm">
                      Include Charts and Graphs
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="include-recommendations" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="include-recommendations" className="text-sm">
                      Include Recommendations
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="compare-previous" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="compare-previous" className="text-sm">
                      Compare with Previous Period
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="anonymize" className="h-4 w-4 rounded border-gray-300" />
                    <label htmlFor="anonymize" className="text-sm">
                      Anonymize Individual Data
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Template</Button>
              <Button onClick={handleGenerateReport} disabled={isGenerating}>
                {isGenerating ? (
                  "Generating..."
                ) : (
                  <>
                    <FileDown className="mr-2 h-4 w-4" />
                    Generate Report
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Quickly generate reports using saved templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Weekly Mood Summary", type: "mood", period: "weekly" },
                    { name: "Monthly Absence Report", type: "absence", period: "monthly" },
                    { name: "Quarterly Team Performance", type: "performance", period: "quarterly" },
                  ].map((template, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {template.type.charAt(0).toUpperCase() + template.type.slice(1)} •{" "}
                          {template.period.charAt(0).toUpperCase() + template.period.slice(1)}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Use Template
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Insights</CardTitle>
                <CardDescription>Tips for effective reporting and analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Mood Trends Analysis</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Look for patterns in mood data across different days of the week to identify potential stress
                      points.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Absence Correlation</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Analyze the relationship between team mood and absence rates to identify potential wellbeing
                      issues.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Comparative Analysis</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Compare current data with previous periods to track improvements and identify areas needing
                      attention.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search reports..." className="pl-8 w-[300px]" />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>All Reports</DropdownMenuItem>
                  <DropdownMenuItem>Mood Reports</DropdownMenuItem>
                  <DropdownMenuItem>Absence Reports</DropdownMenuItem>
                  <DropdownMenuItem>Performance Reports</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              {
                name: "Weekly Mood Report - May 2023",
                type: "mood",
                date: "May 28, 2023",
                team: "All Teams",
                icon: Smile,
              },
              {
                name: "Monthly Absence Report - May 2023",
                type: "absence",
                date: "May 31, 2023",
                team: "Development Team",
                icon: Users,
              },
              {
                name: "Quarterly Performance Report - Q1 2023",
                type: "performance",
                date: "April 5, 2023",
                team: "All Teams",
                icon: BarChart3,
              },
              {
                name: "Weekly Mood Report - April 2023",
                type: "mood",
                date: "April 30, 2023",
                team: "Design Team",
                icon: Meh,
              },
              {
                name: "Monthly Wellbeing Summary - April 2023",
                type: "wellbeing",
                date: "April 30, 2023",
                team: "Marketing Team",
                icon: Smile,
              },
            ].map((report, i) => {
              const Icon = report.icon
              return (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                        <Icon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium">{report.name}</h3>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <span>{report.type.charAt(0).toUpperCase() + report.type.slice(1)}</span>
                          <span>•</span>
                          <span>{report.team}</span>
                          <span>•</span>
                          <span>Generated on {report.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Report</DropdownMenuItem>
                            <DropdownMenuItem>Share Report</DropdownMenuItem>
                            <DropdownMenuItem>Regenerate</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Manage your automated report generation schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Weekly Mood Summary",
                    frequency: "Weekly",
                    day: "Monday",
                    time: "9:00 AM",
                    recipients: "Team Leads",
                    status: "Active",
                  },
                  {
                    name: "Monthly Absence Report",
                    frequency: "Monthly",
                    day: "1st",
                    time: "8:00 AM",
                    recipients: "Management Team",
                    status: "Active",
                  },
                  {
                    name: "Quarterly Performance Report",
                    frequency: "Quarterly",
                    day: "1st of quarter",
                    time: "9:00 AM",
                    recipients: "Executive Team",
                    status: "Active",
                  },
                ].map((schedule, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <h3 className="font-medium">{schedule.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        {schedule.frequency} • {schedule.day} • {schedule.time}
                      </div>
                      <div className="text-sm text-muted-foreground">Recipients: {schedule.recipients}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          schedule.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {schedule.status}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                          <DropdownMenuItem>Pause Schedule</DropdownMenuItem>
                          <DropdownMenuItem>Run Now</DropdownMenuItem>
                          <DropdownMenuItem>Delete Schedule</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Missing component imports
const Search = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const MoreHorizontal = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
)
