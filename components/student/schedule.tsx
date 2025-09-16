"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, FileText, Video, MapPin } from "lucide-react"

const mockEvents = [
  {
    id: 1,
    title: "Interview with Tech Corp",
    type: "interview",
    date: "2024-01-20",
    time: "2:00 PM - 3:00 PM",
    location: "Virtual Meeting",
    company: "Tech Corp Inc.",
    description: "Technical interview for Software Developer Intern position",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Skill Assessment Test",
    type: "assessment",
    date: "2024-01-22",
    time: "10:00 AM - 12:00 PM",
    location: "Online Platform",
    company: "Analytics Pro",
    description: "Python and SQL assessment for Data Analyst role",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Career Fair",
    type: "event",
    date: "2024-01-25",
    time: "9:00 AM - 5:00 PM",
    location: "University Campus",
    company: "Multiple Companies",
    description: "Annual career fair with 50+ companies",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Mock Interview Session",
    type: "training",
    date: "2024-01-18",
    time: "3:00 PM - 4:00 PM",
    location: "Career Center",
    company: "University",
    description: "Practice interview with career counselor",
    status: "completed",
  },
]

export function StudentSchedule() {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "interview":
        return <Users className="h-4 w-4" />
      case "assessment":
        return <FileText className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "training":
        return <Video className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "interview":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "assessment":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "event":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "training":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const upcomingEvents = mockEvents.filter((event) => event.status === "upcoming")
  const completedEvents = mockEvents.filter((event) => event.status === "completed")

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-balance">My Schedule</h1>
        <p className="text-muted-foreground mt-2">Manage your interviews, assessments, and events</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your scheduled activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getEventIcon(event.type)}
                    <h3 className="font-semibold">{event.title}</h3>
                  </div>
                  <Badge className={getEventColor(event.type)}>{event.type}</Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{event.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  {event.type === "interview" && <Button size="sm">Join Meeting</Button>}
                </div>
              </div>
            ))}

            {upcomingEvents.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No upcoming events scheduled</p>
            )}
          </CardContent>
        </Card>

        {/* Completed Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your completed events and activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedEvents.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg opacity-75">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getEventIcon(event.type)}
                    <h3 className="font-semibold">{event.title}</h3>
                  </div>
                  <Badge variant="secondary">Completed</Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{event.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}

            {completedEvents.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No completed events yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
