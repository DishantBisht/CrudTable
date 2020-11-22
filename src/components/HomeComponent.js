import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchRows, postRow, deleteRow, putRow} from '../redux/actionCreators';
import { Table, Button, ButtonGroup, Input, Form, Col, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';


const mapStateToProps = state => {
    return {
      rows: state.rows
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchRows: () => { dispatch(fetchRows())},
    postRow: (name, description) => dispatch(postRow(name, description)),
    deleteRow: (rowId) => dispatch(deleteRow(rowId)),
    putRow: (rowId, name, description) => dispatch(putRow(rowId, name, description))
});

class Home extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            nameInput: '',
            descInput: '',
            currRow: {},
            currName: '',
            currDesc: '',
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleModalName = this.handleModalName.bind(this);
        this.handleModalDesc = this.handleModalDesc.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
     
    }
    
    componentDidMount(){
        this.props.fetchRows();
    }

    handleModal(event){
        this.setState({
            currRow: event.target.id,
            currName: event.target.name,
            currDesc: event.target.title,
            isModalOpen: !this.state.isModalOpen
        });
    }

    toggleModal(event){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleUpdateSubmit(values) {
      this.toggleModal();
      this.props.putRow(this.state.currRow, values.name ,values.description);
    }

    handleNameChange(event) {
        this.setState({nameInput: event.target.value});
      }

    handleDescChange(event) {
        this.setState({descInput: event.target.value});
      }

    handleModalName(event){
        this.setState({currName: event.target.value});
    }

    handleModalDesc(event){
        this.setState({currDesc: event.target.value});
    }


    handleSubmit(values){
        this.props.postRow(this.state.nameInput , this.state.descInput);
      }
    
    handleDelete(rowId){
        this.props.deleteRow(rowId);
    }


    render(){



        const ROWS = Array.from(this.props.rows);
        const Rowlist = ROWS.map((row, index) => {
            
            return(
                
                <tr key={row._id}>
                    <td>{row.name}</td>
                    <td>{row.description}</td>
                    <td>
                        <ButtonGroup>
                            <Button name='delete' color="danger" onClick={() => {this.handleDelete(row._id)}}>Delete</Button>
                            
                            <Button id={row._id} name={row.name} title={row.description} onClick={this.handleModal} >Update Row</Button>

                        </ButtonGroup>
                    </td>
                </tr>
            );
        });

        return(
            
            <div className='container'>
                <div>
                
                    <Form onSubmit = {(values) => this.props.handleSubmit(values)}>
                    <Table dark hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>Update Row</ModalHeader>
                                <ModalBody>
                                    <LocalForm onSubmit={(values) => this.handleUpdateSubmit(values)}>
                                        <Label htmlFor="name">Name</Label>
                                        <Row className="form-group">
                                            <Col md={12}>
                                                <Control.text onChange={this.handleModalName} model=".name" id="name" name="name" value={this.state.currName}
                                                className="form-control" />
                                            </Col>
                                        </Row>
                                        <Label htmlFor="description">description</Label>
                                        <Row className="form-group">
                                            <Col>
                                                <Control.textarea onChange={this.handleModalDesc} model=".description" id="description" name="description" 
                                                rows="6"  value={this.state.currDesc}
                                                className="form-control"/>
                                                    
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col>
                                                <Button type="submit" color="primary">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </LocalForm>
                                </ModalBody>
                                </Modal>
                            {Rowlist}
                            <tr>
                                <td><Input id='name'placeholder="Enter Name" value={this.state.nameInput} onChange={this.handleNameChange}/></td>
                                <td><Input id='desc' placeholder="Enter Description" value={this.state.descInput} onChange={this.handleDescChange}/></td>
                                <td>
                                <Button type='submit' onClick={this.handleSubmit} >Add</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    </Form>
                </div>
                
            </div>
        );
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);