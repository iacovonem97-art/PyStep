import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import HowItWorks from '@/components/home/HowItWorks'
import CurriculumPreview from '@/components/home/CurriculumPreview'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50">
        <HeroSection />
        <HowItWorks />
        <CurriculumPreview />
      </main>
      <Footer />
    </>
  )
}
