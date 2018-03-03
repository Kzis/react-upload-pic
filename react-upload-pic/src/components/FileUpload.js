import React, { Component } from 'react';
// import ReactDom from 'react-dom';
import firebase from 'firebase';

class FileUpload extends Component {

    constructor(props){
        super(props);

        this.state = {
            uploadValue: 0,
            picture: '',
            fileName:''
        }

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDdjNteSHXKMvPbUoKMhXVGVGcnxh1QplI",
            authDomain: "react-upload.firebaseapp.com",
            databaseURL: "https://react-upload.firebaseio.com",
            projectId: "react-upload",
            storageBucket: "react-upload.appspot.com",
            messagingSenderId: "704952803467"
        };
        firebase.initializeApp(config);

    }
    
    handleOnChange(e){
        const file = e.target.files[0];
        // console.log(file)

        this.setState({
            fileName:file.name
        })

        const storageRef = firebase.storage().ref(`pictures/${file.name}`);
        const task = storageRef.put(file)

        task.on(`state_changed` , (snapshort) => {
            console.log(snapshort.bytesTransferred, snapshort.totalBytes)
            let percentage = (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
            this.setState({
                uploadValue:percentage
            })
        } , (error) => {
            this.setState({
                messag:`Upload error : ${error.messag}`
            })
        } , () => {
            console.log(task.snapshot.downloadURL)
            this.setState({
                messag:`Upload Success`,
                picture: task.snapshot.downloadURL
            })
        })
    }

    render() {
        return (
        <div className="">
            <br/><br/><br/>
            <progress className='progress is-success' value={this.state.uploadValue} max='100'></progress>
            <br/>
            {/* <input type='file' onChange={this.handleOnChange.bind(this)}></input> */}
            
            <div className="file is-info has-name outer">
                <label className="file-label outer">
                <input className="file-input" type="file" onChange={this.handleOnChange.bind(this)}></input>
                <span className="file-cta">
                    <span className="file-icon">
                        <i className="fas fa-upload"></i>
                    </span>
                    <span className="file-label">
                        Choose file…
                    </span>
                </span>
                <span className="file-name outer">
                    {this.state.fileName}
                </span>
                </label>
            </div>

            <br/>
            {this.state.messag}
            <br/>
            <img width='300' src={this.state.picture}></img>

        </div>
        );
    }
}

export default FileUpload;
