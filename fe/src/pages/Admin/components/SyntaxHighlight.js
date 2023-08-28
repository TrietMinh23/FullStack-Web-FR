import PropTypes from 'prop-types';

// third-party
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// ==============================|| CODE HIGHLIGHTER ||============================== //

export default function SyntaxHighlight({ children, ...others }) {
  return (
    <SyntaxHighlighter language="javacript" showLineNumbers style={a11yDark} {...others}>
      {children}
    </SyntaxHighlighter>
  );
}

SyntaxHighlight.propTypes = {
  children: PropTypes.node
};

// Module not found: Error: Can't resolve 'react-copy-to-clipboard' in 'C:\bt\main\FullStack-Web-FR\fe\src\pages\Admin\components'
// ERROR in ./src/pages/Admin/components/Highlighter.js 13:0-66
// Module not found: Error: Can't resolve 'react-element-to-jsx-string' in 'C:\bt\main\FullStack-Web-FR\fe\src\pages\Admin\components'
// ERROR in ./src/pages/Admin/components/SyntaxHighlight.js 7:0-57
// Module not found: Error: Can't resolve 'react-syntax-highlighter' in 'C:\bt\main\FullStack-Web-FR\fe\src\pages\Admin\components'
// ERROR in ./src/pages/Admin/components/SyntaxHighlight.js 8:0-73
// Module not found: Error: Can't resolve 'react-syntax-highlighter/dist/esm/styles/hljs' in 'C:\bt\main\FullStack-Web-FR\fe\src\pages\Admin\components'