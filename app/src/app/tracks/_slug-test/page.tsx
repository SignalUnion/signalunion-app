export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold">Track Slug</h1>
      <p className="mt-4 text-gray-700">Slug: {params.slug}</p>
    </div>
  );
}
