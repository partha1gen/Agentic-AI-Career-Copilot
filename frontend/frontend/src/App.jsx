import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  const [file, setFile] = useState(null);
  const [statusText, setStatusText] = useState(null);
  const [query, setQuery] = useState(null);
  const [searchtresult, setSearchResult] = useState([]);

  const uploadResume = async () => {
    const url = "http://localhost:3000/upload-resume";
    const formData = new FormData();
    setStatusText(" ");
    formData.append("resume", file);
    try {
      const response = await axios.post(url, formData);

      if (response.status === 200) {
        setStatusText("upload success");
      } else {
        setStatusText("error in upload");
      }
    } catch (e) {
      setStatusText("error in upload");
    }
  };

  const handlesearch = async () => {
    try {
      const response = await axios.post("http://localhost:3000/search", {
        query,
      });
      console.log(response.data);
      setSearchResult(response.data.serachResults);
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <>
      <input
        type="file"
        accept="*.pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={uploadResume}>upload</button>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button onClick={handlesearch}>search</button>
      {statusText && <p>{statusText}</p>}
      {searchtresult.length > 0 && (
        <ul>
          {searchtresult.map((x) => (
            <li>{x.fileName}</li>
          ))}
        </ul>
      )}
      {!(searchtresult.length > 0) && <p>no result to display</p>}
    </>
  );
}

export default App;
