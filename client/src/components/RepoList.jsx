import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ul>
    {props.repos.map( (each) => <li> {each['html_url']} </li>) }
    </ul>
  </div>
)

export default RepoList;