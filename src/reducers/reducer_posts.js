import _ from 'lodash';
import {FETCH_POSTS, FETCH_POST, DELETE_POST} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case  DELETE_POST:
            return _.omit(state, action.payload); // if the state object has key of post id , just omit from the object
            
        case FETCH_POST:
            // const post = action.payload.data;
            // const newState = {...state};
            // newState[post.id] = post;
            // return newState;
            return{...state, [action.payload.data.id]:action.payload.data}; // ES6
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id'); // this will pull off the id property of every incoming post

        default:
            return state;
    }
}