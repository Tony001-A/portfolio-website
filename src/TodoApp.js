import './App.css'



function App() {
  // --- 1. OUR VARIABLES (STATE) ---
  const [currentText, setCurrentText] = useState("");
  // Tasks are now objects with unique IDs
  const [taskList, setTaskList] = useState([
    { id: 1, text: "Clean the house", isEditing: false },
    { id: 2, text: "Walk the dog", isEditing: false }
  ]);

  // --- 2. THE ACTIONS (FUNCTIONS) ---
  
  //listens to the input field and updates the currentText state  
  function typedSomething(event) {
    setCurrentText(event.target.value);
  }

  // Adds a task
  function handleAddTask() {
    if (currentText.trim() === "") return;

    const newTask = {
      id: Date.now(), // Creates a unique ID
      text: currentText,
      isEditing: false
    };

    setTaskList([...taskList, newTask]); // Clean ES6 way to copy and add
    setCurrentText("");
  }

  // Keyboard Support: Triggers Add when pressing Enter
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleAddTask();
    }
  }

  // Removes a task using its unique ID
  function handleDeleteTask(idToRemove) {
    const updatedList = taskList.filter(task => task.id !== idToRemove);
    setTaskList(updatedList);
  }

  // Toggles a task between normal view and edit view
  function toggleEditMode(targetId) {
    const updatedList = taskList.map(task => {
      if (task.id === targetId) {
        return { ...task, isEditing: !task.isEditing };
      }
      return task;
    });
    setTaskList(updatedList);
  }

  // Updates the text of a specific task while typing in edit mode
  function handleEditTextChange(targetId, newText) {
    const updatedList = taskList.map(task => {
      if (task.id === targetId) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTaskList(updatedList);
  }

  // --- 3. THE VISUAL LAYOUT (UI) ---
  return (
    <div className="todo-container">
      <h2>My To-Do List</h2>

      {/* Input Section with Keyboard Support */}
      <div className="input-section">
        <input 
          type="text" 
          value={currentText} 
          onChange={typedSomething} 
          onKeyDown={handleKeyDown} // Listen for key presses here
          placeholder="Add a new task..." 
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      {/* List Section */}
      <ul className="todo-list">
        {taskList.map((task) => (
          <li key={task.id} className="todo-item">
            {task.isEditing ? (
              /* --- EDIT MODE LAYOUT --- */
              <>
                <input 
                  type="text" 
                  value={task.text} 
                  onChange={(e) => handleEditTextChange(task.id, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && toggleEditMode(task.id)} // Save on Enter
                />
                <button onClick={() => toggleEditMode(task.id)}>Save</button>
              </>
            ) : (
              /* --- NORMAL VIEW LAYOUT --- */
              <>
                <span>{task.text}</span>
                <div className="button-group">
                  <button onClick={() => toggleEditMode(task.id)}>Edit</button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
