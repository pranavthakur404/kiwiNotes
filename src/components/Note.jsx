import React, { useState } from "react";

function Note({ id, title, body, addData, updateBody, deleteNotes }) {
  const [currentNotes, setCorrentNotes] = useState({
    title: "",
    body: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState("");

  const saveBtn = () => {
    if (currentNotes.title.length === 0 || currentNotes.body.length == 0) {
      return alert("Field Should not be Blanked !");
    } else if (title) {
      alert("Already Saved");
    }
    addData(id, currentNotes.title, currentNotes.body);
  };

  const handleEdit = () => {
    setIsEdit(true);
    setEdit(body);
  };

  const handleUpdate = () => {
    updateBody(id, edit);
    setEdit("");
    setIsEdit(false);
  };

  const handleDelete = () => {
    deleteNotes(id);
  };

  return (
    <div className="w-5/12 p-4 pb-1 bg-gray-400 rounded-xl self-start">
      {isEdit && (
        <textarea
          name="body"
          maxLength="2000"
          id="body"
          className="w-full h-40 p-1 bg-gray-800 text-white"
          value={edit}
          placeholder="Write your Notes.."
          onChange={(e) => {
            setEdit(e.target.value);
          }}
        ></textarea>
      )}

      {title ? (
        <div className="break-words">
          <h4 className="font-bold">{title}</h4>
          <p>{body}</p>
        </div>
      ) : (
        <>
          <input
            name="title"
            type="text"
            placeholder="Add Title"
            className="w-full p-1 bg-gray-800 text-white"
            value={currentNotes.title}
            onChange={(e) => {
              setCorrentNotes((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
              });
            }}
          />
          <br />
          <br />
          <textarea
            name="body"
            maxLength="2000"
            id="body"
            className="w-full h-40 p-1 bg-gray-800 text-white"
            value={currentNotes.body}
            placeholder="Write your Notes.."
            onChange={(e) => {
              setCorrentNotes((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
              });
            }}
          ></textarea>
        </>
      )}

      <div className="w-full flex justify-end">
        {isEdit && (
          <button
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 my-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
        {title && (
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 my-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}

        {!isEdit && (
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 my-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}

        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 my-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={saveBtn}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Note;
