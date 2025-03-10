import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh]">
        <Image
          src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Craftsman working on wooden furniture"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Our Story</h1>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Crafting Excellence Since 1995</h2>
            <p className="text-lg text-gray-600 mb-4">
              For over 25 years, Artisan Woods has been creating exceptional wooden furniture that combines traditional craftsmanship with contemporary design. Our journey began in a small workshop with a simple vision: to create furniture that would last for generations.
            </p>
            <p className="text-lg text-gray-600">
              Today, we continue to uphold the same values of quality, sustainability, and attention to detail that have defined our brand since its inception.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Workshop craftsmanship"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To create beautiful, lasting furniture that enhances the lives of our customers while preserving traditional woodworking techniques.
            </p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be the leading creator of sustainable, handcrafted wooden furniture, setting the standard for quality and design.
            </p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600">
              Quality craftsmanship, environmental responsibility, and customer satisfaction guide everything we do.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Material Selection',
                description: 'Carefully sourcing the finest sustainable woods',
              },
              {
                step: '2',
                title: 'Design',
                description: 'Creating unique pieces that blend form and function',
              },
              {
                step: '3',
                title: 'Crafting',
                description: 'Skilled artisans bringing designs to life',
              },
              {
                step: '4',
                title: 'Quality Check',
                description: 'Rigorous testing ensures lasting quality',
              },
            ].map((process) => (
              <div key={process.step} className="text-center">
                <div className="w-12 h-12 bg-amber-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}