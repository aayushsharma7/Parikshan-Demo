"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
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
  Send,
  Plus,
  MessageSquare,
  Users,
  Clock,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Star,
} from "lucide-react"

const mockConversations = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    role: "Faculty Supervisor",
    avatar: "/placeholder.svg",
    lastMessage: "Please submit your weekly progress report by Friday.",
    timestamp: "2 hours ago",
    unread: 2,
    online: true,
    type: "individual",
  },
  {
    id: 2,
    name: "TechCorp HR Team",
    role: "Industry Partner",
    avatar: "/generic-company-logo.png",
    lastMessage: "Congratulations! Your internship application has been approved.",
    timestamp: "1 day ago",
    unread: 0,
    online: false,
    type: "individual",
  },
  {
    id: 3,
    name: "Internship Cohort 2024",
    role: "Group Chat",
    avatar: "/placeholder.svg",
    lastMessage: "Priya: Has anyone completed the orientation module?",
    timestamp: "3 hours ago",
    unread: 5,
    online: true,
    type: "group",
    members: 12,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Industry Mentor",
    avatar: "/placeholder.svg",
    lastMessage: "Great work on the project! Let's schedule a review meeting.",
    timestamp: "5 hours ago",
    unread: 1,
    online: true,
    type: "individual",
  },
  {
    id: 5,
    name: "Academic Coordinators",
    role: "Faculty Group",
    avatar: "/placeholder.svg",
    lastMessage: "Dr. Patel: New internship guidelines have been updated.",
    timestamp: "1 day ago",
    unread: 0,
    online: false,
    type: "group",
    members: 8,
  },
]

const mockMessages = [
  {
    id: 1,
    sender: "Dr. Rajesh Kumar",
    content: "Hi Priya, I hope your internship is going well. Please submit your weekly progress report by Friday.",
    timestamp: "2:30 PM",
    isOwn: false,
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    sender: "You",
    content: "Hello Dr. Kumar, yes the internship is going great! I'll submit the report by Thursday evening.",
    timestamp: "2:45 PM",
    isOwn: true,
    avatar: "/student-avatar-1.png",
  },
  {
    id: 3,
    sender: "Dr. Rajesh Kumar",
    content:
      "Excellent! Also, don't forget about the mid-term evaluation meeting next week. I'll send you the calendar invite.",
    timestamp: "3:00 PM",
    isOwn: false,
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    sender: "You",
    content: "Thank you for the reminder. I'm looking forward to discussing my progress and getting your feedback.",
    timestamp: "3:15 PM",
    isOwn: true,
    avatar: "/student-avatar-1.png",
  },
]

export function MessageHub() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)

  const filteredConversations = mockConversations.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message logic here
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const totalUnread = mockConversations.reduce((acc, conv) => acc + conv.unread, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Communication Hub</h1>
          <p className="text-muted-foreground mt-2">Stay connected with supervisors, mentors, and peers</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-sm">
            {totalUnread} unread
          </Badge>
          <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start New Conversation</DialogTitle>
                <DialogDescription>Search for faculty, mentors, or create a group chat</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search people..." className="pl-10" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Suggested Contacts</h4>
                  <div className="space-y-2">
                    {["Dr. Priya Patel", "Industry Mentor - John Smith", "Academic Coordinator"].map((contact) => (
                      <div
                        key={contact}
                        className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {contact
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{contact}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid gap-6 lg:grid-cols-3 h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Messages</span>
              <MessageSquare className="h-5 w-5" />
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="space-y-1 p-4">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation.id === conversation.id
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                        <AvatarFallback>
                          {conversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{conversation.name}</h4>
                        <div className="flex items-center space-x-1">
                          {conversation.type === "group" && <Users className="h-3 w-3 text-muted-foreground" />}
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.role}</p>
                      <p className="text-sm text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge variant="destructive" className="text-xs min-w-[1.25rem] h-5">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage
                      src={selectedConversation.avatar || "/placeholder.svg"}
                      alt={selectedConversation.name}
                    />
                    <AvatarFallback>
                      {selectedConversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConversation.online && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedConversation.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.type === "group"
                      ? `${selectedConversation.members} members`
                      : selectedConversation.online
                        ? "Online"
                        : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[calc(100vh-24rem)] p-4">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${message.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                      <AvatarFallback>
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 ${message.isOwn ? "text-right" : ""}`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <div
                        className={`inline-block p-3 rounded-lg max-w-[80%] ${
                          message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex items-end space-x-2">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[2.5rem] max-h-32 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
              </div>
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Supervisor
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              Join Study Group
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Star className="h-4 w-4 mr-2" />
              Contact Mentor
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Dr. Kumar sent a message</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Added to Cohort 2024 group</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span>New message from HR Team</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Communication Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Conversations</span>
                <span className="font-medium">{mockConversations.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Unread Messages</span>
                <span className="font-medium text-red-600">{totalUnread}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Chats</span>
                <span className="font-medium text-green-600">{mockConversations.filter((c) => c.online).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
