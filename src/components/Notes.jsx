import { useState } from "react";
import Container from "../container/Container";
import Note from "./Note";

function Notes({ allNotes, addData, updateBody, deleteNotes }) {
  return (
    <Container>
      <div className="w-full py-8 flex justify-between gap-5 flex-wrap">
        {allNotes &&
          allNotes.map((note) => {
            return (
              <Note
                key={note?.id}
                {...note}
                addData={addData}
                updateBody={updateBody}
                deleteNotes={deleteNotes}
              />
            );
          })}
      </div>
    </Container>
  );
}

export default Notes;
