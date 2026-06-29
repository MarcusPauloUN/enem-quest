const KEY = 'eq_studied_topics'

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set()
  } catch {
    return new Set()
  }
}

function save(set: Set<string>) {
  localStorage.setItem(KEY, JSON.stringify([...set]))
}

export function isTopicStudied(topicId: string): boolean {
  return load().has(topicId)
}

export function markTopicStudied(topicId: string): void {
  const set = load()
  set.add(topicId)
  save(set)
}
