import React, {Component} from 'react';
import Main from './Main.js';
import Header from './Header.js';
import Footer from './Footer.js';
import '../style/App.css';
import header_logo from '../img/logo_mytona.svg';
import footer_logo from '../img/wlmg-pixels.png';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            addId: null,
            editNameId: null,
            editDescriptionId: null,
            editUrlId: null,
            editLogoId: null,
            editImageId: null,
            deleteId: null,
            formName: null,
            watch: false,
            index: null,
            logoSrc: 'https://via.placeholder.com/180x100.png?text=Logo',
            editLogoSrc: 'https://via.placeholder.com/180x100.png?text=Logo',
            imageSrc: 'https://via.placeholder.com/682x300.png?text=Image',
            editImageSrc: 'https://via.placeholder.com/682x300.png?text=Image',
            showAddForm: false,
            nameid: null,
            showEditForm: false,
            showDeleteModal: false,
            hide: false,
            isLoading: false,
            limit: 5,
            length: null,
            successName: false,
            successLogo: false,
            successDescription: false,
            successImage: false,
            successUrl: false,
            hideSuccess: false
        };
        this.updateLimit = this.updateLimit.bind(this);
    }
    updateLimit(){
        this.setState((prev) => {
          return {limit: prev.limit + 5};
        });
        this.setState({isLoading: true});
    }
    addPost(e){
        fetch('http://localhost:3000/items', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                logo: this.state.logoSrc,
                image: this.state.imageSrc,
                url: document.getElementById('url').value
            })
        })
        .then(res => res.json())
        .then(json => {
            this.setState((prev) => {
                return {length: prev.length + 1};
            });
            if(this.state.limit >= this.state.length){
                let {items} = this.state;
                items.push(json);
                this.setState({items});
            };
        });
        event.preventDefault();
        return false;
    }
    deletePost(id){
        document.body.removeAttribute("style");
        fetch('http://localhost:3000/items/'+id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(json => {
            this.setState((prev) => {
                return {length: prev.length - 1};
            });
            this.setState({items: this.state.items.filter(post => post.id !== id)});
            if(this.state.length == this.state.limit - 5){
                this.setState((prev) => {
                    if(this.state.limit > 5){
                        return {limit: prev.limit - 5};
                    };
                });
            };
        });
    }
    editName(id, e){
        fetch('http://localhost:3000/items/'+id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: document.getElementById('editName').value
	       })
        })
        .then(res => res.json())
        .then(json => {
            let {items} = this.state;
            let position = items.findIndex(post => post.id === id);
            items[position] = json;
            this.setState({items});
        });
        this.setState({successName: true});
        setTimeout(
            function() {
                this.setState({hideSuccess: true});
            }
            .bind(this), 1500
        );
        setTimeout(
            function() {
                this.setState({successName: false});
            }
            .bind(this), 3500
        );
        event.preventDefault();
        return false;
    }
    editDescription(id, e){
        fetch('http://localhost:3000/items/'+id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                description: document.getElementById('editDescription').value
	       })
        })
        .then(res => res.json());
        this.setState({successDescription: true});
        setTimeout(
            function() {
                this.setState({hideSuccess: true});
            }
            .bind(this), 1500
        );
        setTimeout(
            function() {
                this.setState({successDescription: false});
            }
            .bind(this), 3500
        );
        event.preventDefault();
        return false;
    }
    editUrl(id, e){
        fetch('http://localhost:3000/items/'+id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                url: document.getElementById('editUrl').value
	       })
        })
        .then(res => res.json());
        this.setState({successUrl: true});
        setTimeout(
            function() {
                this.setState({hideSuccess: true});
            }
            .bind(this), 1500
        );
        setTimeout(
            function() {
                this.setState({successUrl: false});
            }
            .bind(this), 3500
        );
        event.preventDefault();
        return false;
    }
    editLogo(id, e){
        fetch('http://localhost:3000/items/'+id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                logo: this.state.editLogoSrc
	       })
        })
        .then(res => res.json());
        this.setState({successLogo: true});
        setTimeout(
            function() {
                this.setState({hideSuccess: true});
            }
            .bind(this), 1500
        );
        setTimeout(
            function() {
                this.setState({successLogo: false});
            }
            .bind(this), 3500
        );
        event.preventDefault();
        return false;
    }
    editImage(id, e){
        fetch('http://localhost:3000/items/'+id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                image: this.state.editImageSrc
	       })
        })
        .then(res => res.json());
        this.setState({successImage: true});
        setTimeout(
            function() {
                this.setState({hideSuccess: true});
            }
            .bind(this), 1500
        );
        setTimeout(
            function() {
                this.setState({successImage: false});
            }
            .bind(this), 3500
        );
        event.preventDefault();
        return false;
    }
    showAdd(){
        this.setState({hide: false});
        this.setState({showAddForm: true});
        this.setState({addId: () =>{this.addPost(); this.closeBtn()}});
        document.body.setAttribute("style", "overflow:hidden;");
    }
    showEdit(id, index){
        this.setState({hide: false});
        this.setState({showEditForm: true});
        this.setState({editNameId: () =>{this.editName(id)}});
        this.setState({editDescriptionId: () =>{this.editDescription(id)}});
        this.setState({editUrlId: () =>{this.editUrl(id)}});
        this.setState({editLogoId: () =>{this.editLogo(id)}});
        this.setState({editImageId: () =>{this.editImage(id)}});
        document.body.setAttribute("style", "overflow:hidden;");
        this.setState({index: index});
    }
    showDelete(id){
        this.setState({hide: false});
        this.setState({showDeleteModal: true});
        this.setState({deleteId: () =>{this.deletePost(id); this.closeBtn()}});
        document.body.setAttribute("style", "overflow:hidden;");
    }
    closeBtn(){
        this.setState({hide: true});
        setTimeout(
            function() {
                this.setState({showAddForm: false});
                this.setState({showEditForm: false});
                this.setState({showDeleteModal: false});
                document.body.removeAttribute("style");
            }
            .bind(this), 400
        );
        this.setState({logoSrc: 'https://via.placeholder.com/180x100.png?text=Logo'});
        this.setState({editLogoSrc: 'https://via.placeholder.com/180x100.png?text=Logo'});
        this.setState({imageSrc: 'https://via.placeholder.com/682x300.png?text=Image'});
        this.setState({editImageSrc: 'https://via.placeholder.com/682x300.png?text=Image'});
    }
    watchPost(index){
        this.setState({watch: true});
        this.setState({index: index});
    }
    watchPage(){
        return(
            <main>
                <div className="back-btn">
                    <button className="btn" onClick={() =>{this.setState({watch: false})}} type="button"><span className="icon back"></span>Back</button>
                </div>
                <div className="description-block">
                    <img src={this.state.items[this.state.index] ? this.state.items[this.state.index].image : null} className="description-image" />
                    <h1 className="description-title">{this.state.items[this.state.index] ? this.state.items[this.state.index].name : null}</h1>
                    <p className="description-text">{this.state.items[this.state.index] ? this.state.items[this.state.index].description : null}</p>
                    <p className="description-url"><span>URL :</span> <a href={this.state.items[this.state.index] ? 'http://'+this.state.items[this.state.index].url : null}>{this.state.items[this.state.index] ? this.state.items[this.state.index].url : null}</a></p>
                </div>
            </main>
        );
    }
    headerDefaultView(){
        return(
            <header>
                <div className="header">
                    <a href="https://mytona.com">
                        <img className="logo" src={header_logo} width="88" height="22" alt="MyTona" />
                    </a>
                    <button onClick={() =>{this.showAdd()}} type="button">Add<span className="plus"></span></button>
                </div>
            </header>
        );
    }
    headerWatchPage(){
        return(
            <header>
                <a href="https://mytona.com">
                    <img className="logo" src={header_logo} width="88" height="22" alt="MyTona" />
                </a>
            </header>
        );
    }
    encodeLogoFileAsURL(){
        var filesSelected = document.getElementById("logo").files;
        if (filesSelected.length > 0){
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();
            const scope = this
            fileReader.onload = function(fileLoadedEvent){
                var srcLogoData = fileLoadedEvent.target.result; // <--- data: base64
                scope.setState({logoSrc: srcLogoData});
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }
    encodeEditLogoFileAsURL(){
        var editFilesSelected = document.getElementById("editLogo").files;
        if (editFilesSelected.length > 0){
            var editFileToLoad = editFilesSelected[0];
            var editFileReader = new FileReader();
            const scope = this
            editFileReader.onload = function(fileLoadedEvent){
                var editSrcLogoData = fileLoadedEvent.target.result; // <--- data: base64
                scope.setState({editLogoSrc: editSrcLogoData});
            }
            editFileReader.readAsDataURL(editFileToLoad);
        }
    }
    encodeImageFileAsURL(){
        var filesSelected = document.getElementById("image").files;
        if (filesSelected.length > 0){
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();
            const scope = this
            fileReader.onload = function(fileLoadedEvent){
                var srcImageData = fileLoadedEvent.target.result; // <--- data: base64
                scope.setState({imageSrc: srcImageData});
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }
    encodeEditImageFileAsURL(){
        var editFilesSelected = document.getElementById("editImage").files;
        if (editFilesSelected.length > 0){
            var editFileToLoad = editFilesSelected[0];
            var editFileReader = new FileReader();
            const scope = this
            editFileReader.onload = function(fileLoadedEvent){
                var editSrcImageData = fileLoadedEvent.target.result; // <--- data: base64
                scope.setState({editImageSrc: editSrcImageData});
            }
            editFileReader.readAsDataURL(editFileToLoad);
        }
    }
    defaultView(){
        var className = this.state.hide ? 'modal hide' : 'modal';
        var fadeSuccess = this.state.hideSuccess ? 'hideSuccess': 'null';
        var url = 'http://';
        const {items, isLoading} = this.state;
        return(
            <main>
                {this.state.items.map((post, index) => {
                    return(
                        <div className="card" key={post.id}>
                            <span className="card-number">{index+1}</span>
                            <img className="card-logo" src={post.logo} />
                            <div className="card-title">
                                <h1>{post.name}</h1>
                                <div className="card-buttons">
                                    <button className="btn" onClick={() =>{this.watchPost(index)}}><span className="btn-name">Details</span><span className="icon eye"></span></button>
                                    <button className="btn" onClick={() =>{this.showEdit(post.id, index)}}><span className="btn-name">Edit</span><span className="icon edit"></span></button>
                                    <button className="btn" onClick={() =>{this.showDelete(post.id)}}><span className="btn-name">Delete</span><span className="icon remove"></span></button>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {this.state.isLoading &&
                    <span className="spinner"></span>
                }
                {!this.state.isLoading && this.state.limit < this.state.length &&
                    <button className="load-more" onClick={() =>{this.request(); this.updateLimit()}} type="button">Load more</button>
                }
                {this.state.showAddForm &&
                    <div className="background">
                        <div className={className}>
                            <div className="form-header">
                                <p className="form-title">Add Project</p>
                                <span className="cross" onClick={() =>{this.closeBtn()}}>×</span>
                            </div>
                            <form onSubmit={this.state.addId}>
                                <div className="form-body">
                                    <label for="name">Name:</label><br />
                                    <input className="form-input" id="name" type="text" required /><br />
                                    <label for="logo">Logo:</label><br />
                                    <input id="logo" type="file" onChange={() =>{this.encodeLogoFileAsURL()}} /><br />
                                    <label for="description">Description:</label><br />
                                    <textarea className="form-input" rows="6" id="description" type="text" /><br />
                                    <label for="image">Image:</label><br />
                                    <input id="image" type="file" onChange={() =>{this.encodeImageFileAsURL()}} /><br />
                                    <label for="url">URL:</label><br />
                                    <div className="url-input">
                                        <p>{url}</p>
                                        <input className="form-input" id="url" type="text" pattern="^((?!http://|https://).)*$" required />
                                    </div>
                                </div>
                                <div className="form-footer">
                                    <button className="close-btn" onClick={() =>{this.closeBtn()}} type="button">Close</button>
                                    <button className="btn" type="submit">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
                {this.state.showEditForm &&
                    <div className="background">
                        <div className={className}>
                            <div className="form-header">
                                <p className="form-title">Edit Project</p>
                                <span className="cross" onClick={() =>{this.closeBtn()}}>×</span>
                            </div>
                            <div className="form-body edit-form">
                                <form onSubmit={this.state.editNameId}>
                                    <label for="edutName">Name:</label><br />
                                    <input className="form-input" id="editName" type="text" required defaultValue={this.state.items[this.state.index].name} />
                                    <div className="save-changes-block">
                                        <button className="btn" type="submit">Save changes</button>
                                        {this.state.successName &&
                                            <p className={fadeSuccess}>Changes saved!</p>
                                        }
                                    </div>
                                </form>
                                <form onSubmit={this.state.editLogoId}>
                                    <label for="editLogo">Logo:</label><br />
                                    <input id="editLogo" type="file" onChange={() =>{this.encodeEditLogoFileAsURL()}} />
                                    <div className="save-changes-block">
                                        <button className="btn" type="submit">Save changes</button>
                                        {this.state.successLogo &&
                                            <p className={fadeSuccess}>Changes saved!</p>
                                        }
                                    </div>
                                </form>
                                <form onSubmit={this.state.editDescriptionId}>
                                    <label for="editDescription">Description:</label><br />
                                    <textarea className="form-input" rows="6" id="editDescription" type="text" defaultValue={this.state.items[this.state.index].description} />
                                    <div className="save-changes-block">
                                        <button className="btn" type="submit">Save changes</button>
                                        {this.state.successDescription &&
                                            <p className={fadeSuccess}>Changes saved!</p>
                                        }
                                    </div>
                                </form>
                                <form onSubmit={this.state.editImageId}>
                                    <label for="editImage">Image:</label><br />
                                    <input id="editImage" type="file" onChange={() =>{this.encodeEditImageFileAsURL()}} />
                                    <div className="save-changes-block">
                                        <button className="btn" type="submit">Save changes</button>
                                        {this.state.successImage &&
                                            <p className={fadeSuccess}>Changes saved!</p>
                                        }
                                    </div>
                                </form>
                                <form onSubmit={this.state.editUrlId}>
                                    <label for="edutUrl">URL:</label><br />
                                    <div className="url-input">
                                        <p>{url}</p>
                                        <input className="form-input" id="editUrl" type="text" pattern="^((?!http://|https://).)*$" required defaultValue={this.state.items[this.state.index].url} />
                                    </div>
                                    <div className="save-changes-block">
                                        <button className="btn" type="submit">Save changes</button>
                                        {this.state.successUrl &&
                                            <p className={fadeSuccess}>Changes saved!</p>
                                        }
                                    </div>
                                </form>
                            </div>
                            <div className="form-footer">
                                <button className="close-btn" onClick={() =>{this.closeBtn()}} type="button">Close</button>
                            </div>
                        </div>
                    </div>
                }
                {this.state.showDeleteModal &&
                    <div className="background">
                        <div className={className}>
                            <div className="form-header">
                                <p className="form-title">Delete Project</p>
                                <span className="cross" onClick={() =>{this.closeBtn()}}>×</span>
                            </div>
                            <div className="form-body delete-modal">
                                <p>Are you sure?</p>
                                <button className="btn" onClick={this.state.deleteId}>Yes</button>
                                <button className="btn" onClick={() =>{this.closeBtn()}}>No</button>
                            </div>
                        </div>
                    </div>
                }
            </main>
        );
    }
    footerView(){
        return(
            <footer>
                <img src={footer_logo} />
                <p>© MyTona, 2018-2019. All rights reserved</p>
            </footer>
        );
    }
    request(){
        Promise.all([
            fetch('http://localhost:3000/items?_limit='+this.state.limit),
            fetch('http://localhost:3000/items')
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([json1, json2]) => this.setState({
            items: json1, 
            length: json2.length,
            isLoading: false
        }));
    }
    componentDidMount(){
        this.setState({isLoading: true});
        this.request();
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.limit !== this.state.limit){
            this.request();
        }
    }
    render(){
        return(
            <>
                <Header headerWatch={this.state.watch} show={() =>{this.showAdd()}} headerWatchFunc={this.headerWatchPage()} headerDefaultFunc={this.headerDefaultView()} />
                <Main watch={this.state.watch} watchFunc={this.watchPage()} defaultFunc={this.defaultView()} />
                <Footer footerFunc={this.footerView()} />
            </>
        );
    }
}
            
export default App;