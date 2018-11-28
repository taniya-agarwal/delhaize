import React, { PropTypes, Component } from 'react';

import style from './App.css';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      initialComment: '',
      commentReply: {}
    };
  }

  // Sets the state of password and username fields
  enterComment = (e) => {
    this.setState({ initialComment: e.target.value });
  };

  onClick = (event) => {
    event.preventDefault();
    // checks form errors in all fields
    let validateAllObj = this.form.validateAll();
    let user = {
      'username': '',
      'password': ''
    };

    if (_.isEmpty(validateAllObj)) {
      // handle submit
      user.username = this.state.username;
      user.password = this.state.password;
      // Login action called
      LoginActions.loginUser(user);
    }
  };

  getTimeDifference = (inputTime) => {
    let currentTime = new Date()
    var diff = (currentTime.getTime() - inputTime) / 1000;
    let hours = Math.floor(diff / 3600);
    diff = diff % 3600;
    let minutes = Math.floor(diff / 60);
    let seconds = diff % 60;
    let returnString = (hours > 0 ? hours + 'hours' : '') + minutes + ' mins ago'
    return returnString
  }

  updateLike = (event, commentId) => {
    LoginActions.updateLike(commentId)
  }

  updateShare = (event, commentId) => {
    LoginActions.updateShare(commentId)
  }

  onSubmit = (event) => {
    let currentTime = new Date()

    let commentObj = {
      commentId: currentTime.getTime(),
      commentTime: currentTime.getTime(),
      userId: 'rajat@hotstar.com',
      name: 'Anonymous User',
      imgUrl: 'http://0.gravatar.com/avatar/38d618563e55e6082adf4c8f8c13f3e4?s=40&d=mm&r=g',
      likes: 0,
      share: 0,
      description: this.state.initialComment,
      replies: []
    }
    LoginActions.insertComment(commentObj)
  }

  removeApiError = (event) => {
    // removes error messages on focus of fields
    this.form.hideError(event.target.name);
  };

  replyComment = (event, commentId) => {
    this.state.commentReply[commentId] = true
    this.setState({ commentReply: this.state.commentReply })

  };

  componentDidMount() {
    LoginActions.getOldComment(localStorage.getItem('commentArray'))

  }

  render() {
    return (
      <div className="container">
        <div className="col-md-5">
          <div className="panel panel-default">
            <div className="panel-body">

              <section>
                <div className="row">
                  <div className="col-md-11">
                    <div className="media">
                      <div className="media-left">
                        <a href="#">
                          <img className="media-object photo-profile" src="http://0.gravatar.com/avatar/38d618563e55e6082adf4c8f8c13f3e4?s=40&d=mm&r=g" width="40" height="40" alt="..." />
                        </a>
                      </div>
                      <div className="media-body">
                        <AddForm>
                          <Form onValidSubmit={this.onSubmit} ref="form">
                            <input className="form-control" placeholder="Write comment here" value={this.state.initialComment} onChange={this.enterComment} />
                            <div className="fields">
                              <button id="commentButton" formNoValidate={true} type="submit"></button>
                            </div>
                          </Form>
                        </AddForm>

                      </div>
                    </div>
                  </div>
                  <div className="col-md-1">
                    <a href="#"><i className="glyphicon glyphicon-chevron-down"></i></a>
                  </div>
                </div>
              </section>

              {
                this.props.store.commentArray.length > 0 ?
                  (this.props.store.commentArray.map((user, index) => (
                    <div id="mainComment" key={user.commentId}>
                      <section className="post-heading">
                        <div className="row">
                          <div className="col-md-11">
                            <div className="media">
                              <div className="media-left">
                                <a href="#">
                                  <img className="media-object photo-profile" src={user.imgUrl} width="40" height="40" alt="..." />
                                </a>
                              </div>
                              <div className="media-body">
                                <a href="#" className="anchor-username"><h4 className="media-heading">{user.name}</h4></a>
                                <a href="#" className="anchor-time">{this.getTimeDifference(user.commentTime)}</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-1">
                            <a href="#"><i className="glyphicon glyphicon-chevron-down"></i></a>
                          </div>
                        </div>
                      </section>
                      <section className="post-body">
                        <p>{user.description}</p>
                      </section>
                      <section className="post-footer">
                        <hr />
                        <div className="post-footer-option container">
                          <ul className="list-unstyled">
                            <li className="inline" onClick={(e) => this.updateLike(e, user.commentId)}><a href="#"><i className="glyphicon glyphicon-thumbs-up"></i>{user.likes} Like</a></li>
                            <li className="inline" ><a href="#"><i className="glyphicon glyphicon-comment"></i>{user.replies.length + ' Comment'} </a></li>
                            <li className="inline" onClick={(e) => this.replyComment(e, user.commentId)}><a href="#"><i className="glyphicon glyphicon-comment"></i>Reply</a></li>
                            <li className="inline" onClick={(e) => this.updateShare(e, user.commentId)}><a href="#"><i className="glyphicon glyphicon-share-alt"></i>{user.share + ' Share'}</a></li>
                          </ul>
                        </div>
                        {this.state.commentReply[user.commentId] &&
                          <section>
                            <div className="row">
                              <div className="col-md-11">
                                <div className="media">
                                  <div className="media-left">
                                    <a href="#">
                                      <img className="media-object photo-profile" src="http://0.gravatar.com/avatar/38d618563e55e6082adf4c8f8c13f3e4?s=40&d=mm&r=g" width="40" height="40" alt="..." />
                                    </a>
                                  </div>
                                  <div className="media-body">
                                    <AddForm>
                                      <Form onValidSubmit={(e) => this.onSubmit()} ref="form">
                                        <input className="form-control" placeholder="Write comment here" />
                                        <div className="fields">
                                          <button id="commentButton" formNoValidate={true} type="submit"></button>
                                        </div>
                                      </Form>
                                    </AddForm>

                                  </div>
                                </div>
                              </div>
                              <div className="col-md-1">
                                <a href="#"><i className="glyphicon glyphicon-chevron-down"></i></a>
                              </div>
                            </div>
                          </section>

                        }

                      </section>
                      {
                        user.replies.length > 0 ?
                          (user.replies.map((subuser, index) => (
                            <div id="replies">
                              <section className="post-heading">
                                <div className="row">
                                  <div className="col-md-11">
                                    <div className="media">
                                      <div className="media-left">
                                        <a href="#">
                                          <img className="media-object photo-profile" src={subuser.imgUrl} width="40" height="40" alt="..." />
                                        </a>
                                      </div>
                                      <div className="media-body">
                                        <a href="#" className="anchor-username"><h4 className="media-heading">{subuser.name}</h4></a>
                                        <a href="#" className="anchor-time">{this.getTimeDifference(subuser.commentTime)}</a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-1">
                                    <a href="#"><i className="glyphicon glyphicon-chevron-down"></i></a>
                                  </div>
                                </div>
                              </section>
                              <section className="post-body">
                                <p>{subuser.description}</p>
                              </section>
                              <section className="post-footer">
                                <hr />
                                <div className="post-footer-option container">
                                  <ul className="list-unstyled">
                                    <li><a href="#"><i className="glyphicon glyphicon-thumbs-up"></i>{subuser.likes} Like</a></li>
                                    <li><a href="#"><i className="glyphicon glyphicon-comment"></i>{subuser.replies.length + ' Comment'} </a></li>
                                    <li><a href="#"><i className="glyphicon glyphicon-share-alt"></i>{subuser.share + ' Share'}</a></li>
                                  </ul>
                                </div>
                              </section>
                            </div>

                          ))) : ('')
                      }
                    </div>
                  ))) : ('')
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;