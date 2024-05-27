import React, { useState,useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faUndoAlt,
  faItalic,
  faUnderline,
  faStrikethrough,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faFont,
  faPalette,
  faHighlighter,
  faSave,
  faUpload,
  faSpellCheck,
  faExpand,
  faCompress,
  faQuestionCircle,
  faDownload
} from '@fortawesome/free-solid-svg-icons';

import { getDatabase, ref, set, get } from "firebase/database";


function Home(props) {
  const [text, setText] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [commonStyle, setCommonStyle] = useState({ fontSize: 35 });
  const [colors, setColors] = useState(props.colors)


const handlegetData = async (phoneNumber) => {

    const db = getDatabase();
    const userRef = ref(db, "EyesCheckApplication/users/" + phoneNumber);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();
    console.log(userData)

};

  const handlePrint = () => {
    const targetDiv = document.getElementById("contentToPrint");
    const originalContents = document.body.innerHTML;
    const printContents = targetDiv.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };


  const [fileContent, setFileContent] = useState(null);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content);
      setText(content)
    };

    reader.readAsText(file);
  };

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
    setCharCount(inputText.length);
    setWordCount(inputText.trim().split(/\s+/).filter(word => word !== '').length);
  };

  const handleUppercase = () => {
    setText(text.toUpperCase());
  };

  const handleLowercase = () => {
    setText(text.toLowerCase());
  };

  const handleReverse = () => {
    setText(text.split('').reverse().join(''));
  };

  const handleTrim = () => {
    setText(text.trim());
  };

  const handleItalicize = () => {
    setText('<em>' + text + '</em>');
  };

  const handleUnderline = () => {
    setText('<u>' + text + '</u>');
  };

  const handleStrikethrough = () => {
    setText('<del>' + text + '</del>');
  };

  const handleAlign = (alignment) => {
    setText('<div style="text-align:' + alignment + ';">' + text + '</div>');
  };

  const handleFontChange = (font) => {
    setText('<span style="font-family:' + font + ';">' + text + '</span>');
  };

  const handleColorChange = (color) => {
    setText('<span style="color:' + color + ';">' + text + '</span>');
  };

  const handleHighlight = () => {
    setText('<mark>' + text + '</mark>');
  };




  useEffect(() => {
    handlegetData(props.currentAccount)
  }, []);

  return (
    <div className="container mt-5 mt-5 border shadow p-3 mb-5" >
        <div className="form-group" >
            <div className="btn-group container mb-5" role="group">
                <button type="button" className="btn btn-primary" onClick={handleUppercase} style={{commonStyle,backgroundColor : colors[0]}}>
                    <FontAwesomeIcon icon={faArrowAltCircleUp} />
                </button>
                <button type="button" className="btn btn-primary" onClick={handleLowercase} style={{commonStyle,backgroundColor : colors[1]}}>
                    <FontAwesomeIcon icon={faArrowAltCircleDown} />
                </button>
                <button type="button" className="btn btn-primary" onClick={handleReverse} style={{commonStyle,backgroundColor : colors[2]}}>
                    <FontAwesomeIcon icon={faUndoAlt} />
                </button>
                <button type="button" className="btn btn-primary" onClick={handleTrim} style={{commonStyle,backgroundColor : colors[3]}}>
                    <FontAwesomeIcon icon={faItalic} />
                </button>
                <button type="button" className="btn btn-primary" onClick={handleItalicize} style={{commonStyle,backgroundColor : colors[4]}}>
                    <FontAwesomeIcon icon={faItalic} />
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUnderline} style={{commonStyle,backgroundColor : colors[5]}}>
                    <FontAwesomeIcon icon={faUnderline} />
                </button>
                <button type="button" className="btn btn-primary" onClick={handleStrikethrough} style={{commonStyle,backgroundColor : colors[6]}}>
                    <FontAwesomeIcon icon={faStrikethrough} />
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleAlign('left')} style={{commonStyle,backgroundColor : colors[7]}}>
                    <FontAwesomeIcon icon={faAlignLeft} />
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleAlign('center')} style={{commonStyle,backgroundColor : colors[8]}}>
                    <FontAwesomeIcon icon={faAlignCenter} />
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleAlign('right')} style={{commonStyle,backgroundColor : colors[9]}}>
                    <FontAwesomeIcon icon={faAlignRight} />
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleFontChange('Arial')} style={{commonStyle,backgroundColor : colors[10]}}>
                    <FontAwesomeIcon icon={faFont} />
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleColorChange(colors[0])} style={{ ...commonStyle, backgroundColor: colors[11] }}>
                    <FontAwesomeIcon icon={faPalette} />
                </button>
                <button type="button" className="btn btn-primary" onClick={handleHighlight} style={{commonStyle,backgroundColor : colors[12]}}>
                    <FontAwesomeIcon icon={faHighlighter} />
                </button>
               
                <button type="button" className="btn btn-primary" onClick={handlePrint}>
                <FontAwesomeIcon icon={faDownload} /> {/* Assuming you have imported faDownload */}
              </button>

                <button type="button" className="btn btn-primary" style={{commonStyle,backgroundColor : colors[15]}}>
                    Word Count : {wordCount}
                </button>

                <button type="button" className="btn btn-primary" style={{commonStyle,backgroundColor : colors[17]}}>
                    Character Count : {charCount}
                </button>

               
                <div>
               
                </div>
            </div>

          <div id="contentToPrint">
            <p
           
              dangerouslySetInnerHTML={{ __html: text }}
              style={{ ...commonStyle, color: colors[18] }}
            />
            </div>
            <input className='mt-3' accept="text/plain" type="file"  onChange={onFileChange} />
        </div>
      

        <div>
      
      
    </div>
  
    </div>
);

}

export default Home;
