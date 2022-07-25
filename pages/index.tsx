import type { NextPage } from 'next'
import Form from '@rjsf/core'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

// import { v1 } from '@nation3/gov-specs'
import v1 from '../../gov/specs/N3GOV-v1.json'
import uiSchema from '../uiSchema.json'

import { useState, useEffect } from 'react'

SyntaxHighlighter.registerLanguage('json', json)

const Home: NextPage = () => {
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
    <div className="hero">
      <div className="hero-content">
        <div className="card w-full xl:max-w-5xl shadow-xl">
          <div className="card-body">
            <div className="card-title text-2xl">
              Create a governance proposal
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Form
                schema={v1}
                uiSchema={uiSchema}
                formData={proposalDraft}
                onChange={(e) => setProposalDraft(e.formData)}
                action="#"
              />
              <div>
                <div className="card-title text-lg mt-8 mb-4">
                  Proposal output
                </div>
                <SyntaxHighlighter language="javascript" style={tomorrow}>
                  {JSON.stringify(proposalDraft, null, 2)}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// https://api.gitrows.com/@github/nation3/governance/proposals/N3GOV-1.json

export default Home
