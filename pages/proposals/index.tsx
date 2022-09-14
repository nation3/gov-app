import type { NextPage } from 'next'
import Link from 'next/link'
import { v1 } from '@nation3/gov-specs'
import { Button, Card, Badge, Select } from 'flowbite-react'
import { fetchProposals } from '../../lib/proposals'
import ProposalBadges from '../../components/ProposalBadges'
import { useState } from 'react'

const proposalTypes = [
  'Meta',
  'Proclamation',
  'Expense',
  'Parameter change',
  'Treasury management',
  'Custodial treasury management',
]

declare enum ProposalKinds {
  Meta = 'meta',
  Proclamation = 'proclamation',
  Expense = 'expense',
  ParameterChange = 'parameter-change',
  TreasuryManagement = 'treasury-management',
  CustodialTreasuryManagement = 'custodial-treasury-management',
}

const Proposals: NextPage = ({ proposals }: any) => {
  const [typeFilter, setTypeFilter] = useState('all')
  const [outcomeFilter, setOutcomeFilter] = useState('all')
  const [enactedFilter, setEnactedFilter] = useState('all')

  return (
    <div className="m-auto max-w-3xl xl:max-w-6xl p-4 md:p-0 mb-4">
      <div className="flex flex-col">
        <div className="flex-1 flex flex-row justify-between w-full mb-8">
          <h1 className="text-3xl text-left font-display dark:text-white">
            Proposals
          </h1>
          <Link href="/proposals/create">
            <Button>
              <span className="font-display">Create a proposal</span>
            </Button>
          </Link>
        </div>
        <div className="flex justify-end gap-4">
          <div className="w-32">
            <Select onChange={(e) => setOutcomeFilter(e.target.value)}>
              <option value="all">All outcomes</option>
              <option value="true">Approved</option>
              <option value="false">Rejected</option>
            </Select>
          </div>
          <div className="w-48">
            <Select onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All types</option>
              {proposalTypes.map((proposalType, i) => (
                <option
                  key={i}
                  // @ts-ignore
                  value={ProposalKinds[Object.keys(ProposalKinds)[i]]}
                >
                  {proposalType}
                </option>
              ))}
            </Select>
          </div>

          <div className="w-48">
            <Select onChange={(e) => setEnactedFilter(e.target.value)}>
              <option value="all">All enactment</option>
              <option value="true">Enacted</option>
              <option value="false">Pending enactment</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {proposals.map((proposal: any) => {
            if (
              outcomeFilter !== 'all' &&
              (outcomeFilter === 'true') !== proposal.votes?.[0].passed
            )
              return

            if (typeFilter !== 'all' && typeFilter !== proposal.content.kind)
              return

            if (
              enactedFilter !== 'all' &&
              (proposal.content.kind === 'meta' ||
                proposal.content.kind === 'proclamation' ||
                (enactedFilter === 'true' && !proposal.votes?.[1]?.passed) ||
                (enactedFilter === 'false' &&
                  typeof proposal.votes?.[1]?.passed !== 'undefined'))
            )
              return

            return (
              <Link href={`/proposals/${proposal.id}`} key={proposal.id}>
                <div className="cursor-pointer h-full flex">
                  <Card href="#" horizontal={true}>
                    <div className="h-full">
                      <div className="mb-2">
                        <ProposalBadges proposal={proposal} />
                      </div>
                      <h2 className="text-xl font-bold line-clamp-2">
                        #{proposal.id} {proposal.discussionMetadata.title}
                      </h2>

                      <p className="line-clamp-4">
                        {proposal.discussionMetadata.description}
                      </p>
                    </div>
                  </Card>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const proposals = await fetchProposals(0, true)

  return {
    props: { proposals: proposals.reverse() },
    revalidate: 60 * 5,
  }
}

export default Proposals
