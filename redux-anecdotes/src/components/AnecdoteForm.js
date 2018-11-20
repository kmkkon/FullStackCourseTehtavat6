import React from 'react'
import { createNewAnecdote } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.createNewAnecdote(content)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  createNewAnecdote
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
