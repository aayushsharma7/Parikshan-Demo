"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Star, MapPin, GraduationCap, Calendar, Phone, Mail, Download, MessageSquare } from "lucide-react"

const mockCandidates = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 9876543210",
    university: "IIT Delhi",
    course: "Computer Science Engineering",
    year: "3rd Year",
    cgpa: "8.9",
    skills: ["React", "Node.js", "Python", "MongoDB", "JavaScript", "TypeScript"],
    appliedFor: "Software Developer Intern",
    appliedDate: "2024-01-15",
    status: "interview",
    rating: 4.5,
    experience: "2 years",
    projects: 5,
    avatar: "/student-avatar-1.png",
    resume: "/resume-priya.pdf",
    portfolio: "https://priya-portfolio.com",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    email: "rahul.kumar@email.com",
    phone: "+91 9876543211",
    university: "NIT Bangalore",
    course: "Information Technology",
    year: "4th Year",
    cgpa: "8.5",
    skills: ["Java", "Spring Boot", "MySQL", "AWS", "Docker", "Kubernetes"],
    appliedFor: "Software Developer Intern",
    appliedDate: "2024-01-12",
    status: "shortlisted",
    rating: 4.2,
    experience: "1.5 years",
    projects: 4,
    avatar: "/student-avatar-2.png",
    resume: "/resume-rahul.pdf",
    portfolio: "https://rahul-dev.com",
  },
  {
    id: 3,
    name: "Ananya Patel",
    email: "ananya.patel@email.com",
    phone: "+91 9876543212",
    university: "BITS Pilani",
    course: "Data Science",
    year: "3rd Year",
    cgpa: "9.2",
    skills: ["Python", "Machine Learning", "SQL", "Tableau", "TensorFlow", "Pandas"],
    appliedFor: "Data Analyst Intern",
    appliedDate: "2024-01-10",
    status: "applied",
    rating: 4.7,
    experience: "1 year",
    projects: 6,
    avatar: "/student-avatar-3.png",
    resume: "/resume-ananya.pdf",
    portfolio: "https://ananya-data.com",
  },
  {
    id: 4,
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 9876543213",
    university: "IIT Bombay",
    course: "Mechanical Engineering",
    year: "4th Year",
    cgpa: "8.7",
    skills: ["AutoCAD", "SolidWorks", "MATLAB", "Python", "Project Management"],
    appliedFor: "Engineering Intern",
    appliedDate: "2024-01-08",
    status: "rejected",
    rating: 3.8,
    experience: "6 months",
    projects: 3,
    avatar: "/student-avatar-4.png",
    resume: "/resume-vikram.pdf",
    portfolio: null,
  },
]

export function CandidateManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [positionFilter, setPositionFilter] = useState("all")
  const [selectedCandidate, setSelectedCandidate] = useState<(typeof mockCandidates)[0] | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "interview":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "shortlisted":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "applied":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "selected":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter
    const matchesPosition = positionFilter === "all" || candidate.appliedFor.includes(positionFilter)

    return matchesSearch && matchesStatus && matchesPosition
  })

  const candidatesByStatus = {
    all: filteredCandidates,
    applied: filteredCandidates.filter((c) => c.status === "applied"),
    shortlisted: filteredCandidates.filter((c) => c.status === "shortlisted"),
    interview: filteredCandidates.filter((c) => c.status === "interview"),
    selected: filteredCandidates.filter((c) => c.status === "selected"),
    rejected: filteredCandidates.filter((c) => c.status === "rejected"),
  }

  const handleStatusChange = (candidateId: number, newStatus: string) => {
    // Handle status change logic here
    console.log(`Changing candidate ${candidateId} status to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Management</CardTitle>
          <CardDescription>Review and manage internship applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, university, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="selected">Selected</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="Software Developer">Software Developer</SelectItem>
                <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All ({candidatesByStatus.all.length})</TabsTrigger>
          <TabsTrigger value="applied">Applied ({candidatesByStatus.applied.length})</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted ({candidatesByStatus.shortlisted.length})</TabsTrigger>
          <TabsTrigger value="interview">Interview ({candidatesByStatus.interview.length})</TabsTrigger>
          <TabsTrigger value="selected">Selected ({candidatesByStatus.selected.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({candidatesByStatus.rejected.length})</TabsTrigger>
        </TabsList>

        {Object.entries(candidatesByStatus).map(([status, candidates]) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <div className="grid gap-4">
              {candidates.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                          <AvatarFallback>
                            {candidate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{candidate.name}</h3>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-sm">{candidate.rating}</span>
                              </div>
                              <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                            </div>
                          </div>
                          <div className="grid gap-2 md:grid-cols-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <GraduationCap className="h-4 w-4 mr-2" />
                              {candidate.course}, {candidate.year}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-2" />
                              {candidate.university}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2" />
                              Applied: {candidate.appliedDate}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              CGPA: {candidate.cgpa} | {candidate.experience} experience
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>Applied for:</span>
                            <Badge variant="outline">{candidate.appliedFor}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 6).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 6 && (
                              <Badge variant="secondary" className="text-xs">
                                +{candidate.skills.length - 6} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Resume
                        </Button>
                        {candidate.portfolio && (
                          <Button variant="outline" size="sm">
                            Portfolio
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedCandidate(candidate)}>
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{selectedCandidate?.name}</DialogTitle>
                              <DialogDescription>Candidate Profile Details</DialogDescription>
                            </DialogHeader>
                            {selectedCandidate && (
                              <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                  <Avatar className="h-16 w-16">
                                    <AvatarImage
                                      src={selectedCandidate.avatar || "/placeholder.svg"}
                                      alt={selectedCandidate.name}
                                    />
                                    <AvatarFallback>
                                      {selectedCandidate.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-xl font-semibold">{selectedCandidate.name}</h3>
                                    <p className="text-muted-foreground">{selectedCandidate.course}</p>
                                    <div className="flex items-center mt-1">
                                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                      <span>{selectedCandidate.rating} rating</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <h4 className="font-semibold mb-2">Contact Information</h4>
                                    <div className="space-y-1 text-sm">
                                      <div className="flex items-center">
                                        <Mail className="h-4 w-4 mr-2" />
                                        {selectedCandidate.email}
                                      </div>
                                      <div className="flex items-center">
                                        <Phone className="h-4 w-4 mr-2" />
                                        {selectedCandidate.phone}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Academic Details</h4>
                                    <div className="space-y-1 text-sm">
                                      <p>University: {selectedCandidate.university}</p>
                                      <p>Course: {selectedCandidate.course}</p>
                                      <p>Year: {selectedCandidate.year}</p>
                                      <p>CGPA: {selectedCandidate.cgpa}</p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Skills</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedCandidate.skills.map((skill) => (
                                      <Badge key={skill} variant="secondary">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button className="flex-1">Schedule Interview</Button>
                                  <Button variant="outline" className="flex-1 bg-transparent">
                                    Send Message
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Select
                          value={candidate.status}
                          onValueChange={(value) => handleStatusChange(candidate.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="applied">Applied</SelectItem>
                            <SelectItem value="shortlisted">Shortlisted</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                            <SelectItem value="selected">Selected</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
