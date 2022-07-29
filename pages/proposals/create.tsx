import type { NextPage } from 'next'
import Form from '@rjsf/core'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import Link from 'next/link'

import { v1 } from '@nation3/gov-specs'
import uiSchema from './uiSchema.json'

import { Button, Card, Badge, Label } from 'flowbite-react'

let schema = v1
/** An ID is required for a proposal to be valid, but the ID will only be assigned once merged into the repo */
schema.properties.id.default = 1337

import { useState, useEffect } from 'react'

SyntaxHighlighter.registerLanguage('json', json)

const CreateProposals: NextPage = () => {
  const [proposalDraft, setProposalDraft] = useState({})

  useEffect(() => {
    const savedDraft = JSON.parse(
      localStorage.getItem('proposal-draft') || '{}'
    )
    savedDraft?.spec && setProposalDraft(savedDraft)
  }, [])
  useEffect(() => {
    localStorage.setItem('proposal-draft', JSON.stringify(proposalDraft))
  }, [proposalDraft])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-full xl:max-w-5xl">
        <Link href="/proposals">
          <h3 className="ml-2 mb-2 cursor-pointer text-n3blue hover:underline">
            ← All proposals
          </h3>
        </Link>
        <Card>
          <h3 className="font-bold text-2xl">Create a governance proposal</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Form
              schema={schema}
              uiSchema={uiSchema}
              formData={proposalDraft}
              onChange={(e) => setProposalDraft(e.formData)}
              action="#"
            />
            <div>
              <Label htmlFor="small" value="Proposal output" />
              <SyntaxHighlighter language="javascript" style={tomorrow}>
                {JSON.stringify(proposalDraft, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default CreateProposals
