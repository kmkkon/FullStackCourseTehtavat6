import React from 'react'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'

class AnecdoteList extends React.Component {

  addVote = async (anecdote) => {
    this.props.voteAnecdote(anecdote)
  }
  showNotification = (anecdote) => {
    this.props.notify(`you voted '${anecdote.content}'`, 5)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.addVote(anecdote)
                this.showNotification(anecdote)
              }
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  console.log(anecdotes)
  return (
    anecdotes
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  notify
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
