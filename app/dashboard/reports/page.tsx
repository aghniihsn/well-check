"use client"

import { useEffect, useState } from "react"
import { BarChart3, Calendar, ChevronDown, Download, FileDown, Filter, Meh, Smile, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { api } from "@/lib/api"

export default function ReportsPage() {
  const [reportType, setReportType] = useState("mood")
  const [reportPeriod, setReportPeriod] = useState("weekly")
  const [team, setTeam] = useState("all")
  const [isGenerating, setIsGenerating] = useState(false)
  const [teams, setTeams] = useState<any[]>([])
  const [savedReports, setSavedReports] = useState<any[]>([])
  const { toast } = useToast()


useEffect(() => {
  api.teams.getAll().then(setTeams)
  api.reports.getAll().then(setSavedReports)
}, [])

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    try {
      // Kirim request ke backend untuk generate report
      const payload = {
        type: reportType,
        period: reportPeriod,
        teamId: team !== "all" ? team : undefined,
        // Tambahkan field lain sesuai kebutuhan (format, options, date range, dsb)
      }
      await api.reports.generate(payload)
      toast({
        title: "Report generated",
        description: `Your ${reportPeriod} ${reportType} report has been generated successfully.`,
      })
    } catch (err: any) {
      toast({
        title: "Failed to generate report",
        description: err?.message || "An error occurred while generating the report.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
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
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team-select">Team</Label>
                <Select value={team} onValueChange={setTeam}>
                  <SelectTrigger id="team-select">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    {teams.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
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
            </CardContent>
            <CardFooter className="flex justify-between">
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
            {savedReports.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">No reports found.</div>
            ) : (
              savedReports.map((report, i) => {
                return (
                  <Card key={report.id || i}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                          <Smile className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium">{report.title || report.name}</h3>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            <span>{report.data?.type || report.type}</span>
                            <span>•</span>
                            <span>{report.teamId || "All Teams"}</span>
                            <span>•</span>
                            <span>Generated on {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : (report.date ? new Date(report.date).toLocaleDateString() : "-")}</span>
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
              })
            )}
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
const Search = ({ className, ...props }: { className?: string; [key: string]: any }) => (
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

const MoreHorizontal = ({ className, ...props }: { className?: string; [key: string]: any }) => (
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
