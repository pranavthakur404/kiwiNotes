import { useEffect, useState } from "react";
import Notes from "./components/Notes";
import Container from "./container/Container";
import { supabase } from "./supabaseClient";

function App() {
  const [allData, setAllData] = useState();
  const [allNotes, setAllNotes] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // working of search button
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchInput.length == 0) {
      setAllNotes(allData);
    }
    setAllNotes(() => {
      return allData.filter((data) => {
        return data.title.toLowerCase().includes(searchInput);
      });
    });
  };

  const fetchData = async () => {
    let { data, error } = await supabase.from("AllData").select("*");
    if (error) {
      throw error;
    } else {
      setAllData(data);
      setAllNotes(data || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addNewNotes = async () => {
    try {
      const { data, error } = await supabase
        .from("AllData")
        .insert([{ title: "", body: "" }])
        .select();
      if (error) {
        throw err;
      } else {
        data && setAllNotes([...allNotes, ...data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addData = async (id, title, body) => {
    const { data, error } = await supabase
      .from("AllData")
      .update({ title: title, body: body })
      .eq("id", id)
      .select();
    setAllNotes((prevState) => {
      return prevState.map((state) => {
        if (state.id == id) {
          return { ...state, title: title, body: body };
        } else {
          return { ...state };
        }
      });
    });
    if (error) {
      throw error;
    }
  };

  const updateBody = async (id, editValue) => {
    const { data, error } = await supabase
      .from("AllData")
      .update({ body: editValue })
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
    } else {
      setAllNotes((prevNotes) => {
        return prevNotes.map((notes) => {
          if (notes.id == id) {
            return { ...notes, body: editValue };
          } else {
            return { ...notes };
          }
        });
      });
    }
  };

  const deleteNotes = async (id) => {
    const { error } = await supabase.from("AllData").delete().eq("id", id);
    if (error) {
      throw error;
    } else {
      setAllNotes((prevNotes) => {
        return prevNotes.filter((notes) => {
          return notes.id !== id;
        });
      });
    }
  };

  return (
    <>
      <header className="text-white bg-gray-400">
        <Container>
          <div className="w-full flex items-center justify-between">
            <h1 className="text-2xl py-4 font-bold">My Notes</h1>
            <form action="#" onSubmit={handleSubmit}>
              <input
                type="search"
                id="website"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              ></input>
            </form>
          </div>
        </Container>
      </header>
      <main>
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 block my-0 mx-auto mt-4"
          onClick={addNewNotes}
        >
          Add Notes
        </button>
        <Container>
          <Notes
            allNotes={allNotes}
            addData={addData}
            updateBody={updateBody}
            deleteNotes={deleteNotes}
          />
        </Container>
      </main>
    </>
  );
}

export default App;
