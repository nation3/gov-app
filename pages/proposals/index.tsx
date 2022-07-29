import type { NextPage } from 'next'
import Link from 'next/link'

import { fetchProposals } from '../../lib/proposals'

import { Button, Card, Badge } from 'flowbite-react'
import ProposalBadges from '../../components/ProposalBadges'

const Proposals: NextPage = ({ proposals }: any) => {
  return (
    <div className="m-auto max-w-3xl xl:max-w-7xl">
      <div className="flex flex-col">
        <div className="flex-1 flex flex-row justify-between w-full my-8">
          <h1 className="text-3xl text-left">Proposals</h1>
          <Link href="/proposals/create">
            <Button>Create a proposal</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {proposals.map((proposal: any) => (
            <Link href={`/proposals/${proposal.id}`} key={proposal.id}>
              <div className="cursor-pointer">
                <Card href={true} horizontal={true} key={proposal.id}>
                  <div className="h-48">
                    <ProposalBadges proposal={proposal} />
                    <h2 className="text-xl font-bold">
                      #{proposal.id} {proposal.discussionMetadata.title}
                    </h2>

                    <p className="line-clamp-4">
                      {proposal.discussionMetadata.description}
                    </p>
                  </div>
                </Card>
              </div>
            </Link>
          ))}
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
