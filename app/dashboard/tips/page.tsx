"use client"

import { useState } from "react"
import {
  BookOpen,
  Calendar,
  ChevronDown,
  Coffee,
  Filter,
  Heart,
  MessageSquare,
  Search,
  ThumbsUp,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Comfort tips yang lebih personal dan sederhana
const tips = [
  {
    id: 1,
    title: "Tarik Napas Dalam-dalam",
    description: "Ambil waktu sejenak untuk menenangkan diri dan tarik napas perlahan.",
    category: "wellness",
    likes: 12,
    isLiked: false,
  },
  {
    id: 2,
    title: "Lakukan Peregangan Ringan",
    description: "Bangun dari tempat duduk dan lakukan peregangan atau berjalan sebentar.",
    category: "wellness",
    likes: 15,
    isLiked: false,
  },
  {
    id: 3,
    title: "Minum Air Putih",
    description: "Pastikan tubuh tetap terhidrasi agar tetap fokus.",
    category: "wellness",
    likes: 10,
    isLiked: false,
  },
  {
    id: 4,
    title: "Dengarkan Musik Favorit",
    description: "Coba dengarkan lagu yang kamu suka untuk meningkatkan mood.",
    category: "wellness",
    likes: 8,
    isLiked: false,
  },
  {
    id: 5,
    title: "Ceritakan Perasaanmu",
    description: "Jika perlu, bicarakan perasaanmu ke teman atau rekan kerja.",
    category: "team",
    likes: 7,
    isLiked: false,
  },
  {
    id: 6,
    title: "Fokus pada Satu Tugas Kecil",
    description: "Kerjakan satu tugas kecil terlebih dahulu, lalu lanjutkan perlahan.",
    category: "productivity",
    likes: 9,
    isLiked: false,
  },
  {
    id: 7,
    title: "Jangan Lupa Tersenyum",
    description: "Hari yang baik akan datang, tetap semangat!",
    category: "wellness",
    likes: 11,
    isLiked: false,
  },
]

export default function TipsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [likedTips, setLikedTips] = useState<number[]>(tips.filter((tip) => tip.isLiked).map((tip) => tip.id))
  const { toast } = useToast()

  const filteredTips = tips.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "team") return matchesSearch && tip.category === "team"
    if (activeTab === "wellness") return matchesSearch && tip.category === "wellness"
    if (activeTab === "productivity") return matchesSearch && tip.category === "productivity"
    if (activeTab === "liked") return matchesSearch && likedTips.includes(tip.id)

    return matchesSearch
  })

  const handleLike = (tipId: number) => {
    if (likedTips.includes(tipId)) {
      setLikedTips(likedTips.filter((id) => id !== tipId))
      toast({
        title: "Tip removed from favorites",
        description: "The tip has been removed from your favorites.",
      })
    } else {
      setLikedTips([...likedTips, tipId])
      toast({
        title: "Tip added to favorites",
        description: "The tip has been added to your favorites.",
      })
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "team":
        return <Users className="h-4 w-4" />
      case "wellness":
        return <Heart className="h-4 w-4" />
      case "productivity":
        return <Calendar className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "team":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "wellness":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "productivity":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Comfort Tips</h2>
          <p className="text-muted-foreground">Recommendations to improve team wellbeing and productivity</p>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTips.map((tip) => (
              <Card key={tip.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle>{tip.title}</CardTitle>
                      <Badge
                        variant="secondary"
                        className={`flex w-fit items-center gap-1 ${getCategoryColor(tip.category)}`}
                      >
                        {getCategoryIcon(tip.category)}
                        <span className="capitalize">{tip.category}</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{tip.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    <span>
                      {tip.likes +
                        (likedTips.includes(tip.id) && !tip.isLiked ? 1 : 0) -
                        (!likedTips.includes(tip.id) && tip.isLiked ? 1 : 0)}
                    </span>
                  </div>
                  <Button
                    variant={likedTips.includes(tip.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLike(tip.id)}
                  >
                    {likedTips.includes(tip.id) ? "Favorited" : "Add to Favorites"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredTips.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <MessageSquare className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No tips found</h3>
              <p className="mt-2 text-sm text-muted-foreground">We couldn&apos;t find any tips matching your search.</p>
              <Button className="mt-4" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          )}
        </TabsContent>

        {["team", "wellness", "productivity", "liked"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTips.map((tip) => (
                <Card key={tip.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle>{tip.title}</CardTitle>
                        <Badge
                          variant="secondary"
                          className={`flex w-fit items-center gap-1 ${getCategoryColor(tip.category)}`}
                        >
                          {getCategoryIcon(tip.category)}
                          <span className="capitalize">{tip.category}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{tip.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>
                        {tip.likes +
                          (likedTips.includes(tip.id) && !tip.isLiked ? 1 : 0) -
                          (!likedTips.includes(tip.id) && tip.isLiked ? 1 : 0)}
                      </span>
                    </div>
                    <Button
                      variant={likedTips.includes(tip.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleLike(tip.id)}
                    >
                      {likedTips.includes(tip.id) ? "Favorited" : "Add to Favorites"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
