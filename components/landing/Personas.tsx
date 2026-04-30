export default function Personas() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Who is this for?</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-xl">
          <h3 className="text-xl font-semibold">🔮 Seekers</h3>
          <p className="mt-2 text-gray-600">Curious minds looking for spiritual connection.</p>
        </div>
        <div className="p-6 border rounded-xl">
          <h3 className="text-xl font-semibold">🧘 Practitioners</h3>
          <p className="mt-2 text-gray-600">Meditation guides and energy workers.</p>
        </div>
        <div className="p-6 border rounded-xl">
          <h3 className="text-xl font-semibold">👻 Enthusiasts</h3>
          <p className="mt-2 text-gray-600">Anyone fascinated by the unknown.</p>
        </div>
      </div>
    </section>
  );
}
