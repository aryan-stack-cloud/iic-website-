import page from './page.json'
import stages from './stages.json'
import categories from './categories.json'
import archive from './archive.json'
import media from '../media.json'
import businessIdeathon from './business-ideathon-2024/details.json'
import businessIdeathonExperience from './business-ideathon-2024/experience.json'
import businessIdeathonGallery from './business-ideathon-2024/gallery.json'
import innovationWeek from './innovation-creativity-ipr-week-2025/details.json'
import innovationWeekExperience from './innovation-creativity-ipr-week-2025/experience.json'
import innovationWeekGallery from './innovation-creativity-ipr-week-2025/gallery.json'
import eureka from './eureka-road-to-enterprise-2025/details.json'
import eurekaExperience from './eureka-road-to-enterprise-2025/experience.json'
import eurekaGallery from './eureka-road-to-enterprise-2025/gallery.json'
import ceoChallenge from './ceo-of-creative-things-2025/details.json'
import ceoChallengeExperience from './ceo-of-creative-things-2025/experience.json'
import ceoChallengeGallery from './ceo-of-creative-things-2025/gallery.json'
import whatsProblem from './whats-the-problem-2025/details.json'
import whatsProblemExperience from './whats-the-problem-2025/experience.json'
import whatsProblemGallery from './whats-the-problem-2025/gallery.json'
import entrecon from './entrecon-india-2025/details.json'
import entreconExperience from './entrecon-india-2025/experience.json'
import entreconGallery from './entrecon-india-2025/gallery.json'
import regionalMeet from './iic-regional-meet-2025/details.json'
import regionalMeetExperience from './iic-regional-meet-2025/experience.json'
import regionalMeetGallery from './iic-regional-meet-2025/gallery.json'
import icseti from './icseti-poster-presentation-2026/details.json'
import icsetiExperience from './icseti-poster-presentation-2026/experience.json'
import icsetiGallery from './icseti-poster-presentation-2026/gallery.json'
import innoquest from './innoquest-2026/details.json'
import innoquestExperience from './innoquest-2026/experience.json'
import innoquestGallery from './innoquest-2026/gallery.json'
import innoventx from './innoventx-2026/details.json'
import innoventxExperience from './innoventx-2026/experience.json'
import innoventxGallery from './innoventx-2026/gallery.json'

const mediaById = Object.fromEntries(media.items.map((item) => [item.id, item]))
const mediaFor = (ids = []) => ids.map((id) => mediaById[id]).filter(Boolean)

const flagshipParts = [
  [businessIdeathon, businessIdeathonExperience, businessIdeathonGallery],
  [innovationWeek, innovationWeekExperience, innovationWeekGallery],
  [eureka, eurekaExperience, eurekaGallery],
  [ceoChallenge, ceoChallengeExperience, ceoChallengeGallery],
  [whatsProblem, whatsProblemExperience, whatsProblemGallery],
  [entrecon, entreconExperience, entreconGallery],
  [regionalMeet, regionalMeetExperience, regionalMeetGallery],
  [icseti, icsetiExperience, icsetiGallery],
  [innoquest, innoquestExperience, innoquestGallery],
  [innoventx, innoventxExperience, innoventxGallery],
]

const normalizeEvent = (details, experience = null, gallery = null, isFlagship = false) => ({
  id: details.id,
  title: details.title,
  slug: details.id,
  eventType: details.eventType || null,
  year: details.year || null,
  date: details.date || null,
  venue: details.venue || null,
  category: details.category || null,
  theme: details.theme || null,
  description: details.description || null,
  statistics: details.statistics || [],
  activities: details.activities || [],
  keywords: details.keywords || [],
  stages: details.stages || [],
  sourcePages: details.sourcePages || [],
  featured: Boolean(details.featured),
  isFlagship,
  experience,
  media: mediaFor(gallery?.mediaIds || details.mediaIds || []),
})

const flagshipEvents = flagshipParts.map(([details, experience, gallery]) => normalizeEvent(details, experience, gallery, true))
const archiveEvents = archive.events.map((event) => normalizeEvent(event, null, null, false))
const events = [...flagshipEvents, ...archiveEvents]
const searchIndex = events.map((event) => ({ id: event.id, terms: [event.title, event.eventType, event.year, event.date, event.category, event.theme, ...event.keywords, ...event.activities, ...event.stages].filter(Boolean).join(' ').toLowerCase() }))

export { archiveEvents, categories, events, flagshipEvents, media, page, searchIndex, stages }
