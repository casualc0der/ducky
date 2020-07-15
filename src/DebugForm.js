import React from "react";
import { Section, Title, Box } from "reactbulma";
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import SvgRubberDuck from "./Icons/RubberDuck.js";
import axios from "axios";
let listenStatus = false;
const DebugForm = () => {
  const [input, setInput] = useState("");
  const [tag, setTag] = useState(tags[0]);
  const [responses, setResponses] = useState([]);
  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <h1>Not supported</h1>;
  }

  const showForm = async (lis) => {
    const input = document.getElementById("enquiry");
    await SpeechRecognition.startListening().then((listenStatus = true));
    if (lis === false) {
      input.style.visibility = "visible";

      listenStatus = true;
    } else {
      resetTranscript();
      SpeechRecognition.abortListening();
      input.style.visibility = "hidden";
      SpeechRecognition.stopListening();
      listenStatus = false;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const words = transcript;
    console.log(words);
    console.log(`Submitted: ${tag}`);
    const pepe = await axios
      .get(
        `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=${tag}&intitle=${words}&site=stackoverflow`
      )
      .then((res) => {
        console.log(res.data.items);
        setResponses(res.data.items);
      })
      .catch((e) => {});
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Section>
          <Title>Choose a category</Title>
          <div className="select">
            <select value={tag} onChange={(e) => setTag(e.target.value)}>
              {tags.map((x) => (
                <option value={x} onSelect={(x) => setTag(x)} key={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
        </Section>
        <Title>Click on the duck to ask a question</Title>
        <SvgRubberDuck
          style={{ cursor: "pointer" }}
          onClick={() => showForm(listenStatus)}
        />
        <Section id="enquiry" style={{ visibility: "hidden" }}>
          <label>
            Input:
            <input
              style={{ fontSize: "2em", textAlign: "center" }}
              className="textarea"
              type="text"
              id="transcript"
              value={transcript}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </Section>
      </form>
      <Section>
        {responses.map((x) => {
          return (
            <Box key={x.question_id}>
              <h1>
                <a href={x.link}>{x.title}</a>
              </h1>
            </Box>
          );
        })}
      </Section>
    </>
  );
};

const tags = [
  "javascript",
  "java",
  "python",
  "c#",
  "php",
  "android",
  "html",
  "jquery",
  "c++",
  "css",
  "ios",
  "mysql",
  "sql",
  "asp.net",
  "r",
  "node.js",
  "arrays",
  "c",
  "ruby-on-rails",
  ".net",
  "json",
  "objective-c",
  "sql-server",
  "swift",
  "angularjs",
  "python-3.x",
  "django",
  "excel",
  "regex",
  "reactjs",
  "angular",
  "iphone",
  "ruby",
  "ajax",
  "xml",
  "linux",
];

export default DebugForm;
