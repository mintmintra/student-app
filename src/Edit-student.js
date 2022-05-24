import React, { Component } from 'react';
import { connect } from 'react-redux';
class EditStudent extends Component {
    state = {
        id: '',
        name: '',
        score: ''
    }
    onChangeData = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
    componentDidMount() {
        const userId = this.props.match.params.id;
        const student = this.getCurrentStudent(userId);
        if (student) {
            this.setState({
                id: student.id,
                name: student.name,
                score: student.score
            })
        } else {
            this.props.history.push('/')
        }
    }
    getCurrentStudent(id) {
        const allStudents = this.props.studentsFromStore;
        const [student] = allStudents.filter((item) => {
            return item.id === id;
        });
        return student;
    }
    onSubmitStudentForm = (data, event) => {
        event.preventDefault();
        const newData = {
            id: data.id,
            name: data.name,
            score: data.score
        }
        this.props.editStudentAtStore(newData);
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="row mt-3 mb-5 ml-5 mr-5">
                <div className="card col-12 col-sm-8 col-lg-6 mx-auto">
                    <div className="card-body">
                        <form onSubmit={this.onSubmitStudentForm.bind(this, this.state)}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChangeData}
                                />
                            </div>
                            <div className="form-group">
                                <label>Score</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="score"
                                    value={this.state.score}
                                    onChange={this.onChangeData}
                                />
                            </div>
                            <div className="form-group text-center pt-3">
                                <button
                                    onClick={() => this.props.history.push('/')}
                                    className="btn btn-outline-success mx-1"
                                >ยกเลิก</button>
                                <button
                                    type="submit"
                                    className="btn btn-primary mx-1"
                                >แก้ไข</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        studentsFromStore : state.students
    }
}
const mapDispatchToProps = dispatch => {
    return {
        editStudentAtStore: (id) => {
            return dispatch({type: 'EDIT_STUDENT', payload: id})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditStudent);