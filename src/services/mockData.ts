// Mock data for frontend development
import type { CompetitorAnalysis } from './competitors'

export const mockCompetitorAnalysis: CompetitorAnalysis = {
  competitors: [
    {
      name: "Your Brand",
      mentions: 1250,
      sentiment: 85,
      isMain: true,
      color: "green",
      updating: false,
      isNew: false,
      addedAt: "2024-02-19T14:30:00Z"
    },
    {
      name: "Competitor A",
      mentions: 980,
      sentiment: 72,
      isMain: false,
      color: "blue",
      updating: false,
      isNew: false,
      addedAt: "2024-02-19T14:30:00Z"
    },
    {
      name: "Competitor B",
      mentions: 756,
      sentiment: 65,
      isMain: false,
      color: "purple",
      updating: false,
      isNew: false,
      addedAt: "2024-02-19T14:30:00Z"
    },
    {
      name: "Competitor C",
      mentions: 432,
      sentiment: 58,
      isMain: false,
      color: "orange",
      updating: false,
      isNew: true,
      addedAt: "2024-02-19T14:30:00Z"
    }
  ],
  sentimentData: [
    {
      name: "Your Brand",
      positive: 850,
      neutral: 300,
      negative: 100
    },
    {
      name: "Competitor A",
      positive: 600,
      neutral: 280,
      negative: 100
    },
    {
      name: "Competitor B",
      positive: 450,
      neutral: 256,
      negative: 50
    },
    {
      name: "Competitor C",
      positive: 232,
      neutral: 150,
      negative: 50
    }
  ],
  forumActivities: {
    "Your Brand": [
      {
        name: "Forum 1",
        mentions: 450,
        percentage: 36,
        trend: "up" as const,
        trendPercentage: 15
      },
      {
        name: "Forum 2",
        mentions: 380,
        percentage: 30,
        trend: "neutral" as const,
        trendPercentage: 0
      },
      {
        name: "Forum 3",
        mentions: 420,
        percentage: 34,
        trend: "up" as const,
        trendPercentage: 12
      }
    ],
    "Competitor A": [
      {
        name: "Forum 1",
        mentions: 350,
        percentage: 35,
        trend: "up" as const,
        trendPercentage: 8
      },
      {
        name: "Forum 2",
        mentions: 320,
        percentage: 33,
        trend: "down" as const,
        trendPercentage: -5
      },
      {
        name: "Forum 3",
        mentions: 310,
        percentage: 32,
        trend: "neutral" as const,
        trendPercentage: 0
      }
    ]
  },
  recentDiscussions: [
    {
      competitor: "Your Brand",
      content: "Really impressed with the quality and service. Highly recommended!",
      forum: "Forum 1",
      time: "2 hours ago",
      sentiment: "positive"
    },
    {
      competitor: "Competitor A",
      content: "Average experience, nothing special to report.",
      forum: "Forum 2",
      time: "3 hours ago",
      sentiment: "neutral"
    },
    {
      competitor: "Competitor B",
      content: "Had some issues with delivery times.",
      forum: "Forum 1",
      time: "4 hours ago",
      sentiment: "negative"
    }
  ],
  priorityAlerts: [
    {
      competitor: "Competitor A",
      description: "Significant increase in positive mentions",
      importance: "important",
      time: "1 hour ago"
    },
    {
      competitor: "Your Brand",
      description: "New forum thread gaining traction",
      importance: "normal",
      time: "2 hours ago"
    },
    {
      competitor: "Competitor C",
      description: "Sudden spike in negative sentiment",
      importance: "urgent",
      time: "30 minutes ago"
    }
  ],
  scrapersRunning: false,
  lastUpdated: "2024-02-19T14:30:00Z"
}