import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Table, Grid, Row, Col, Button, Image, PageHeader, Panel, Badge } from 'react-bootstrap'

const Menu = () => (
  <div style={menuStyle}>
    <NavLink activeStyle={activeStyle} exact to="/">
    Anecdotes
    </NavLink>&nbsp;
    <NavLink activeStyle={activeStyle} exact to="/create">Create new</NavLink>&nbsp;
    <NavLink activeStyle={activeStyle} exact to="/about">About</NavLink>&nbsp;
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped bordered>
      <tbody>
        {anecdotes.map(anecdote =>
          <tr key={anecdote.id} >
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
        </tr>
        )}
      </tbody>
    </Table>
    <ul>

    </ul>  
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid>
    <Row className="show-grid">
    <Col xs={6} md={8}>
      <code><p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </code>
    </Col>
    <Col xs={3} md={2}>
      <code>
      <Image  src="https://www.thefamouspeople.com/profiles/images/alan-turing-1.jpg" alt="Alan Turing" width="400" circle></Image >
      </code>
    </Col>
  </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

const Anecdote = ({anecdote}) => (
  <div>
    <Panel>
    <PageHeader>{anecdote.content} <small>by {anecdote.author}</small></PageHeader>
    <p>This anecdote has <Badge>{anecdote.votes}</Badge> votes.</p>
    <p>For more info, check: <a href={anecdote.info}>{anecdote.info}</a></p>
    </Panel>
  </div>
)

const menuStyle = {
  backgroundColor: 'white',
  borderStyle: 'double',
  fontSize: 20,
  padding: 10
}

const activeStyle = {
  backgroundColor: 'lightgreen',
  borderStyle: 'double',
  fontSize: 20,
  padding: 10
}

const notificationStyle = {
  color: 'Tomato',
  fontSize: 20,
  padding: 10
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
        <Panel>
        <Table>
          <tr>
            <th>content</th>
            <th><input name='content' value={this.state.content} onChange={this.handleChange} /></th>
          </tr>
          <tr>
            <th>author</th>
            <th><input name='author' value={this.state.author} onChange={this.handleChange} /></th>
          </tr>
          <tr>
            <th>url for more info</th>
            <th><input name='info' value={this.state.info} onChange={this.handleChange} /></th>
          </tr>
        </Table>
          <Button bsStyle="primary">create</Button>

        </Panel>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: 'A new anecdote "' + anecdote.content + '" created!'})
    setTimeout(() => {
      this.setState({notification: ''})
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
        <Router>
          <div>
          <Menu />
          <div style= {notificationStyle}>{this.state.notification}</div>
          <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
          <Route path="/create" render={({history}) => <CreateNew history={history} addNew={this.addNew}/>} />
          <Route path="/about" render={() => <About />} />
          <Route exact path="/anecdotes/:id" render={({match}) =>
            <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
          />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
