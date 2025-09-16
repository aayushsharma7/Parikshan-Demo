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
    <div className="w-full max-w-full overflow-hidden space-y-4 sm:space-y-6">
      {/* Search and Filters */}
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">Find Your Perfect Internship</CardTitle>
          <CardDescription className="text-sm">
            Search and filter through available internship opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full sm:w-40">
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
              <SelectTrigger className="w-full sm:w-40">
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
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              <span className="sm:hidden">Filters</span>
              <span className="hidden sm:inline">More Filters</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="w-full space-y-4">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h2 className="text-base sm:text-lg font-semibold">{filteredInternships.length} internships found</h2>
          <Select defaultValue="recent">
            <SelectTrigger className="w-full sm:w-48">
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

        <div className="w-full space-y-4">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} className="w-full hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  {/* Header section */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                        <AvatarImage src={internship.logo || "/placeholder.svg"} alt={internship.company} />
                        <AvatarFallback>
                          <Building2 className="h-4 w-4 sm:h-6 sm:w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold mb-1 truncate">{internship.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 truncate">{internship.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSave(internship.id)}
                        className={`h-8 w-8 p-0 ${savedInternships.includes(internship.id) ? "text-red-500" : ""}`}
                      >
                        <Heart
                          className={`h-4 w-4 ${savedInternships.includes(internship.id) ? "fill-current" : ""}`}
                        />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Details section */}
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:space-y-0 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{internship.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span>{internship.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span>{internship.stipend}</span>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {internship.type}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{internship.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {internship.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs px-2 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Footer section */}
                  <div className="pt-3 border-t space-y-3 sm:space-y-0">
                    <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                      <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 text-xs text-muted-foreground">
                        <span>Posted {internship.posted}</span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Deadline: {internship.deadline}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                          View Details
                        </Button>
                        <Button size="sm" className="flex-1 sm:flex-none">
                          Apply Now
                        </Button>
                      </div>
                    </div>
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
