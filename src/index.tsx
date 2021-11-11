import React, { FC, useState, useEffect } from "react";
import Cursor from "./components/Cursor";

interface ICodeProps {
  code: string;
}

interface IToken {
  type: string;
  char?: string;
}

const keywords = ["await", "const", "let", "var"];
const operators = [":", "[", "]", ","];

const Code: FC<ICodeProps> = ({ code, children }) => {
  const [nth, setNth] = useState<number>(0);
  const [tokens, setTokens] = useState<IToken[][]>([]);
  const numLines = code.split(/\r\n|\r|\n/).length;

  const loop = () => {
    const tokenCount = tokens.length;
    const e = nth + 1;
    const i = e >= tokenCount ? 0 : e;

    setTimeout(() => setNth(i), 200);
  };

  const parseCode = () => {
    const words = code.split(/(\.| |\(\{|:|\[|\]|\,|])/);
    const tokenArr: any = [];

    for (let i = 0; i < words.length; i++) {
      let lastPunc: any = [];
      let lastChars = "";
      const word = words[i];
      const lastWord = words[i - 1];
      const chars = word.split("");
      const charSeq: any = [];
      const wordType = () => {
        if (operators.includes(word)) return "operator";
        if (word.includes("'")) return "string";
        if (word === "\n" || word === "({") return "punctuation";
        if (lastWord === ".") return "function";
        if (keywords.includes(word)) return "keyword";
        return "normal";
      };

      for (let j = 0; j < chars.length; j++) {
        const char = chars[j];
        const lastSequence = tokenArr[tokenArr.length - 1];
        const history = lastSequence
          ? lastSequence[lastSequence.length - 1].filter(
              (last: any) => last.type !== "cursor"
            )
          : [];

        lastChars = lastChars + char;

        charSeq.push([
          ...history,
          ...lastPunc,
          {
            type: wordType(),
            char: lastChars ? lastChars : char,
          },
          {
            type: "cursor",
          },
        ]);
      }

      if (charSeq.length) {
        tokenArr.push(charSeq);
      }
    }

    setTokens(tokenArr.flat());
  };

  useEffect(loop, [nth, tokens]);
  useEffect(parseCode, []);

  return (
    <div className="code-editor">
      <pre>
        <div className="line-numbers">
          {Array.from(Array(numLines).keys()).map((_, index: number) => (
            <span key={index}>{index + 1}</span>
          ))}
          <span>~</span>
          <span>~</span>
          <span>~</span>
          <span>~</span>
        </div>
        <div className="typing-area">
          {tokens[nth] &&
            tokens[nth].map((token: any, index: number) => {
              if (token.type === "cursor") {
                return <Cursor key={index} />;
              }

              return (
                <div key={index} className={`token ${token.type}`}>
                  {token.char}
                </div>
              );
            })}
        </div>
      </pre>
      {children}
    </div>
  );
};

export default Code;
