// Simple document action that updates timestamp on publish
export const publishWithTimestamp = (props) => {
  const { type, draft, published } = props
  
  if (type !== 'article') {
    return null
  }

  return {
    label: 'Publish',
    onHandle: async () => {
      const client = props.getClient({ apiVersion: '2023-05-03' })
      const docId = draft?._id || published?._id
      
      if (docId) {
        // Update timestamp before publishing
        await client
          .patch(docId)
          .set({ updateddate: new Date().toISOString() })
          .commit()
      }
      
      // Publish the document
      const publishAction = props.actions.find(action => action.action === 'publish')
      if (publishAction) {
        return publishAction.onHandle()
      }
    }
  }
}