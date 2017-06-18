import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      user: 'betterkenly'
    }

  }
   getThatRepos () {
    console.log(this.state.repos);
    var username = this.state.user;
    console.log(username);
    $.ajax({
      method: 'GET',
      url: '/repos',
      data: { username: username },
      success: (repos) => {
        this.setState({repos: JSON.parse(repos)});
      },
      error: () => {
        console.log('ERROR');
      }
    });

  }

  componentDidMount() {
    this.getThatRepos();
  }

  search (term) {

    this.setState({user: term});

    console.log(`${term} was searched`);
      $.ajax({
      method: "POST",
      url: "/repos/import",
      data: { username: term },
      success: () => {
        console.log('success!');
      },
      error: () => {
        console.log('ERROR');
      }
    });

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));