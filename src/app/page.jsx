"use client"

import React, { useEffect, useState } from "react"
import {
  Bell,
  Book,
  Check,
  ChevronDown,
  Code,
  FileText,
  GitPullRequest,
  Lock,
  Play,
  Plus,
  Search,
  Settings,
  Shield,
  Star,
  Menu,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

const filterOptions = [
  { label: "Open issues and pull requests", value: "open" },
  { label: "Your issues", value: "your-issues" },
  { label: "Your pull requests", value: "your-prs" },
  { label: "Everything assigned to you", value: "assigned" },
  { label: "Everything mentioning you", value: "mentioned" },
]

export default function PullRequestPage() {
  const [pullRequests, setPullRequests] = useState([])
  const [filter, setFilter] = useState("open")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchAllPRs = async () => {
      setLoading(true)
      try {
        const [openResponse, closedResponse] = await Promise.all([
          fetch("/api/?state=open"),
          fetch("/api/?state=closed"),
        ])

        const [openData, closedData] = await Promise.all([openResponse.json(), closedResponse.json()])

        setPullRequests([...openData, ...closedData])
      } catch (err) {
        setError(err.message || "Error fetching pull requests")
      } finally {
        setLoading(false)
      }
    }

    fetchAllPRs()
  }, [])

  const filteredPullRequests = pullRequests
    .filter((pr) => (filter === "all" ? true : pr.state === filter))
    .filter((pr) => pr.title.toLowerCase().includes(searchTerm.toLowerCase()))

  // Calculate counts for open and closed PRs
  const openCount = pullRequests.filter((pr) => pr.state === "open").length
  const closedCount = pullRequests.filter((pr) => pr.state === "closed").length

  const NAV_ITEMS = [
    { icon: Code, label: "Code", href: "#" },
    { icon: FileText, label: "Issues", href: "#" },
    { icon: GitPullRequest, label: "Pull requests", href: "#", count: 1, active: true },
    { icon: Play, label: "Actions", href: "#" },
    { icon: Book, label: "Projects", href: "#" },
    { icon: Shield, label: "Security", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ]

  return (
    <div className="bg-[#0d1117] text-white min-h-screen">
      {/* Top Navigation */}
      <header className="bg-[#161b22] border-b border-[#30363d]">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5 text-[#c9d1d9]" />
              </Button>
              <svg
                height="32"
                aria-hidden="true"
                viewBox="0 0 16 16"
                version="1.1"
                width="32"
                data-view-component="true"
                className="text-white fill-current"
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
              <Button variant="ghost" className="text-[#c9d1d9] hidden md:flex">
                <span className="text-sm font-semibold">john-zanecoder</span>
                <span className="mx-1">/</span>
                <span className="text-sm font-semibold">github-clone</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-[#c9d1d9] hidden md:flex">
                <Lock className="mr-2 h-4 w-4" />
                Public
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Input
                  placeholder="Type / to search"
                  className="w-72 bg-[#0d1117] text-white border-[#30363d] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] pl-8"
                />
                <kbd className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-[#30363d] bg-[#21262d] px-1.5 font-mono text-[10px] font-medium text-[#c9d1d9]">
                  /
                </kbd>
              </div>
              <Button variant="ghost" size="sm" className="text-[#c9d1d9]">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-[#c9d1d9] hidden md:flex">
                <Plus className="h-4 w-4" />
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <img
                  src="https://github.com/identicons/john-zanecoder.png"
                  alt="Profile"
                  className="h-5 w-5 rounded-full"
                />
              </Button>
            </div>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="border-b border-[#30363d] overflow-x-auto">
          <nav className="px-4 flex">
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={`px-4 py-2 text-sm border-b-2 rounded-none ${
                  item.active
                    ? "border-[#f78166] text-white font-semibold"
                    : "border-transparent text-[#8b949e] hover:border-[#30363d]"
                }`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
                {item.count !== undefined && (
                  <Badge variant="secondary" className="ml-2 bg-[#30363d] text-[#c9d1d9]">
                    {item.count}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-4 py-4">
        {/* Notice Banner */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#c9d1d9]">
              Now, GitHub will help potential first-time contributors{" "}
              <a href="#" className="text-[#58a6ff]">
                discover issues
              </a>{" "}
              labeled with{" "}
              <span className="bg-[#238636] text-white px-2 py-0.5 rounded-full text-xs">good first issue</span>
            </p>
            <Button variant="ghost" size="sm" className="text-[#8b949e]">
              Dismiss
            </Button>
          </div>
        </div>

        {/* Search and Actions Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Left side with Search and Filters */}
          <div className="flex-1 flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#21262d] text-[#c9d1d9] border-[#30363d] hover:bg-[#30363d] hover:border-[#8b949e]"
                >
                  Filters
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px] bg-[#161b22] border-[#30363d]">
                {filterOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    className="text-[#c9d1d9] focus:bg-[#30363d] hover:bg-[#30363d] py-2"
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
                <Separator className="my-2 bg-[#30363d]" />
                <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#30363d] hover:bg-[#30363d] py-2">
                  <div className="flex items-center">
                    <span className="flex-1">View advanced search syntax</span>
                    <kbd className="ml-auto bg-[#30363d] px-2 py-1 rounded text-xs">?</kbd>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative flex-1">
              <Input
                placeholder="Search all issues"
                className="w-full bg-[#0d1117] text-white border-[#30363d] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8b949e]" />
            </div>
          </div>

          {/* Right side with Labels, Milestones, and New PR button */}
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" className="text-[#c9d1d9] hover:bg-[#21262d]">
              Labels{" "}
              <Badge variant="secondary" className="ml-2 bg-[#30363d]">
                9
              </Badge>
            </Button>
            <Button variant="ghost" className="text-[#c9d1d9] hover:bg-[#21262d]">
              Milestones{" "}
              <Badge variant="secondary" className="ml-2 bg-[#30363d]">
                0
              </Badge>
            </Button>
            <Button className="bg-[#238636] text-white hover:bg-[#2ea043]">New pull request</Button>
          </div>
        </div>

        {/* Pull Requests List */}
        <div className="rounded-lg border border-[#30363d] bg-[#161b22] mb-4">
          {/* List Header with Open/Closed counts */}
          <div className="border-b border-[#30363d] p-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className={`flex items-center px-3 py-1 ${
                  filter === "open" ? "text-white font-semibold" : "text-[#8b949e]"
                }`}
                onClick={() => setFilter("open")}
              >
                <GitPullRequest className="mr-2 h-4 w-4" />
                {openCount} Open
              </Button>
              <Button
                variant="ghost"
                className={`flex items-center px-3 py-1 ${
                  filter === "closed" ? "text-white font-semibold" : "text-[#8b949e]"
                }`}
                onClick={() => setFilter("closed")}
              >
                <Check className="mr-2 h-4 w-4" />
                {closedCount} Closed
              </Button>
            </div>
          </div>

          {/* Filter Options Bar */}
          <div className="border-b border-[#30363d] bg-[#161b22]">
            <div className="flex flex-wrap items-center gap-2 p-3">
              {["Author", "Label", "Projects", "Milestones", "Reviews", "Assignee", "Sort"].map((filterOption) => (
                <DropdownMenu key={filterOption}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-[#c9d1d9] hover:bg-[#21262d]">
                      {filterOption} <ChevronDown className="ml-2 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#161b22] border-[#30363d]">
                    <DropdownMenuItem className="text-[#c9d1d9] focus:bg-[#30363d]">
                      {filterOption === "Sort" ? "Newest first" : `No ${filterOption.toLowerCase()}`}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </div>
          </div>

          {/* Pull Request Items */}
          {error ? (
            <div className="p-4 text-center text-[#ff7b72]">{error}</div>
          ) : loading ? (
            <div className="p-4 text-center text-[#8b949e]">Loading...</div>
          ) : filteredPullRequests.length === 0 ? (
            <div className="p-4 text-center text-[#8b949e]">No {filter} pull requests match your search.</div>
          ) : (
            <div className="divide-y divide-[#30363d]">
              {filteredPullRequests.map((pr) => (
                <div key={pr.id} className="flex items-start p-4 hover:bg-[#1c2129] gap-3">
                  <Checkbox className="mt-1" />
                  <GitPullRequest
                    className={`h-4 w-4 mt-1 flex-shrink-0 ${
                      pr.state === "open" ? "text-[#238636]" : "text-[#8957e5]"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="font-semibold text-[#58a6ff] hover:underline truncate">{pr.title}</h3>
                    </div>
                    <p className="text-sm text-[#8b949e] mt-1">
                      #{pr.number} opened {new Date(pr.created_at).toLocaleDateString()} by {pr.user.login}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ProTip */}
        <div className="text-center mb-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-[#8b949e] text-sm">
                  ProTip! Notify someone on an issue with a mention, like: @john-zanecoder
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#161b22] border-[#30363d] text-[#c9d1d9]">
                <p>Mention a user to notify them</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#30363d] py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8b949e]">
            <div className="flex items-center gap-2">
              <svg
                height="24"
                aria-hidden="true"
                viewBox="0 0 16 16"
                version="1.1"
                width="24"
                data-view-component="true"
                className="text-[#8b949e] fill-current"
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
              <span>© 2025 GitHub, Inc.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="hover:text-[#58a6ff] hover:underline">
                Terms
              </a>
              <a href="#" className="hover:text-[#58a6ff] hover:underline">
                Privacy
              </a>
              <a href="#" className="hover:text-[#58a6ff] hover:underline">
                Security
              </a>
              <a href="#" className="hover:text-[#58a6ff] hover:underline">
                Status
              </a>
              <a href="#" className="hover:text-[#58a6ff] hover:underline">
                Docs
              </a>
              <a href="#" className="hover:text-[#58a6ff] hover:underline">
                Contact
              </a>
              <a href="#" className="hover:text-[#58a6ff] hover:underline">
                Manage cookies
              </a>
              <a href="#" className="hover:text-[#58a6ff] hover:underline">
                Do not share my personal information
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

