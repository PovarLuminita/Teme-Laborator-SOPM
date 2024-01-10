import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksList: [],
      newTaskInput: '',
      completedTasksList: [],
    };
  }

  addTask = () => {
    const { tasksList, newTaskInput } = this.state;
    if (newTaskInput.trim() !== '') {
      this.setState({
        tasksList: [...tasksList, newTaskInput],
        newTaskInput: '',
      });
    }
  };

  completeTask = (index) => {
    const { completedTasksList } = this.state;
    const newCompletedTasksList = [...completedTasksList];
    if (newCompletedTasksList.includes(index)) {
      const indexToRemove = newCompletedTasksList.indexOf(index);
      newCompletedTasksList.splice(indexToRemove, 1);
    } else {
      newCompletedTasksList.push(index);
    }
    this.setState({ completedTasksList: newCompletedTasksList });
  };

  renderHeader = () => (
    <View style={[styles.mainContainer, styles.backgroundPurple]}>
      <Text style={styles.titleText}>HELLO, STUDENT!</Text>
      <Text style={styles.dateText}>9.01.2024</Text>
    </View>
  );

  renderTasks = () => (
    <View style={[styles.mainContainer, styles.backgroundWhite]}>
      <Text style={styles.taskTitle}>TASKS</Text>
      <View style={[styles.mainContainer, styles.linePurple]}></View>
      {this.renderTaskList()}
      {this.renderTaskInput()}
    </View>
  );

  renderTaskList = () =>
    this.state.tasksList.map((task, index) => (
      <TouchableOpacity
        key={index}
        style={styles.taskItemContainer}
        onPress={() => this.completeTask(index)}
      >
        <Text style={styles.taskCheckbox}>
          {this.state.completedTasksList.includes(index) ? '☑️' : '🔲'}
        </Text>
        <Text
          style={[
            styles.taskContent,
            this.state.completedTasksList.includes(index) && styles.completedTaskContent,
          ]}
        >
          {task}
        </Text>
      </TouchableOpacity>
    ));

  renderTaskInput = () => (
    <>
      <TextInput
        style={styles.inputField}
        value={this.state.newTaskInput}
        onChangeText={(text) => this.setState({ newTaskInput: text })}
        placeholder="Add a new task..."
      />
      <TouchableOpacity style={styles.addButtonContainer} onPress={this.addTask}>
        <Text style={styles.addButtonText}>ADD TASK</Text>
      </TouchableOpacity>
    </>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderTasks()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  mainContainer: {
    width: 370,
    marginBottom: 24,
    borderRadius: 8,
    alignItems: 'left',
  },
  backgroundWhite: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backgroundPurple: {
    backgroundColor: 'pink',
    height: 90,
  },
  linePurple: {
    backgroundColor: 'pink',
    height: 2,
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  taskTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  taskItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskCheckbox: {
    fontSize: 20,
    marginRight: 20,
  },
  taskContent: {
    fontSize: 16,
  },
  completedTaskContent: {
    textDecorationLine: 'line-through',
    color: 'black',
  },
  inputField: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  addButtonContainer: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};
