import { useState } from 'react';
import './App.css';
import 'remixicon/fonts/remixicon.css';

const App = () => {
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(-450);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    fullname: "",
    class: '',
    roll: '',
    subject: '',
    dob: ''
  });

  const handleDrawer = () => {
    setOpen(0);
  };

  const handleInput = (e) => {
    const input = e.target
    const value = input.value
    const key = input.name
    setForm({
      ...form,
      [key]: value


      //   const { name, value } = e.target;
      //   setForm(prev => ({ ...prev, [name]: value }));
    });
  };

  const createStudent = (e) => {
    e.preventDefault();
    setStudents([
      ...students,
      form]) // Add the student data
    setForm({
      fullname: "", class: '', roll: '', subject: '', dob: ''
    });


    // setStudents(prev => [...prev, form]); // Add the student data
    // setForm({ fullname: "", class: '', roll: '', subject: '', dob: '' }); // Reset form

  };


  const deleteStudent = (index) => {
    const backUp = [...students]
    backUp.splice(index, 1)
    setStudents(backUp)


    //   setStudents(prev => prev.filter((_, i) => i !== index)); // Delete student

  }


  const editStudent = (index) => {
    setOpen(0);
    setForm(students[index]);
    setEditing(index);
  };

  const editingSave = (e) => {
    e.preventDefault();
    const updatedStudents = [...students];
    updatedStudents[editing] = form;
    setStudents(updatedStudents); // Update the students directly

    setEditing(null); // Reset editing mode
    setForm({ fullname: "", class: '', roll: '', subject: '', dob: '' }); // Reset form

    resetForm();  // Reset after saving. The function is invoked to execute the reset logic

    // When to Call resetForm()
    // You would typically call resetForm() in situations like:

    // After Successfully Adding a Student: When the user submits the form to add a new student, you call resetForm() to clear the fields for the next entry.

    // After Successfully Editing a Student: When the user saves changes to an existing student, you can call resetForm() to reset the form and close the editing view.

    // When Canceling an Operation: If the user decides to cancel the addition or editing process (e.g., clicking a close button), you can call resetForm() to return to the initial state
  };

  const resetForm = () => {
    setForm({ fullname: "", class: '', roll: '', subject: '', dob: '' });
    setEditing(null);
    setOpen(-450);
  };

  return (
    <div style={{ background: "#ddd", minHeight: "100vh" }}>
      <div style={{ background: "white", width: "60%", margin: "32px auto" }}>
        <h1 style={{ textAlign: "center", margin: "0", padding: "0" }}>CRUD with Form Input</h1>
        <button onClick={handleDrawer} style={{ background: "#4A004A", color: "white", padding: "6px 12px", borderRadius: '5px', margin: "25px 10px" }}>
          <i className="ri-user-add-fill"></i> New Student
        </button>
        <table className='crud-app'>
          <thead>
            <tr>
              <th>S/ No</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Roll</th>
              <th>DOB</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.fullname}</td>
                <td>{student.subject}</td>
                <td>{student.class}</td>
                <td>{student.roll}</td>
                <td>{student.dob}</td>
                <td>
                  <div>
                    <button onClick={() => editStudent(index)} style={{ background: "#4A004A", border: "none", fontSize: 20, color: "white", marginRight: '8px' }}>
                      <i className="ri-edit-box-line"></i>
                    </button>
                    <button onClick={() => deleteStudent(index)} style={{ background: "red", border: "none", fontSize: 20, color: "white" }}>
                      <i className="ri-delete-bin-6-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <aside style={{ top: 0, right: open, position: "fixed", width: 450, background: "white", boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px", height: "100%", padding: "32px", boxSizing: "border-box", transition: ".5s" }}>
        <button onClick={resetForm} style={{ background: "white", border: "none", fontSize: 20, position: 'absolute', top: 20, right: 20 }}>
          <i className="ri-close-circle-fill"></i>
        </button>
        <h2>My Drawer</h2>

        <form onSubmit={editing === null ? createStudent : editingSave} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <input
            value={form.fullname}
            onChange={handleInput}
            required
            type="text"
            name='fullname'
            placeholder='Enter Full Name'
            style={{ border: "black solid 1px", padding: 10 }} />

          <input
            value={form.class}
            onChange={handleInput}
            required
            type="text"
            name='class'
            placeholder='Enter Your Class Name'
            style={{ border: "black solid 1px", padding: 10 }} />

          <input
            value={form.roll}
            onChange={handleInput}
            required
            type="text"
            name='roll'
            placeholder='Enter Your Roll'
            style={{ border: "black solid 1px", padding: 10 }} />

          <input
            value={form.subject}
            onChange={handleInput}
            required
            type="text"
            name='subject'
            placeholder='Enter Your Subject'
            style={{ border: "black solid 1px", padding: 10 }} />

          <input
            value={form.dob}
            onChange={handleInput}
            required
            type="date"
            name='dob'
            style={{ border: "black solid 1px", padding: 10 }} />

          <button style={{ background: editing === null ? "#4A004A" : "blue", padding: 10, color: "wheat" }}>
            {editing === null ? 'Submit' : 'Save Now'}
          </button>
        </form>
      </aside>
    </div>
  );
};

export default App;
