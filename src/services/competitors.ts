import axios from '@/lib/axios'
import type { Component } from 'vue'
import { mockCompetitorAnalysis } from './mockData'

export interface CompetitorData {
  name: string
  mentions: number
  sentiment: number
  isMain: boolean
  color: string
  updating: boolean
  isNew: boolean
  addedAt?: string
}

export interface SentimentData {
  name: string
  positive: number
  neutral: number
  negative: number
}

export interface ForumActivity {
  name: string
  mentions: number
  percentage: number
  trend: 'up' | 'down' | 'neutral'
  trendPercentage: number
  icon?: Component
}

export interface RecentDiscussion {
  competitor: string
  content: string
  forum: string
  time: string
  sentiment: 'positive' | 'negative' | 'neutral'
}

export interface PriorityAlert {
  competitor: string
  description: string
  importance: 'urgent' | 'important' | 'normal'
  time: string
}

export interface CompetitorAnalysis {
  competitors: CompetitorData[]
  sentimentData: SentimentData[]
  forumActivities: Record<string, ForumActivity[]>
  recentDiscussions: RecentDiscussion[]
  priorityAlerts: PriorityAlert[]
  scrapersRunning: boolean
  lastUpdated: string
}

// Check if we're in development mode
const isDevelopment = import.meta.env.MODE === 'development'

export const competitorService = {
  /**
   * Fetches competitor analysis data including mentions, sentiment, and forum activity
   */
  async getAnalysis(): Promise<CompetitorAnalysis> {
    // Use mock data in development mode
    if (isDevelopment) {
      console.log('CompetitorService - Using mock data in development mode')
      return Promise.resolve(mockCompetitorAnalysis)
    }

    console.log('CompetitorService - Fetching analysis data')
    const response = await axios.get<CompetitorAnalysis>('/competitors/analysis/')
    console.log('CompetitorService - Raw API response:', response)
    console.log('CompetitorService - Forum activities data:', response.data.forumActivities)
    
    return response.data
  },

  /**
   * Creates a new competitor to track
   */
  async createCompetitor(term: string) {
    // In development mode, simulate competitor creation
    if (isDevelopment) {
      console.log('CompetitorService - Simulating competitor creation in development mode')
      return Promise.resolve({
        message: 'Competitor created successfully',
        scrapersRunning: false,
        warnings: []
      })
    }

    console.log('CompetitorService - Creating competitor:', term)
    const { data } = await axios.post('/competitors/', { term })
    
    // Get the created keywords
    const keywordsResponse = await axios.get('/keywords/')
    const keywords = keywordsResponse.data.filter((k: any) => k.term === term)
    
    // Trigger scraping for each keyword
    for (const keyword of keywords) {
      await axios.post(`/keywords/${keyword.id}/trigger_scrape/`)
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 300))
    }
    
    return {
      message: data.message,
      scrapersRunning: true,
      warnings: data.warnings
    }
  },

  /**
   * Deletes a competitor and all its associated keywords
   */
  async deleteCompetitor(term: string) {
    // In development mode, simulate competitor deletion
    if (isDevelopment) {
      console.log('CompetitorService - Simulating competitor deletion in development mode')
      return Promise.resolve({ message: 'Competitor deleted successfully' })
    }

    console.log('CompetitorService - Deleting competitor:', term)
    const encodedTerm = encodeURIComponent(term)
    const { data } = await axios.delete(`/competitors/delete_term/${encodedTerm}/`)
    return data
  }
}
