import { useDocumentOperation } from "sanity";

// Fix null dates action
export function fixNullDatesAction(props) {
  const { type, id, draft, published } = props;
  const { patch } = useDocumentOperation(id, type);

  if (type !== "article") {
    return null;
  }

  const doc = draft || published;
  const hasNullDates = !doc?.createddate || !doc?.updateddate;

  if (!hasNullDates) {
    return null; // Don't show if dates are already set
  }

  return {
    label: "🔧 Fix Missing Dates",
    onHandle: () => {
      const now = new Date().toISOString();
      const patches = [];

      if (!doc.createddate) {
        patches.push({ set: { createddate: now } });
      }
      if (!doc.updateddate) {
        patches.push({ set: { updateddate: now } });
      }

      patch.execute(patches);
    },
  };
}

// Simple publish with timestamp
export function publishWithTimestamp(props) {
  const { type, id, draft, published } = props;
  const { patch, publish } = useDocumentOperation(id, type);

  if (type !== "article") {
    return null;
  }

  return {
    label: "Publish",
    onHandle: async () => {
      const doc = draft || published;
      const now = new Date().toISOString();
      const patches = [];

      // Always update the updated date
      patches.push({ set: { updateddate: now } });

      // Set created date if it's null (for existing articles)
      if (!doc?.createddate) {
        patches.push({ set: { createddate: now } });
      }

      // Apply patches
      await patch.execute(patches);

      // Then publish
      await publish.execute();
    },
    disabled: publish.disabled,
  };
}
