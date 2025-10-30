import { useDocumentOperation } from 'sanity'

// Manual update action
export const updateTimestampAction = (props) => {
  const { type, id } = props
  const { patch } = useDocumentOperation(id, type)
  
  if (type !== 'article') {
    return null
  }

  return {
    label: '🕒 Update Date',
    onHandle: () => {
      const now = new Date().toISOString()
      
      patch.execute([
        {
          set: {
            updateddate: now
          }
        }
      ])
    }
  }
}

// Fix null dates action
export const fixNullDatesAction = (props) => {
  const { type, id, draft, published } = props
  const { patch } = useDocumentOperation(id, type)
  
  if (type !== 'article') {
    return null
  }

  const doc = draft || published
  const hasNullDates = !doc?.createddate || !doc?.updateddate
  
  if (!hasNullDates) {
    return null // Don't show if dates are already set
  }

  return {
    label: '🔧 Fix Missing Dates',
    onHandle: () => {
      const now = new Date().toISOString()
      const patches = []
      
      if (!doc.createddate) {
        patches.push({ set: { createddate: now } })
      }
      if (!doc.updateddate) {
        patches.push({ set: { updateddate: now } })
      }
      
      patch.execute(patches)
    }
  }
}

// Simple publish with timestamp
export const publishWithTimestamp = (props) => {
  const { type, id } = props
  const { patch, publish } = useDocumentOperation(id, type)
  
  if (type !== 'article') {
    return null
  }

  return {
    label: 'Publish & Update Date',
    onHandle: async () => {
      // Update timestamp
      await patch.execute([
        {
          set: {
            updateddate: new Date().toISOString()
          }
        }
      ])
      
      // Then publish
      await publish.execute()
    },
    disabled: publish.disabled
  }
}