"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  FileText,
  Star,
  Building,
  MessageSquare,
  Eye,
} from "lucide-react"

const mockStudents = [
  {
    id: 1,
    name: "Priya Sharma",
    rollNumber: "CS21B1001",
    course: "Computer Science",
    year: "3rd Year",
    internshipTitle: "Software Developer Intern",
    company: "TechCorp Solutions",
    status: "active",
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    supervisor: "Dr. Rajesh Kumar",
    weeklyReports: 12,
    pendingReports: 1,
    rating: 4.5,
    avatar: "/student-avatar-1.png",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    rollNumber: "IT21B1002",
    course: "Information Technology",
    year: "4th Year",
    internshipTitle: "Full Stack Developer",
    company: "InnovateLabs",
    status: "active",
    progress: 60,
    startDate: "2024-02-01",
    endDate: "2024-07-01",
    supervisor: "Dr. Priya Patel",
    weeklyReports: 8,
    pendingReports: 0,
    rating: 4.2,
    avatar: "/student-avatar-2.png",
  },
  {
    id: 3,
    name: "Ananya Patel",
    rollNumber: "DS21B1003",
    course: "Data Science",
    year: "3rd Year",
    internshipTitle: "Data Analyst Intern",
    company: "DataViz Inc",
    status: "completed",
    progress: 100,
    startDate: "2023-12-01",
    endDate: "2024-05-01",
    supervisor: "Dr. Amit Singh",
    weeklyReports: 20,
    pendingReports: 0,
    rating: 4.8,
    avatar: "/student-avatar-3.png",
  },
  {
    id: 4,
    name: "Vikram Singh",
    rollNumber: "ME21B1004",
    course: "Mechanical Engineering",
    year: "4th Year",
    internshipTitle: "Design Engineer",
    company: "AutoTech Motors",
    status: "pending",
    progress: 0,
    startDate: "2024-03-01",
    endDate: "2024-08-01",
    supervisor: "Dr. Neha Gupta",
    weeklyReports: 0,
    pendingReports: 0,
    rating: 0,
    avatar: "/student-avatar-4.png",
  },
]

const mockRecentActivities = [
  {
    id: 1,
    type: "report_submitted",
    student: "Priya Sharma",
    message: "submitted weekly report #12",
    time: "2 hours ago",
    urgent: false,
  },
  {
    id: 2,
    type: "report_overdue",
    student: "Rahul Kumar",
    message: "weekly report is overdue",
    time: "1 day ago",
    urgent: true,
  },
  {
    id: 3,
    type: "internship_completed",
    student: "Ananya Patel",
    message: "completed internship successfully",
    time: "3 days ago",
    urgent: false,
  },
  {
    id: 4,
    type: "approval_needed",
    student: "Vikram Singh",
    message: "internship application needs approval",
    time: "5 days ago",
    urgent: true,
  },
]

export function FacultyDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<(typeof mockStudents)[0] | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "report_submitted":
        return <FileText className="h-4 w-4 text-green-600" />
      case "report_overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "internship_completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "approval_needed":
        return <Clock className="h-4 w-4 text-orange-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const activeStudents = mockStudents.filter((s) => s.status === "active").length
  const completedInternships = mockStudents.filter((s) => s.status === "completed").length
  const pendingApprovals = mockStudents.filter((s) => s.status === "pending").length
  const overdueReports = mockStudents.reduce((acc, s) => acc + s.pendingReports, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Faculty Coordinator Dashboard</h1>
        <p className="text-muted-foreground mt-2">Monitor student progress and manage internship programs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Internships</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeStudents}</div>
            <p className="text-xs text-muted-foreground">Currently ongoing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedInternships}</div>
            <p className="text-xs text-muted-foreground">Successfully finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Reports</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueReports}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Student Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>Monitor and manage student internships</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="active">Active ({activeStudents})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedInternships})</TabsTrigger>
                  <TabsTrigger value="pending">Pending ({pendingApprovals})</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4">
                  {mockStudents
                    .filter((student) => student.status === "active")
                    .map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {student.rollNumber} • {student.course}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Building className="h-3 w-3" />
                              <span className="text-xs">{student.company}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="flex items-center space-x-2">
                            <Progress value={student.progress} className="w-20" />
                            <span className="text-sm font-medium">{student.progress}%</span>
                          </div>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>{selectedStudent?.name} - Internship Details</DialogTitle>
                                  <DialogDescription>
                                    Complete overview of student internship progress
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedStudent && (
                                  <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                      <Avatar className="h-16 w-16">
                                        <AvatarImage
                                          src={selectedStudent.avatar || "/placeholder.svg"}
                                          alt={selectedStudent.name}
                                        />
                                        <AvatarFallback>
                                          {selectedStudent.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                                        <p className="text-muted-foreground">
                                          {selectedStudent.rollNumber} • {selectedStudent.course}
                                        </p>
                                        <div className="flex items-center mt-1">
                                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                          <span>{selectedStudent.rating} rating</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                      <div>
                                        <h4 className="font-semibold mb-2">Internship Details</h4>
                                        <div className="space-y-2 text-sm">
                                          <p>
                                            <strong>Position:</strong> {selectedStudent.internshipTitle}
                                          </p>
                                          <p>
                                            <strong>Company:</strong> {selectedStudent.company}
                                          </p>
                                          <p>
                                            <strong>Duration:</strong> {selectedStudent.startDate} to{" "}
                                            {selectedStudent.endDate}
                                          </p>
                                          <p>
                                            <strong>Supervisor:</strong> {selectedStudent.supervisor}
                                          </p>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold mb-2">Progress Overview</h4>
                                        <div className="space-y-2">
                                          <div className="flex justify-between">
                                            <span className="text-sm">Overall Progress</span>
                                            <span className="text-sm font-medium">{selectedStudent.progress}%</span>
                                          </div>
                                          <Progress value={selectedStudent.progress} />
                                          <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="text-center">
                                              <p className="text-2xl font-bold text-green-600">
                                                {selectedStudent.weeklyReports}
                                              </p>
                                              <p className="text-xs text-muted-foreground">Reports Submitted</p>
                                            </div>
                                            <div className="text-center">
                                              <p className="text-2xl font-bold text-red-600">
                                                {selectedStudent.pendingReports}
                                              </p>
                                              <p className="text-xs text-muted-foreground">Pending Reports</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex space-x-2">
                                      <Button className="flex-1">
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Send Message
                                      </Button>
                                      <Button variant="outline" className="flex-1 bg-transparent">
                                        <FileText className="h-4 w-4 mr-2" />
                                        View Reports
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            {student.pendingReports > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {student.pendingReports} overdue
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  {mockStudents
                    .filter((student) => student.status === "completed")
                    .map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {student.rollNumber} • {student.course}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Building className="h-3 w-3" />
                              <span className="text-xs">{student.company}</span>
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs">{student.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(student.status)}>Completed</Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {student.weeklyReports} reports submitted
                          </p>
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                  {mockStudents
                    .filter((student) => student.status === "pending")
                    .map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {student.rollNumber} • {student.course}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Building className="h-3 w-3" />
                              <span className="text-xs">{student.company}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${
                      activity.urgent ? "bg-red-50 dark:bg-red-950/20" : "bg-muted/50"
                    }`}
                  >
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.student}</span> {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    {activity.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Generate Progress Report
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Review Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
