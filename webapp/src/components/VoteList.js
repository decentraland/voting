import React, {Component} from 'react'

export default class VoteList extends Component {

  render () {
    return <table>
      <tbody>
        <tr>
          <th className=''>{'Vote'}</th>
          <th className=''>{'Time Cast'}</th>
          <th className=''>{'Address'}</th>
        </tr>
        <tr>
          <td className='no'>
            {'No'}
          </td>
          <td>
            {'12 Hours ago'}
          </td>
          <td>
            {'0x232312...12302'}
          </td>
        </tr>
        <tr>
          <td className='yes'>
            {'Yes'}
          </td>
          <td>
            {'12 Hours ago'}
          </td>
          <td>
            {'0x232312...12302'}
          </td>
        </tr>
        <tr>
          <td className='yes'>
            {'Yes'}
          </td>
          <td>
            {'12 Hours ago'}
          </td>
          <td>
            {'0x232312...12302'}
          </td>
        </tr>
        <tr>
          <td className='no'>
            {'No'}
          </td>
          <td>
            {'12 Hours ago'}
          </td>
          <td>
            {'0x232312...12302'}
          </td>
        </tr>
        <tr>
          <td >
            {'Abstain'}
          </td>
          <td>
            {'12 Hours ago'}
          </td>
          <td>
            {'0x232312...12302'}
          </td>
        </tr>
      </tbody>
    </table>
  }
}
