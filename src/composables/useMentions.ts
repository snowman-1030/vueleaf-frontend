import { ref, computed } from 'vue'
import axios from '@/lib/axios'

export interface GraphDataPoint {
  date: string
  positive: number
  negative: number
  neutral: number
}

export interface Mention {
  id: number
  keyword_term: string
  title: string
  content: string
  url: string
  author: string
  source: string
  post_date: string
  created_at: string
  sentiment: 'positive' | 'neutral' | 'negative' | null
  sentiment_confidence?: number
}

export interface PaginatedResponse {
  count: number
  next: string | null
  previous: string | null
  results: Mention[]
  total_pages: number
  current_page: number
  stats: {
    positive: number
    negative: number
    neutral: number
    keywords: string[]
  }
  graph_data: GraphDataPoint[]
}

export function useMentions() {
  // Add cache map
  const responseCache = ref(new Map<string, {
    data: PaginatedResponse
    timestamp: number
  }>())

  // const mentions = ref<Mention[]>([])
  const isLoading = ref(false)
  // const error = ref<string | null>(null)
  const totalCount = ref(0)
  const totalPages = ref(0)

  // Stats and graph data from API response
  const stats = ref({
    positive: 0,
    negative: 0,
    neutral: 0,
    keywords: [] as string[]
  })
  // const graphData = ref<GraphDataPoint[]>([])
  const availableKeywords = ref<string[]>([])

  // Computed stats
  // const totalMentions = computed(() => totalCount.value)
  // const positiveMentions = computed(() => stats.value.positive)
  // const negativeMentions = computed(() => stats.value.negative)
  // const neutralMentions = computed(() => stats.value.neutral)

  interface FetchParams {
    page?: number
    start_date?: string
    end_date?: string
    platforms?: string
    sentiment?: string
    keyword?: string
    search?: string
    ordering?: string  // Parameter name used by API endpoints for sorting
  }

  // Initialize mentions ref
  // mentions.value = []

  // Fetch mentions with optional filters and caching
  const fetchMentions = async (filters: FetchParams = {}) => {
    const cacheKey = JSON.stringify(filters)
    const cached = responseCache.value.get(cacheKey)
    
    // Use cache if less than 5 minutes old
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
      // mentions.value = cached.data.results
      totalCount.value = cached.data.count
      totalPages.value = cached.data.total_pages
      stats.value = cached.data.stats
      graphData.value = cached.data.graph_data
      availableKeywords.value = cached.data.stats.keywords
      return
    }

    isLoading.value = true
    // error.value = null
    try {
      console.log('Sending filters to API:', filters)
      const response = await axios.get<PaginatedResponse>('/posts/', { params: filters })
      console.log('API Response:', response.data)
      
      // Cache the response
      responseCache.value.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      })
      
      // mentions.value = response.data.results
      totalCount.value = response.data.count
      totalPages.value = response.data.total_pages
      stats.value = response.data.stats
      graphData.value = response.data.graph_data
      availableKeywords.value = response.data.stats.keywords
    } catch (err) {
      // error.value = 'Failed to fetch mentions'
      console.error('Error fetching mentions:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Retry sentiment analysis for a specific mention
  const retrySentiment = async (mentionId: number) => {
    try {
      const response = await axios.post(`/posts/${mentionId}/retry-sentiment/`)
      
      // Update the mention in the local state
      // const index = mentions.value.findIndex(m => m.id === mentionId)
      if (index !== -1) {
        // mentions.value[index] = {
          // ...mentions.value[index],
          // sentiment: response.data.sentiment,
          // sentiment_confidence: response.data.sentiment_confidence
        // }
      }
      
      return response.data
    } catch (err) {
      console.error('Error retrying sentiment analysis:', err)
      throw err
    }
  }

  const totalMentions = 10;
  const positiveMentions = 20;
  const negativeMentions = 30;
  const neutralMentions = 40;

  const error = null

  const graphData = {
    value:[
      {
        date: "2024.3.4",
        positive: 0,
        negative: 0,
        neutral: 0
      }
    ]
  }

  // const error = false;

  

   const mentions = [
    {
      id:0, 
      keyword_term:"keyword_term0",
      title:"title0",
      content:"content0co ntent0conte ntcont ent0c ontent0 content0content0 cont ent0conten t0contentcon ten t0content0c onten t0co  ntent0",
      url:"https://you.com",
      author:"author0",
      source:"source0",
      post_date:"2025/4/6",
      sentiment:'positive',
      sentiment_confidence:0,
      created_at:"2025/4/6"
    },
    {
      id:0, 
      keyword_term:"keyword_term0",
      title:"title0", 
      content:"content0 content0c ontentc onten t0conte nt0content0conten t0content0co ntent0content conten t0conte nt0cont ent0cont ent0",
      url:"https://you.com",
      author:"author0",
      source:"source0",
      post_date:"2025/4/6",
      sentiment:'positive',
      sentiment_confidence:0,
      created_at:"2025/4/6"
    }
  ]

  return {
    // State
    mentions,
    isLoading,
    error,
    totalCount,
    totalPages,
    stats,

    // Computed
    totalMentions,
    positiveMentions,
    negativeMentions,
    neutralMentions,

    // Methods
    fetchMentions,
    retrySentiment,
    
    // Graph data
    graphData,
    availableKeywords
  }
}
