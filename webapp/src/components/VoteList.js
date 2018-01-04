import React from 'react'

function VoteList (props) {
  const {votes, loading} = props.votes
  return (<table>
    <tbody>
      <tr>
        <th className=''>{'Vote'}</th>
        <th className=''>{'Time Cast'}</th>
        <th className=''>{'Address'}</th>
      </tr>
      { !loading && votes.map((vote, index) => <tr key={index}>
        <td className={vote.vote}>
          {vote.vote}
        </td>
        <td>
          {vote.date}
        </td>
        <td>
          {vote.address}
        </td>
      </tr>) }
    </tbody>
  </table>)
}

export default VoteList
