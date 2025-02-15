import { MarketingHeader } from '@/components/marketing/marketing-header'
import HomeFeature from '@/components/home/home-feature'

export default function HomePage() {
  return (
    <>
      <MarketingHeader />
      <div className="pt-16"> {/* Add padding top to account for fixed header */}
        <HomeFeature />
      </div>
    </>
  )
}
