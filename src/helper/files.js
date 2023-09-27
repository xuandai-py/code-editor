const someJSCodeExample = `
  // The source (has been changed) is https://github.com/facebook/react/issues/5465#issuecomment-157888325

  const CANCELATION_MESSAGE = {
    type: 'cancelation',
    msg: 'operation is manually canceled',
  };

  function makeCancelable(promise) {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(val => hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val));
      promise.catch(reject);
    });

    return (wrappedPromise.cancel = () => (hasCanceled_ = true), wrappedPromise);
  }

  export default makeCancelable;
`;

const someCSSCodeExample = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  *::-webkit-scrollbar {
    display: none;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  [type=reset], [type=submit], button, html [type=button] {
      -webkit-appearance: button;
  }

  [type=button]{
    -webkit-appearance: none;
  }

  .full-width {
    width: 100%;
  }
  .full-height {
    height: 100%;
  }
  .full-size {
    width: 100%;
    height: 100%;
  }

  .ql-editor a {
    color: rgba(255, 255, 255, 0.20);
    cursor: pointer;
    padding-left: 8px;
    padding-right: 8px;
    text-decoration: none;
  }
  .ql-editor ul, .ql-editor li, .ql-editor ol {
    margin-left: 16px;
  }
  .ql-editor object {
    color: #d32f2f;
  }
  .ql-editor blockquote {
    border-left: 3px solid rgba(255, 255, 255, 0.12);
    padding-top: 8px;
    padding-left: 24px;
    padding-right: 16px;
    padding-bottom: 8px;
  }
  .ql-editor .ql-align-center {
    text-align: center;
  }
  .ql-editor .ql-align-justify {
    text-align: justify;
  }
  .ql-editor .ql-align-right {
    text-align: right;
  }
  .ql-editor a:hover {
    text-decoration: underline;
  }
`;

const someHTMLCodeExample = `
<div id="content">something here</div>
`;

// const files1 = {
//   "script.js": {
//     name: "script.js",
//     language: "javascript",
//     value: jsbase
//   },
//   "style.css": {
//     name: "style.css",
//     language: "css",
//     value: cssbase
//   },
//   "index.html": {
//     name: "index.html",
//     language: "html",
//     value: htmlbase
//   }
// };


export const jsbase = `
// some text or
const a =1;
// or
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>Hello World</div>
ReactDOM.render(<App />, document.getElementById('root'));
`
export const htmlbase = `
<div class="content">
      <h1>Some Title Heresss</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in nisi nec mi dignissim accumsan eu tempor odio. Fusce malesuada volutpat metus quis sagittis.</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>      
      </ul>
      
    </div>
    `

export const cssbase = `
  * {
    hegiht: 100%;

  }
    /* Apply styles to the body */
    body {
    background-color: #f1f1f1;
    font-family: Arial, sans-serif;
    font-size: 16px;
    margin: 0;
  }

    /* Apply styles to the div */
    .content {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 25px;
    padding: 20px;
    margin: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`

export const rustbase = `
fn main() {
  println!("{}", hello_wor);
  
  }
`


export const files = [
  {
    name: "script.js",
    language: "javascript",
    value: jsbase
  },
  {
    name: "style.css",
    language: "css",
    value: cssbase
  },
  {
    name: "index.html",
    language: "html",
    value: htmlbase
  },
  {
    name: "",
    language: "rust",
    value: rustbase
  }
];



export const langs = [
  {
      'key': 'Javascript',
      'path': '/js_re',
      'status': true
  },

  {
      'key': 'Rust',
      'path': '/rust_re',
      'status': false
  },
  {
      'key': 'Diff-Editor',
      'path': '/compare_re',
      'status': true
  }
];
// export  { files, rustbase, jsbase, htmlbase, cssbase }

