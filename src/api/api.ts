const BASE_URL = 'https://saavn.sumit.co'

export const searchSong = async (query: string, page: number = 1) => {
  const res = await fetch(`${BASE_URL}/api/search/songs?query=${encodeURIComponent(query)}&page=${page}&limit=10`)
  const data = await res.json()

  const results = data?.data?.results ?? []
  const total = data?.data?.total ?? 0

  const formatted = results.map((item: any) => ({
    id: item.id,
    title: item.name,
    duration: item.duration,
    artist: item.artists?.primary?.[0]?.name ?? 'Unknown Artist',
    image: item.image?.[2]?.url,
    audio: item.downloadUrl?.[4]?.url,
  }))

  return { songs: formatted, total }
}

export const searchArtists = async (query: string) => {
  const res = await fetch(`${BASE_URL}/api/search/artists?query=${encodeURIComponent(query)}&limit=10`)
  const data = await res.json()
  return (data?.data?.results ?? []).map((item: any) => ({
    id: item.id,
    name: item.name,
    image: item.image?.[2]?.url ?? item.image?.[1]?.url,
  }))
}