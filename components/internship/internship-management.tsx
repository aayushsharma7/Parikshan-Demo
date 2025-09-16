"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Plus,
  Building,
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

const mockInternships = [
  {
    id: 1,
    title: "Software Developer Intern",
    company: "TechCorp Solutions",
    companyLogo: "/generic-company-logo.png",
    location: "Bangalore, India",
    type: "Full-time",
    duration: "6 months",
    stipend: "₹25,000/month",
    description: "Work on cutting-edge web applications using React, Node.js, and cloud technologies.",
    requirements: ["React.js", "Node.js", "JavaScript", "Git"],
    postedDate: "2024-01-15",
    deadline: "2024-02-15",
    status: "active",
    applicants: 45,
    selected: 2,
    category: "Technology",
    experience: "Fresher",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "DataViz Inc",
    companyLogo: "/analytics-company-logo.png",
    location: "Mumbai, India",
    type: "Part-time",
    duration: "4 months",
    stipend: "₹20,000/month",
    description: "Analyze large datasets and create insightful visualizations for business intelligence.",
    requirements: ["Python", "SQL", "Tableau", "Statistics"],
    postedDate: "2024-01-10",
    deadline: "2024-02-10",
    status: "active",
    applicants: 32,
    selected: 1,
    category: "Analytics",
    experience: "Fresher",
    rating: 4.3,
  },
  {
    id: 3,
    title: "Marketing Intern",
    company: "BrandBoost Agency",
    companyLogo: "/abstract-startup-logo.png",
    location: "Delhi, India",
    type: "Full-time",
    duration: "3 months",
    stipend: "₹15,000/month",
    description: "Support digital marketing campaigns and social media management.",
    requirements: ["Digital Marketing", "Social Media", "Content Writing", "Analytics"],
    postedDate: "2024-01-05",
    deadline: "2024-01-25",
    status: "expired",
    applicants: 28,
    selected: 0,
    category: "Marketing",
    experience: "Fresher",
    rating: 4.1,
  },
  {
    id: 4,
    title: "UI/UX Design Intern",
    company: "DesignStudio Pro",
    companyLogo: "/abstract-tech-logo.png",
    location: "Pune, India",
    type: "Full-time",
    duration: "5 months",
    stipend: "₹22,000/month",
    description: "Create user-centered designs for web and mobile applications.",
    requirements: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    postedDate: "2024-01-20",
    deadline: "2024-03-01",
    status: "draft",
    applicants: 0,
    selected: 0,
    category: "Design",
    experience: "Fresher",
    rating: 4.7,
  },
]

