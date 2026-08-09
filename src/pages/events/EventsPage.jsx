import ExhibitionEntrance from '../../components/events/ExhibitionEntrance'
import { flagshipEvents, page } from '../../content/events'

export default function EventsPage() {
  const entrance = page.entrance
  const featuredEvent = flagshipEvents.find((event) => event.id === entrance.featuredEventId)

  return <ExhibitionEntrance entrance={entrance} featuredEvent={featuredEvent} />
}
