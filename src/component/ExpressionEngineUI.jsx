import { useState } from "react";

const ExpressionEngineUI = () => {
  const [expressions, setExpressions] = useState([
    {
      key: "age",
      output: {
        value: "",
        operator: ">=",
        score: "",
      },
    },
  ]);

  const [combinator, setCombinator] = useState("and");
  const [heading, setHeading] = useState("");
  const [jsonResult, setJsonResult] = useState(null);

  const addExpression = () => {
    setExpressions((prevExpressions) => [
      ...prevExpressions,
      {
        key: "age",
        output: {
          value: "",
          operator: ">=",
          score: "",
        },
      },
    ]);
  };

  const deleteExpression = (index) => {
    if (expressions.length > 1) {
      const newExpressions = [...expressions];
      newExpressions.splice(index, 1);
      setExpressions(newExpressions);
    }
  };

  const generateJsonData = () => {
    const jsonData = {
      rules: expressions
        .filter(
          (expression) =>
            expression.output.value.trim() !== "" &&
            expression.output.score.trim() !== ""
        )
        .map((expression) => ({
          key: expression.key,
          output: {
            value: expression.output.value,
            operator: expression.output.operator,
            score: expression.output.score,
          },
        })),
      combinator: combinator,
    };

    // Set the JSON data in the state
    setJsonResult(JSON.stringify(jsonData, null, 2));
  };

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <label htmlFor="combinator" className="mr-2">
          Combinator
        </label>
        <select
          className="form-control mr-2"
          id="combinator"
          value={combinator}
          onChange={(e) => setCombinator(e.target.value)}
        >
          <option value="and">AND</option>
          <option value="or">OR</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="heading">Heading</label>
        <input
          type="text"
          className="form-control"
          id="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
      </div>

      {expressions.map((expression, index) => (
        <div key={index} className="mb-3 d-flex align-items-center">
          <select
            className="form-control mr-2"
            id={`ruleType_${index}`}
            onChange={(e) => {
              const newExpressions = [...expressions];
              newExpressions[index].key = e.target.value;
              setExpressions(newExpressions);
            }}
          >
            <option value="age">Age</option>
            <option value="creditScore">Credit Score</option>
            <option value="accountBalance">Account Balance</option>
          </select>

          <select
            className="form-control mr-2"
            id={`operator_${index}`}
            onChange={(e) => {
              const newExpressions = [...expressions];
              newExpressions[index].output.operator = e.target.value;
              setExpressions(newExpressions);
            }}
          >
            <option value=">">{">"}</option>
            <option value="<">{"<"}</option>
            <option value=">=">{">="}</option>
            <option value="<=">{"<="}</option>
            <option value="=">=</option>
          </select>

          <input
            type="text"
            className="form-control mr-2"
            placeholder="Enter Value"
            value={expression.output.value}
            onChange={(e) => {
              const newExpressions = [...expressions];
              newExpressions[index].output.value = e.target.value;
              setExpressions(newExpressions);
            }}
          />

          <input
            type="text"
            className="form-control mr-2"
            placeholder="Enter Score"
            value={expression.output.score}
            onChange={(e) => {
              const newExpressions = [...expressions];
              newExpressions[index].output.score = e.target.value;
              setExpressions(newExpressions);
            }}
          />

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteExpression(index)}
          >
            Delete
          </button>
        </div>
      ))}

      <div className="mb-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={addExpression}
        >
          Add Expression
        </button>
      </div>

      <div className="mb-3">
        <button
          type="button"
          className="btn btn-success"
          onClick={generateJsonData}
        >
          Generate JSON Data
        </button>
      </div>

      {/* Display JSON result on the screen */}
      {jsonResult && (
        <div className="mb-3">
          <h2>Generated JSON Data:</h2>
          <pre>{jsonResult}</pre>
        </div>
      )}
    </div>
  );
};

export default ExpressionEngineUI;
