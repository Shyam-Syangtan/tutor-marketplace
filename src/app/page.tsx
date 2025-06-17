// src/app/page.tsx
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="flex-1">

      {/* 1. Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center px-6 lg:px-24 py-12 lg:py-24">
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold">
            Become fluent in any language
          </h1>
          <ul className="space-y-2 text-lg">
            <li>Take customizable 1-on-1 lessons trusted by millions of users</li>
            <li>Learn from certified teachers that fit your budget and schedule</li>
            <li>Connect with a global community of language learners</li>
          </ul>
          <button className="mt-6 px-8 py-3 bg-red-500 text-white rounded-lg text-lg">
            Start now
          </button>
        </div>
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
          <Image
            src="/images/hero-illustration.png"
            alt="Hero Illustration"
            width={600}
            height={400}
            className="object-cover"
          />
        </div>
      </section>

      {/* 2. Language Showcase Carousel */}
      <section className="px-6 lg:px-24 py-12">
        <div className="bg-white rounded-xl shadow p-6 flex overflow-x-auto space-x-4">
          {[
            { name: 'English', count: 5003, flag: '/flags/uk.svg' },
            { name: 'Japanese', count: 988, flag: '/flags/jp.svg' },
            { name: 'Spanish', count: 2595, flag: '/flags/es.svg' },
            // add more as needed
          ].map(({ flag, name, count }, i) => (
            <div key={i} className="flex-shrink-0 w-32 text-center space-y-2">
              <Image
                src={flag}
                alt={name}
                width={32}
                height={32}
                className="mx-auto"
              />
              <p className="font-medium">{name}</p>
              <p className="text-sm text-gray-500">{count} Teachers</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Feature List */}
      <section className="px-6 lg:px-24 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6">Why choose us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Flexible Scheduling', desc: 'Book lessons 24/7 to fit your timetable.' },
            { title: 'Certified Tutors', desc: 'All our tutors are certified professionals.' },
            { title: 'Community Support', desc: 'Practice in group classes and forums.' },
          ].map((feat, idx) => (
            <div key={idx} className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
              <p className="text-gray-600">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Call-to-Action Footer */}
      <section className="px-6 lg:px-24 py-16 text-center bg-red-500 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <button className="px-8 py-4 bg-white text-red-500 rounded-lg text-lg font-semibold">
          Create your free account
        </button>
      </section>

    </main>
  )
}
