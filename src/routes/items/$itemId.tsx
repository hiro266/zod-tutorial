import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/items/$itemId")({
  loader: async ({ params: { itemId } }) => {
    try {
      const response = await fetch(`http://localhost:8000/items/${itemId}`);
      return await response.json();
    } catch {
      throw notFound();
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const item = Route.useLoaderData();
  return (
    <div>
      <h1>{JSON.stringify(item)}</h1>
      <h3>{item.item_id}</h3>
      <h3>{item.item_name}</h3>
    </div>
  );
}
