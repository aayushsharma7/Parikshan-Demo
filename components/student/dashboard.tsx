"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  TrendingUp,
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  Award,
  BookOpen,
} from "lucide-react"

const mockInternships = [
  {
    id: 1,
    title: "Software Developer Intern",
    company: "Tech Corp Inc.",
    location: "Bangalore, India",
    duration: "3 months",
    status: "applied",
    appliedDate: "2024-01-15",
    logo: "/abstract-tech-logo.png",
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "Analytics Pro",
    location: "Mumbai, India",
    duration: "6 months",
    status: "interview",
    appliedDate: "2024-01-10",
    logo: "/analytics-company-logo.png",
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Design Studio",
    location: "Delhi, India",
    duration: "4 months",
    status: "accepted",
    appliedDate: "2024-01-05",
    logo: "/generic-company-logo.png",
  },
]

const mockRecommendations = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    company: "StartupXYZ",
    location: "Hyderabad, India",
    match: 95,
    skills: ["React", "Node.js", "MongoDB"],
    logo: "/abstract-startup-logo.png",
  },
  {
    id: 2,
    title: "Machine Learning Intern",
    company: "AI Solutions",
    location: "Pune, India",
    match: 88,
    skills: ["Python", "TensorFlow", "Data Science"],
    logo: "/ai-company-logo.png",
  },
]

const mockUpcomingEvents = [
  {
    id: 1,
    title: "Interview with Tech Corp",
    date: "2024-01-20",
    time: "2:00 PM",
    type: "interview",
  },
  {
    id: 2,
    title: "Skill Assessment Test",
    date: "2024-01-22",
    time: "10:00 AM",
    type: "assessment",
  },
  {
    id: 3,
    title: "Career Fair",
    date: "2024-01-25",
    time: "9:00 AM",
    type: "event",
  },
]

export function StudentDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "interview":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "interview":
        return <Users className="h-4 w-4" />
      case "assessment":
        return <FileText className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-balance">Welcome back, Student!</h1>
        <p className="text-muted-foreground mt-2">Track your internship journey and discover new opportunities.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92</div>
            <p className="text-xs text-muted-foreground">Above average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Track your internship application status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockInternships.map((internship) => (
              <div
                key={internship.id}
                className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={internship.logo || "/placeholder.svg"} alt={internship.company} />
                  <AvatarFallback>
                    <Building2 className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-medium leading-none truncate">{internship.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{internship.company}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{internship.location}</span>
                    <Clock className="h-3 w-3 ml-2 flex-shrink-0" />
                    <span>{internship.duration}</span>
                  </div>
                </div>
                <Badge className={`${getStatusColor(internship.status)} flex-shrink-0`}>{internship.status}</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              View All Applications
            </Button>
          </CardContent>
        </Card>

        {/* Recommended Internships */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>AI-powered internship matches based on your profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRecommendations.map((rec) => (
              <div key={rec.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={rec.logo || "/placeholder.svg"} alt={rec.company} />
                      <AvatarFallback>
                        <Building2 className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{rec.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{rec.company}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="flex-shrink-0">
                    {rec.match}% match
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{rec.location}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {rec.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button size="sm" className="w-full">
                  Apply Now
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              View More Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your schedule for the next few days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockUpcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0">{getEventIcon(event.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{event.title}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    <span>{event.date}</span>
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="flex-shrink-0 bg-transparent">
                  View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Update Resume
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Complete Skill Assessment
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Schedule Mock Interview
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Award className="mr-2 h-4 w-4" />
              View Certificates
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Track Progress
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Internship Journey Progress</CardTitle>
          <CardDescription>Track your progress through the internship process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Profile Setup</p>
                <p className="text-xs text-muted-foreground">Complete your profile and upload resume</p>
              </div>
              <Badge variant="secondary" className="flex-shrink-0">
                Completed
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Skill Assessment</p>
                <p className="text-xs text-muted-foreground">Take skill tests to improve matching</p>
              </div>
              <Badge variant="secondary" className="flex-shrink-0">
                Completed
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Apply to Internships</p>
                <p className="text-xs text-muted-foreground">Submit applications to relevant positions</p>
              </div>
              <Badge variant="outline" className="flex-shrink-0">
                In Progress
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Interview Process</p>
                <p className="text-xs text-muted-foreground">Attend interviews and assessments</p>
              </div>
              <Badge variant="outline" className="flex-shrink-0">
                Pending
              </Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Start Internship</p>
                <p className="text-xs text-muted-foreground">Begin your internship journey</p>
              </div>
              <Badge variant="outline" className="flex-shrink-0">
                Pending
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
