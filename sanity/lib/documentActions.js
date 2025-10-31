// Document action to update timestamps
export function createTimestampActions(prev, { schemaType }) {
  if (schemaType !== "article") {
    return prev;
  }

  // Add a custom action to update timestamp
  const updateTimestampAction = {
    label: "🕒 Update Timestamp",
    onHandle: ({ draft, published }) => {
      const client = sanityClient.withConfig({ apiVersion: "2023-05-03" });
      const docId = draft?._id || published?._id;

      if (docId) {
        return client
          .patch(docId)
          .set({ updateddate: new Date().toISOString() })
          .commit();
      }
    },
  };

  return [...prev, updateTimestampAction];
}
