
export default function Categories() {
  return (
    <section className="px-4 pt-10 pb-2 container mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Categories</h2>
      <div className="flex gap-4 flex-wrap items-center">
        <button
          className="bg-primary text-white rounded-full px-5 py-2 font-semibold text-base shadow hover:bg-primary/90"
          style={{ textTransform: "capitalize" }}
        >
          Fruits
        </button>
      </div>
    </section>
  );
}
