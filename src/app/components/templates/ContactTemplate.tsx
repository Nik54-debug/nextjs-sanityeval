export default function ContactTemplate({ page }: { page: any }) {
  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          {page.contactHeading || page.title}
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Get In Touch
            </h2>

            {page.contactInfo && (
              <div className="space-y-4">
                {page.contactInfo.email && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Email
                      </h3>
                      <a
                        href={`mailto:${page.contactInfo.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {page.contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}

                {page.contactInfo.phone && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📞</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Phone
                      </h3>
                      <a
                        href={`tel:${page.contactInfo.phone}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {page.contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                {page.contactInfo.address && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Address
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                        {page.contactInfo.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {page.businessHours && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Business Hours
              </h2>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                {page.businessHours}
              </p>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Send us a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      {page.mapEmbed && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Find Us
          </h2>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={page.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      )}
    </main>
  )
}