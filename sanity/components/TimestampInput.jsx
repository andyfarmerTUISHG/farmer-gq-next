import React, { useEffect } from 'react'
import { Stack, Text } from '@sanity/ui'

export function TimestampInput(props) {
  const { onChange, value, readOnly } = props

  useEffect(() => {
    // Set timestamp if it's not already set
    if (!value && onChange) {
      const now = new Date().toISOString()
      onChange(now)
    }
  }, [value, onChange])

  // For read-only fields (createddate), just show the value
  if (readOnly) {
    return (
      <Stack space={2}>
        <Text size={1} weight="medium">
          {props.title}
        </Text>
        <Text size={1}>
          {value ? new Date(value).toLocaleString() : 'Will be set automatically'}
        </Text>
      </Stack>
    )
  }

  // For editable fields, render the default datetime input
  return props.renderDefault(props)
}