export function InternshipManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedInternship, setSelectedInternship] = useState<(typeof mockInternships)[0] | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "closed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "draft":
        return <Edit className="h-4 w-4" />
      case "expired":
        return <XCircle className="h-4 w-4" />
      case "closed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const filteredInternships = mockInternships.filter((internship) => {
    const matchesSearch =
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.requirements.some((req) => req.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || internship.status === statusFilter
    const matchesCategory = categoryFilter === "all" || internship.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const internshipsByStatus = {
    all: filteredInternships,
    active: filteredInternships.filter((i) => i.status === "active"),
    draft: filteredInternships.filter((i) => i.status === "draft"),
    expired: filteredInternships.filter((i) => i.status === "expired"),
    closed: filteredInternships.filter((i) => i.status === "closed"),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Internship Management</h1>
          <p className="text-muted-foreground mt-2">Manage and oversee all internship opportunities</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Internship
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Internship</DialogTitle>
              <DialogDescription>Add a new internship opportunity to the platform</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="title">Internship Title</Label>
                  <Input id="title" placeholder="e.g., Software Developer Intern" />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Company name" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, Country" />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="e.g., 6 months" />
                </div>
                <div>
                  <Label htmlFor="stipend">Stipend</Label>
                  <Input id="stipend" placeholder="e.g., ₹25,000/month" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the internship role and responsibilities" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>Create Internship</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Internships</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockInternships.length}</div>
            <p className="text-xs text-muted-foreground">All opportunities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{internshipsByStatus.active.length}</div>
            <p className="text-xs text-muted-foreground">Currently accepting applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockInternships.reduce((acc, internship) => acc + internship.applicants, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all internships</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placements</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {mockInternships.reduce((acc, internship) => acc + internship.selected, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Students placed</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find specific internships quickly</CardDescription>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Internships Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({internshipsByStatus.all.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({internshipsByStatus.active.length})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({internshipsByStatus.draft.length})</TabsTrigger>
          <TabsTrigger value="expired">Expired ({internshipsByStatus.expired.length})</TabsTrigger>
          <TabsTrigger value="closed">Closed ({internshipsByStatus.closed.length})</TabsTrigger>
        </TabsList>

        {Object.entries(internshipsByStatus).map(([status, internships]) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <div className="grid gap-4">
              {internships.map((internship) => (
                <Card key={internship.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={internship.companyLogo || "/placeholder.svg"} alt={internship.company} />
                          <AvatarFallback>
                            {internship.company
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{internship.title}</h3>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-sm">{internship.rating}</span>
                              </div>
                              <Badge className={getStatusColor(internship.status)}>
                                <div className="flex items-center space-x-1">
                                  {getStatusIcon(internship.status)}
                                  <span>{internship.status}</span>
                                </div>
                              </Badge>
                            </div>
                          </div>
                          <div className="grid gap-2 md:grid-cols-2">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Building className="h-4 w-4 mr-2" />
                              {internship.company}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-2" />
                              {internship.location}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-2" />
                              {internship.duration} • {internship.type}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2" />
                              Deadline: {internship.deadline}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="font-medium text-primary">{internship.stipend}</span>
                            <Badge variant="outline">{internship.category}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {internship.requirements.slice(0, 4).map((req) => (
                              <Badge key={req} variant="secondary" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                            {internship.requirements.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{internship.requirements.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{internship.applicants} applicants</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                          <span>{internship.selected} selected</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedInternship(internship)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{selectedInternship?.title}</DialogTitle>
                              <DialogDescription>Complete internship details and management options</DialogDescription>
                            </DialogHeader>
                            {selectedInternship && (
                              <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                  <Avatar className="h-16 w-16">
                                    <AvatarImage
                                      src={selectedInternship.companyLogo || "/placeholder.svg"}
                                      alt={selectedInternship.company}
                                    />
                                    <AvatarFallback>
                                      {selectedInternship.company
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-xl font-semibold">{selectedInternship.title}</h3>
                                    <p className="text-muted-foreground">{selectedInternship.company}</p>
                                    <div className="flex items-center mt-1">
                                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                      <span>{selectedInternship.rating} rating</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <h4 className="font-semibold mb-2">Internship Details</h4>
                                    <div className="space-y-1 text-sm">
                                      <p>
                                        <strong>Location:</strong> {selectedInternship.location}
                                      </p>
                                      <p>
                                        <strong>Duration:</strong> {selectedInternship.duration}
                                      </p>
                                      <p>
                                        <strong>Type:</strong> {selectedInternship.type}
                                      </p>
                                      <p>
                                        <strong>Stipend:</strong> {selectedInternship.stipend}
                                      </p>
                                      <p>
                                        <strong>Category:</strong> {selectedInternship.category}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Application Stats</h4>
                                    <div className="space-y-1 text-sm">
                                      <p>
                                        <strong>Posted:</strong> {selectedInternship.postedDate}
                                      </p>
                                      <p>
                                        <strong>Deadline:</strong> {selectedInternship.deadline}
                                      </p>
                                      <p>
                                        <strong>Applicants:</strong> {selectedInternship.applicants}
                                      </p>
                                      <p>
                                        <strong>Selected:</strong> {selectedInternship.selected}
                                      </p>
                                      <p>
                                        <strong>Status:</strong>
                                        <Badge className={`ml-2 ${getStatusColor(selectedInternship.status)}`}>
                                          {selectedInternship.status}
                                        </Badge>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Description</h4>
                                  <p className="text-sm text-muted-foreground">{selectedInternship.description}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Requirements</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedInternship.requirements.map((req) => (
                                      <Badge key={req} variant="secondary">
                                        {req}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button className="flex-1">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Internship
                                  </Button>
                                  <Button variant="outline" className="flex-1 bg-transparent">
                                    <Users className="h-4 w-4 mr-2" />
                                    View Applications
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
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
