import React from "react";
import { render } from "react-dom";
import Highlight, { defaultProps } from "prism-react-renderer";
import codeTheme from "prism-react-renderer/themes/duotoneLight";
import { MDXProvider } from "@mdx-js/tag";
import { preToCodeBlock } from "mdx-utils";

const Code = ({ codeString, language = "bash", ...props }) => {
  return (
    <Highlight
      {...defaultProps}
      theme={codeTheme}
      code={codeString}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const components = {
  pre: preProps => {
    console.log("pre", preProps);
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />;
    } else {
      // it's possible to have a pre without a code in it
      return <pre {...preProps} />;
    }
  }
};

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>;
};
