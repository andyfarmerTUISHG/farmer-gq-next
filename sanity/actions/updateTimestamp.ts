import { DocumentActionComponent } from "sanity";

// Custom publish action that updates timestamp
export const publishWithTimestamp: DocumentActionComponent = (props) => {
  const { publish, type, id, draft } = props;

  if (type !== "article" || !publish) {
    return publish;
  }

  return {
    ...publish,
    label: "Publish",
    onHandle: async () => {
      console.log("Updating timestamp before publish for article:", id);
      
      // Get the client from the context
      const client = props.getClient({ apiVersion: '2023-05-03' });
      
      // Update the timestamp
      await client
        .patch(draft?._id || id)
        .set({ updateddate: new Date().toISOString() })
        .commit();
      
      // Then publish
      return publish.onHandle?.();
    }
  };
};

// Debug function to check if actions are working
export const debugAction: DocumentActionComponent = (props) => {
  const { type, id, draft } = props;
  
  if (type !== "article") {
    return null;
  }

  return {
    label: "🔧 Update Date Now",
    onHandle: async () => {
      console.log("Debug action triggered for article:", id);
      
      const client = props.getClient({ apiVersion: '2023-05-03' });
      
      await client
        .patch(draft?._id || id)
        .set({ updateddate: new Date().toISOString() })
        .commit();
        
      console.log("Timestamp updated successfully");
    }
  };
};