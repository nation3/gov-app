import type { NextPage } from 'next'
import Link from 'next/link'
import { fetchProposal, fetchProposals } from '../../lib/proposals'
import { fetchTokenInfo } from '../../lib/tokens'
import type { v1 } from '@nation3/gov-specs'

const etherscanLink = (address: string | any, alias?: string) => {
  return (
    <a
      className="link link-primary"
      target="_blank"
      href={`https://etherscan.io/address/${address}`}
      rel="noreferrer"
    >
      {alias ? alias : address}
    </a>
  )
}

const agents = {
  '0x336252602b3a8a0be336ed942228305173e8082b': 'Nation3 DAO Agent',
  '0x7b81e8d4e82796c9b76284fa4d21e57b8b86a06c': 'Nation3 DAO Critical Agent',
}

const renderExpense = (transfer: any, index: number) => {
  return (
    <>
      <h3 className="text-lg">#{index}</h3>
      {/*@ts-ignore*/}
      <p>From: {etherscanLink(transfer.from, agents[transfer.from])}</p>
      <p>To: {etherscanLink(transfer.recipient)}</p>
      <div className="flex flex-row gap-1">
        <span>Token:</span>
        <a
          className="link link-primary flex flex-row"
          target="_blank"
          href={transfer.tokenInfo?.link}
          rel="noreferrer"
        >
          <img
            src={transfer.tokenInfo?.icon}
            width={24}
            height={24}
            className="p-1"
          />
          <p>{transfer.tokenInfo?.symbol}</p>
        </a>
      </div>
      <p>Amount: {transfer.amount}</p>
    </>
  )
}

const renderContractCall = (call: any, index: number) => {
  return (
    <>
      <h3 className="text-lg">#{index}</h3>
      {/*@ts-ignore*/}
      <p>From: {etherscanLink(call.from, agents[call.from])}</p>
      <p>Contract: {etherscanLink(call.to)}</p>
      <p>Method: {call.method}</p>
      <p>
        Parameters:
        <br />
        {call.parameters &&
          call.parameters.map((parameter: any, i: number) => (
            <>
              {i > 0 && <br />}
              {parameter}
            </>
          ))}
      </p>
      {call.value && <p>ETH value: {call.value}</p>}
    </>
  )
}

const proposalComponents = (proposal: any) => {
  const transfer = (proposal: any) => (
    <>
      <h3 className="text-lg font-bold">Transfers</h3>
      {proposal.content.transfers?.map((transfer: any, i: number) =>
        renderExpense(transfer, i)
      )}
    </>
  )
  const contractCall = (proposal: any) => (
    <>
      <h3 className="text-lg font-bold">Contract calls</h3>
      {proposal.content.calls?.map((call: any, i: number) =>
        renderContractCall(call, i)
      )}
    </>
  )
  return {
    meta: (
      <>
        <h3 className="text-lg font-bold">Pull request URI</h3>
        <a className="link link-primary" target="_blank">
          {proposal.content.prURI}
        </a>
      </>
    ),
    proclamation: (
      <>
        <h3 className="text-lg font-bold">Statement</h3>
        <p>{proposal.content.statement}</p>
      </>
    ),
    expense: transfer(proposal),
    'parameter-change': contractCall(proposal),
    'treasury-management': contractCall(proposal),
    'custodial-treasury-management': transfer(proposal),
  }
}

const Proposal: NextPage = ({ proposal }: any) => {
  return (
    <div className="hero h-full">
      <div className="hero-content flex flex-col">
        <Link href="/proposals">
          <h3 className="link link-primary link-hover text-left w-full">
            ← All proposals
          </h3>
        </Link>
        {proposal?.content && (
          <div className="card max-w-5xl bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex flex-row flex-wrap gap-2">
                <div className="badge badge-primary">
                  {proposal.content.kind}
                </div>
                {proposal.approved === true ? (
                  <div className="badge badge-outline badge-success">
                    Approved
                  </div>
                ) : (
                  proposal.approved === false && (
                    <div className="badge badge-outline badge-error">
                      Rejected
                    </div>
                  )
                )}

                {proposal.enacted === true ? (
                  <div className="badge badge-outline badge-success">
                    Enacted
                  </div>
                ) : (
                  proposal.enacted === false && (
                    <div className="badge badge-outline badge-warning">
                      Pending enactment
                    </div>
                  )
                )}
              </div>
              <h2 className="card-title mb-4">
                #{proposal.id} {proposal.discussionMetadata.title}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  {/*@ts-ignore*/}
                  {proposalComponents(proposal)[proposal.content.kind]}
                  {proposal.votes && proposal.votes[0] && (
                    <>
                      <h3 className="text-lg font-bold mt-4">
                        Winning choices
                      </h3>
                      {proposal.votes[0].winningChoices.map(
                        (choice: string, i: number) => (
                          <>
                            {i > 0 && ', '}
                            {choice}
                          </>
                        )
                      )}
                    </>
                  )}

                  <div>
                    {proposal.votes && (
                      <>
                        <h3 className="text-lg font-bold mt-4">Votes</h3>
                        <p>
                          {proposal.votes.map((vote: any, i: number) => (
                            <>
                              {i > 0 && ', '}
                              <a
                                className="link link-primary"
                                href={vote.uri}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {i === 0 ? 'Snapshot vote' : 'Aragon vote'}
                              </a>
                            </>
                          ))}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Discussion</h3>
                  <p className="line-clamp-8">
                    {proposal.discussionMetadata.description}
                  </p>

                  <a
                    className="link link-primary"
                    href={proposal.discussion}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export async function getStaticProps({ params }: any) {
  const proposal = await fetchProposal(params.id, true)
  if (
    proposal.content.kind === 'expense' ||
    proposal.content.kind === 'custodial-treasury-management'
  ) {
    proposal.content.transfers = await Promise.all(
      proposal.content.transfers.map(async (transfer: any) => {
        const tokenInfo = await fetchTokenInfo(transfer.token)
        return { ...transfer, tokenInfo }
      })
    )
  }

  return {
    props: { proposal },
    revalidate: 60 * 5,
  }
}

export async function getStaticPaths() {
  let arr = []
  const proposals = await fetchProposals(0)
  for (const i in proposals) {
    arr.push(`/proposals/${i}`)
  }
  return {
    paths: arr,
    fallback: true,
  }
}

export default Proposal
