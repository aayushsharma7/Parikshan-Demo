"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, TrendingUp, FileText, Users, Plus, Eye, Star, Briefcase } from "lucide-react"

const mockInternships = [
  {
    id: 1,
    title: "Software Developer Intern",
    department: "Engineering",
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹25,000/month",
    status: "active",
    applications: 45,
    selected: 2,
    posted: "2024-01-10",
    deadline: "2024-02-15",
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    department: "Analytics",
    location: "Mumbai, India",
    duration: "4 months",
    stipend: "₹30,000/month",
    status: "draft",
    applications: 0,
    selected: 0,
    posted: null,
    deadline: "2024-02-20",
  },
  {
    id: 3,
    title: "Marketing Intern",
    department: "Marketing",
    location: "Delhi, India",
    duration: "3 months",
    stipend: "₹20,000/month",
    status: "closed",
    applications: 67,
    selected: 3,
    posted: "2024-01-05",
    deadline: "2024-01-30",
  },
]

const mockCandidates = [
  {
    id: 1,
    name: "Priya Sharma",
    university: "IIT Delhi",
    course: "Computer Science",
    year: "3rd Year",
    skills: ["React", "Node.js", "Python"],
    appliedFor: "Software Developer Intern",
    status: "interview",
    rating: 4.5,
    avatar: "/student-avatar-1.png",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    university: "NIT Bangalore",
    course: "Information Technology",
    year: "4th Year",
    skills: ["Java", "Spring Boot", "MySQL"],
    appliedFor: "Software Developer Intern",
    status: "shortlisted",
    rating: 4.2,
    avatar: "/student-avatar-2.png",
  },
  {
    id: 3,
    name: "Ananya Patel",
    university: "BITS Pilani",
    course: "Data Science",
    year: "3rd Year",
    skills: ["Python", "Machine Learning", "SQL"],
    appliedFor: "Data Analyst Intern",
    status: "applied",
    rating: 4.7,
    avatar: "/student-avatar-3.png",
  },
]

const mockActiveInterns = [
  {
    id: 1,
    name: "Vikram Singh",
    position: "Software Developer Intern",
    startDate: "2024-01-15",
    progress: 75,
    mentor: "John Doe",
    performance: "Excellent",
    avatar: "/intern-avatar-1.png",
  },
  {
    id: 2,
    name: "Sneha Reddy",
    position: "Marketing Intern",
    startDate: "2024-01-20",
    progress: 60,
    mentor: "Jane Smith",
    performance: "Good",
    avatar: "/intern-avatar-2.png",
  },
]

export function IndustryDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "interview":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "shortlisted":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "applied":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Excellent":
        return "text-green-600"
      case "Good":
        return "text-blue-600"
      case "Average":
        return "text-yellow-600"
      case "Poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="w-full max-w-full overflow-hidden space-y-4 sm:space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Active Internships</CardTitle>
            <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">112</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Active Interns</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">94%</div>
            <Progress value={94} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Posted Internships */}
        <Card>
          <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <CardTitle className="text-base sm:text-lg">Posted Internships</CardTitle>
              <CardDescription className="text-sm">Manage your internship listings</CardDescription>
            </div>
            <Button size="sm" className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Post New
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {mockInternships.map((internship) => (
              <div
                key={internship.id}
                className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 p-2 sm:p-3 border rounded-lg"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <p className="text-xs sm:text-sm font-medium leading-none">{internship.title}</p>
                    <Badge className={`${getStatusColor(internship.status)} self-start sm:self-center`}>
                      {internship.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{internship.department}</p>
                  <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">{internship.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {internship.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {internship.applications} applications
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 self-end sm:self-center">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Candidates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Recent Candidates</CardTitle>
            <CardDescription className="text-sm">Review and manage candidate applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {mockCandidates.map((candidate) => (
              <div key={candidate.id} className="flex items-start space-x-3 p-2 sm:p-3 border rounded-lg">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                  <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                  <AvatarFallback>
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <p className="text-xs sm:text-sm font-medium leading-none truncate">{candidate.name}</p>
                    <div className="flex items-center self-start sm:self-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="text-xs">{candidate.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {candidate.course}, {candidate.year} - {candidate.university}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <p className="text-xs text-muted-foreground truncate">Applied for: {candidate.appliedFor}</p>
                    <Badge className={`${getStatusColor(candidate.status)} self-start sm:self-center`}>
                      {candidate.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent text-sm">
              View All Candidates
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Interns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Active Interns</CardTitle>
          <CardDescription className="text-sm">Monitor intern progress and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {mockActiveInterns.map((intern) => (
              <div key={intern.id} className="p-3 sm:p-4 border rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                    <AvatarImage src={intern.avatar || "/placeholder.svg"} alt={intern.name} />
                    <AvatarFallback>
                      {intern.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium truncate">{intern.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{intern.position}</p>
                  </div>
                  <Badge className={`${getPerformanceColor(intern.performance)} text-xs`}>{intern.performance}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{intern.progress}%</span>
                  </div>
                  <Progress value={intern.progress} className="h-2" />
                  <div className="flex flex-col space-y-1 sm:flex-row sm:justify-between sm:space-y-0 text-xs text-muted-foreground">
                    <span>Started: {intern.startDate}</span>
                    <span>Mentor: {intern.mentor}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent text-xs">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent text-xs">
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
          <CardDescription className="text-sm">Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Button className="justify-start bg-transparent text-xs sm:text-sm" variant="outline">
              <Plus className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Post Internship
            </Button>
            <Button className="justify-start bg-transparent text-xs sm:text-sm" variant="outline">
              <Users className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Review Applications
            </Button>
            <Button className="justify-start bg-transparent text-xs sm:text-sm" variant="outline">
              <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Schedule Interviews
            </Button>
            <Button className="justify-start bg-transparent text-xs sm:text-sm" variant="outline">
              <FileText className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Generate Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
