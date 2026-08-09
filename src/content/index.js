import about from './homepage/about.json'
import flagshipEventsPage from './homepage/flagship-events.json'
import hero from './homepage/hero.json'
import navigation from './homepage/navigation.json'
import transition from './homepage/transition.json'
import whatWeDo from './homepage/what-we-do.json'
import media from './media.json'
import stats from './stats.json'
import leadership from './leadership/members.json'
import leadershipPage from './homepage/leadership.json'
import gallery from './gallery/gallery.json'
import galleryPage from './homepage/gallery.json'
import join from './homepage/join.json'
import achievements from './achievements/achievements.json'
import testimonials from './testimonials/testimonials.json'
import ideathons from './homepage/events/ideathons/details.json'
import ideathonsGallery from './homepage/events/ideathons/gallery.json'
import ideathonsSchedule from './homepage/events/ideathons/schedule.json'
import ideathonsRegistration from './homepage/events/ideathons/registration.json'
import workshops from './homepage/events/workshops/details.json'
import workshopsGallery from './homepage/events/workshops/gallery.json'
import workshopsSchedule from './homepage/events/workshops/schedule.json'
import workshopsRegistration from './homepage/events/workshops/registration.json'
import hackathons from './homepage/events/hackathons/details.json'
import hackathonsGallery from './homepage/events/hackathons/gallery.json'
import hackathonsSchedule from './homepage/events/hackathons/schedule.json'
import hackathonsRegistration from './homepage/events/hackathons/registration.json'
import startupShowcases from './homepage/events/startup-showcases/details.json'
import startupShowcasesGallery from './homepage/events/startup-showcases/gallery.json'
import startupShowcasesSchedule from './homepage/events/startup-showcases/schedule.json'
import startupShowcasesRegistration from './homepage/events/startup-showcases/registration.json'
import industryTalks from './homepage/events/industry-talks/details.json'
import industryTalksGallery from './homepage/events/industry-talks/gallery.json'
import industryTalksSchedule from './homepage/events/industry-talks/schedule.json'
import industryTalksRegistration from './homepage/events/industry-talks/registration.json'

const eventParts = [
  [ideathons, ideathonsGallery, ideathonsSchedule, ideathonsRegistration],
  [workshops, workshopsGallery, workshopsSchedule, workshopsRegistration],
  [hackathons, hackathonsGallery, hackathonsSchedule, hackathonsRegistration],
  [startupShowcases, startupShowcasesGallery, startupShowcasesSchedule, startupShowcasesRegistration],
  [industryTalks, industryTalksGallery, industryTalksSchedule, industryTalksRegistration],
]

const mediaById = Object.fromEntries(media.items.map((item) => [item.id, item]))
const resolveMedia = (mediaIds = []) => mediaIds.map((id) => mediaById[id]).filter(Boolean)

const flagshipEvents = eventParts.map(([details, eventGallery, schedule, registration]) => ({
  ...details,
  gallery: resolveMedia(eventGallery.items),
  videos: [],
  documents: [],
  schedule: schedule.items,
  registration,
  verifiedStats: [
    details.participants !== null && { label: 'Participants', value: details.participants },
    details.teams !== null && { label: 'Teams', value: details.teams },
  ].filter(Boolean),
  quote: details.quotes?.[0] || null,
}))

const galleryMediaById = Object.fromEntries(media.items.map((item) => [item.id, item]))
const resolveGalleryMedia = (mediaId) => galleryMediaById[mediaId] || null

const galleryItems = gallery.items.map((item) => ({
  ...item,
  media: resolveGalleryMedia(item.mediaId),
  video: resolveGalleryMedia(item.videoMediaId),
}))

const galleryContent = { ...gallery, items: galleryItems }

export { about, achievements, flagshipEvents, flagshipEventsPage, galleryContent as gallery, galleryPage, hero, join, leadership, leadershipPage, media, navigation, stats, testimonials, transition, whatWeDo }
