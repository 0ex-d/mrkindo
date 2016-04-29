"use strict";

var App = React.createClass({
  displayName: "App",

  getInitialState: function() {
    return {
      posts: []
    };
  },

  getPostsTags: function() {
    return {
      tags: []
    };
  },

  componentDidMount: function() {
    // Is there a React-y way to avoid rebinding `this`? fat arrow?
    var th = this;
    this.serverRequest = axios.get(this.props.feed).then(function (result) {
      th.setState({
        posts: result.data.posts
      });
    });
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        {className:"content-subhead"},
        "Recent Posts"
      ),
      this.state.posts.map(function (post) {
        return React.createElement(
          "section",
          { key: post.hashid, className: "post" },
          React.createElement(
            "header",
            { className: "post-header" },
              React.createElement(
                "h2",
                {className:"post-title"},
                post.title
              ),
              React.createElement(
                "p",
                {className:"post-meta"},
                React.createElement(
                  "a",
                  {className:"post-category post-category-design"},
                  post.tags[0].tag
                  //var pts=post.tags;
                  /*for (var i = Things.length - 1; i >= 0; i--) {
                    Things[i]
                  }*/
                )
              )
          ),
          React.createElement(
            "div",
            {className:"post-description post-a-d"},
            post.description
          )
        );
      })
    );
  }
});

var feedHold = document.getElementById("other-post");
React.render(React.createElement(App, { feed: "posts.json" }), feedHold);