import _ from 'lodash';
import React , {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchPosts} from '../actions/index';

class PostsIndex extends Component {
    componentDidMount() {  //lifecycle method: called as soon as component is being created
        this.props.fetchPosts(); // will load data from fetch posts action creator

    }
    
    renderPosts(){
        return _.map(this.props.posts, post => {
            return (
                <li className = "list-group-item" key ={post.id}>
                <Link to={`/posts/${post.id}`}>
                {post.title}
                </Link>
                </li>
            )
        }) // map over object, render an array thanks to lodash
    }
    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts </h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {posts: state.posts};
}

export default connect(mapStateToProps, {fetchPosts: fetchPosts})(PostsIndex);