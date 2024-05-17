"use client"
import type { MDXComponents } from 'mdx/types'
 
export default function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
  }
}