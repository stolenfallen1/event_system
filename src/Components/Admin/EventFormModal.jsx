import React, { useState } from 'react';
import '../../Styles/admin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const content = event.target.elements.content.value;
    const location = event.target.elements.location.value;
    const startDate = event.target.elements.startDate.value;
    const endDate = event.target.elements.endDate.value;
    const status = event.target.elements.status.value;
    const file = event.target.elements.file.value;

    if (window.confirm("Are you sure all details are already correct?")) {
      const response = await fetch('http://localhost:4000/createEvents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, location, startDate, endDate, status, file })
      });

      if (response.status === 200) {
        const responseData = await response.json();
        toast.success("Event added successfully!");
        console.log(responseData);
        setIsOpen(false);
      } else {
        toast.error("Failed to add event!");
        console.log("Error");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <button className='addbutton' onClick={toggleModal}>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg> Add new event
        </span>
      </button>
      {isOpen && (
        <div className='event-form-modal'>
          <form onSubmit={onSubmit}>
            <label htmlFor='title'>Event Title:</label>
            <input type='text' id='title' name='title' required />

            <label htmlFor='content'>Event Content:</label>
            <textarea id='content' name='content' required></textarea>

            <label htmlFor='location'>Location:</label>
            <input type='text' id='location' name='location' required />

            <label htmlFor='startDate'>Start Date:</label>
            <input type='date' id='startDate' name='startDate' />

            <label htmlFor='endDate'>End Date:</label>
            <input type='date' id='endDate' name='endDate' />

            <label htmlFor='status'>Event Status:</label>
            <select id='status' name='status' required>
              <option value='Upcoming Event'>Upcoming Event</option>
              <option value='Ongoing Event'>Ongoing Event</option>
              <option value='Finished Event'>Finished Event</option>
            </select>

            <label htmlFor='file'>Event Image:</label>
            <input type='file' id='file' name='file' />

            <div className='btn-wrap'>
              <button type='submit'>Submit</button>
              <button className='cancel-btn' type='button' onClick={toggleModal}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EventFormModal;
