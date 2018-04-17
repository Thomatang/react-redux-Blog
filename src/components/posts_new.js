import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect }  from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    renderField(field){ // field argument contains event handlers that make sure that the Field in the render function's form KNOWS that it is responsible for for the input in the renderTitleField helper function

    const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}`;
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                className="form-control"
                type="text"
                    {...field.input} // field.input is an object that contains event handlers and props
                />
                <div className="text-help">
                {field.meta.touched ? field.meta.error:''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, ()=>{
            this.props.history.push("/");
        });
    }

    render(){

        const { handleSubmit } = this.props;

        return <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field label="Title" name="title" component={this.renderField} />
            <Field label="Tags" name="tags" component={this.renderField} />
            <Field label="Post Content" name="content" component={this.renderField} />
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to = '/' className="btn btn-danger">Cancel</Link>
          </form>;
    }

}

function validate(values){
    //console.log(values) -> { title: 'asdf', categories:'asdf, content:'asdf'}
    const errors = {};

    //validate inputs from 'values'
    if(!values.title) {
        errors.title = "Enter a title!";
    }
    if (!values.tags) {
      errors.tags = "Enter some tags!";
    }
    if (!values.content) {
      errors.content = "Enter some content please, that's what we're here for!";
    }

    //if errors is empty the form is fine to submit
    // if erros has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate: validate,
    form:'PostsnewForm'
})(
    connect(null,{createPost})(PostsNew)
); // connect reduxForm to PostsNew component