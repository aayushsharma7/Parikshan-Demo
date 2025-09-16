"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const skillOptions = [
  "JavaScript",
  "Python",
  "Java",
  "React",
  "Node.js",
  "Angular",
  "Vue.js",
  "TypeScript",
  "PHP",
  "C++",
  "C#",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "HTML/CSS",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "Git",
  "Machine Learning",
  "Data Science",
  "UI/UX Design",
  "Figma",
  "Adobe Creative Suite",
  "Digital Marketing",
  "Content Writing",
  "SEO",
  "Social Media Marketing",
]

export function PostInternship() {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    description: "",
    requirements: "",
    location: "",
    locationType: "onsite",
    duration: "",
    stipend: "",
    positions: "1",
    applicationDeadline: undefined as Date | undefined,
    startDate: undefined as Date | undefined,
    skills: [] as string[],
    benefits: [] as string[],
    isRemote: false,
    isPartTime: false,
  })

  const [customSkill, setCustomSkill] = useState("")
  const [customBenefit, setCustomBenefit] = useState("")

  const handleSkillAdd = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] })
    }
  }

  const handleSkillRemove = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) })
  }

  const handleCustomSkillAdd = () => {
    if (customSkill.trim() && !formData.skills.includes(customSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, customSkill.trim()] })
      setCustomSkill("")
    }
  }

  const handleBenefitAdd = (benefit: string) => {
    if (!formData.benefits.includes(benefit)) {
      setFormData({ ...formData, benefits: [...formData.benefits, benefit] })
    }
  }

  const handleBenefitRemove = (benefit: string) => {
    setFormData({ ...formData, benefits: formData.benefits.filter((b) => b !== benefit) })
  }

  const handleCustomBenefitAdd = () => {
    if (customBenefit.trim() && !formData.benefits.includes(customBenefit.trim())) {
      setFormData({ ...formData, benefits: [...formData.benefits, customBenefit.trim()] })
      setCustomBenefit("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  const commonBenefits = [
    "Flexible working hours",
    "Work from home options",
    "Mentorship program",
    "Certificate of completion",
    "Letter of recommendation",
    "Full-time job opportunity",
    "Training and workshops",
    "Health insurance",
    "Free meals",
    "Transportation allowance",
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Post New Internship</CardTitle>
          <CardDescription>Create a new internship opportunity for students</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Internship Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Software Developer Intern"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="research">Research & Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the internship role, responsibilities, and what the intern will learn..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements *</Label>
              <Textarea
                id="requirements"
                placeholder="List the qualifications, skills, and experience required..."
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={3}
                required
              />
            </div>

            {/* Location and Type */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Bangalore, India"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="locationType">Location Type *</Label>
                <Select
                  value={formData.locationType}
                  onValueChange={(value) => setFormData({ ...formData, locationType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Duration and Compensation */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 month</SelectItem>
                    <SelectItem value="2">2 months</SelectItem>
                    <SelectItem value="3">3 months</SelectItem>
                    <SelectItem value="4">4 months</SelectItem>
                    <SelectItem value="5">5 months</SelectItem>
                    <SelectItem value="6">6 months</SelectItem>
                    <SelectItem value="12">12 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stipend">Stipend (₹/month)</Label>
                <Input
                  id="stipend"
                  placeholder="e.g., 25000"
                  value={formData.stipend}
                  onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="positions">Number of Positions *</Label>
                <Input
                  id="positions"
                  type="number"
                  min="1"
                  value={formData.positions}
                  onChange={(e) => setFormData({ ...formData, positions: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Application Deadline *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.applicationDeadline && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.applicationDeadline ? format(formData.applicationDeadline, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.applicationDeadline}
                      onSelect={(date) => setFormData({ ...formData, applicationDeadline: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Expected Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => setFormData({ ...formData, startDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <Label>Required Skills</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleSkillRemove(skill)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="Add custom skill"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleCustomSkillAdd())}
                />
                <Button type="button" variant="outline" onClick={handleCustomSkillAdd}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <Button
                    key={skill}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleSkillAdd(skill)}
                    disabled={formData.skills.includes(skill)}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <Label>Benefits & Perks</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.benefits.map((benefit) => (
                  <Badge key={benefit} variant="secondary" className="flex items-center gap-1">
                    {benefit}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleBenefitRemove(benefit)} />
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="Add custom benefit"
                  value={customBenefit}
                  onChange={(e) => setCustomBenefit(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleCustomBenefitAdd())}
                />
                <Button type="button" variant="outline" onClick={handleCustomBenefitAdd}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {commonBenefits.map((benefit) => (
                  <Button
                    key={benefit}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleBenefitAdd(benefit)}
                    disabled={formData.benefits.includes(benefit)}
                  >
                    {benefit}
                  </Button>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="partTime"
                  checked={formData.isPartTime}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPartTime: checked as boolean })}
                />
                <Label htmlFor="partTime">Part-time internship</Label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-6">
              <Button type="button" variant="outline" className="flex-1 bg-transparent">
                Save as Draft
              </Button>
              <Button type="submit" className="flex-1">
                Post Internship
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
