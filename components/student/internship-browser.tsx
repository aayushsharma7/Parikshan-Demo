"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Building2, Search, Filter, Heart, Share, Calendar, DollarSign } from "lucide-react"

const mockInternships = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    company: "TechStart Solutions",
    location: "Bangalore, India",
    duration: "6 months",
    stipend: "₹25,000/month",
    type: "Full-time",
    posted: "2 days ago",
    deadline: "2024-02-15",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    description: "Join our dynamic team to build cutting-edge web applications using modern technologies.",
    logo: "/tech-startup-logo.png",
    saved: false,
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Analytics Pro",
    location: "Mumbai, India",
    duration: "4 months",
    stipend: "₹30,000/month",
    type: "Full-time",
    posted: "1 week ago",
    deadline: "2024-02-20",
    skills: ["Python", "Machine Learning", "SQL", "Tableau"],
    description: "Work with large datasets and build predictive models for business insights.",
    logo: "/analytics-company-logo.png",
    saved: true,
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Creative Studio",
    location: "Delhi, India",
    duration: "3 months",
    stipend: "₹20,000/month",
    type: "Part-time",
    posted: "3 days ago",
    deadline: "2024-02-10",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    description: "Design intuitive user experiences for mobile and web applications.",
    logo: "/design-studio-logo.png",
    saved: false,
  },
  {
    id: 4,
    title: "Mobile App Developer Intern",
    company: "AppCraft Inc.",
    location: "Hyderabad, India",
    duration: "5 months",
    stipend: "₹28,000/month",
    type: "Full-time",
    posted: "5 days ago",
    deadline: "2024-02-25",
    skills: ["React Native", "Flutter", "iOS", "Android"],
    description: "Develop cross-platform mobile applications for various client projects.",
    logo: "/mobile-app-logo.png",
    saved: false,
  },
]

export function InternshipBrowser() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("All Locations")
  const [durationFilter, setDurationFilter] = useState("All Durations")
  const [savedInternships, setSavedInternships] = useState<number[]>([2])

  const toggleSave = (id: number) => {
    setSavedInternships((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredInternships = mockInternships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesLocation = locationFilter === "All Locations" || internship.location.includes(locationFilter)
    const matchesDuration = durationFilter === "All Durations" || internship.duration.includes(durationFilter)

    return matchesSearch && matchesLocation && matchesDuration
  })

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find Your Perfect Internship</CardTitle>
          <CardDescription>Search and filter through available internship opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Locations">All Locations</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                <SelectItem value="Pune">Pune</SelectItem>
              </SelectContent>
            </Select>
            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Durations">All Durations</SelectItem>
                <SelectItem value="3">3 months</SelectItem>
                <SelectItem value="4">4 months</SelectItem>
                <SelectItem value="5">5 months</SelectItem>
                <SelectItem value="6">6 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{filteredInternships.length} internships found</h2>
          <Select defaultValue="recent">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="relevant">Most Relevant</SelectItem>
              <SelectItem value="stipend">Highest Stipend</SelectItem>
              <SelectItem value="deadline">Deadline Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={internship.logo || "/placeholder.svg"} alt={internship.company} />
                      <AvatarFallback>
                        <Building2 className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{internship.title}</h3>
                      <p className="text-muted-foreground mb-2">{internship.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {internship.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {internship.duration}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {internship.stipend}
                        </div>
                        <Badge variant="outline">{internship.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{internship.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {internship.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSave(internship.id)}
                      className={savedInternships.includes(internship.id) ? "text-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 ${savedInternships.includes(internship.id) ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Posted {internship.posted}</span>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Deadline: {internship.deadline}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
