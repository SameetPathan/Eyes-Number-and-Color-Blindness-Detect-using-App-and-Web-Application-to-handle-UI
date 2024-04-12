import React, { useState } from 'react';
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




function Home() {
  const [text, setText] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [commonStyle, setCommonStyle] = useState({ fontSize: '10px' });
  const [colors, setColors] = useState([
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'magenta', 'lime',
    'teal', 'brown', 'navy', 'maroon', 'olive', 'coral', 'lavender', 'turquoise', 'indigo', 'salmon'
  ]);

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
    setProcessedText(text.toUpperCase());
  };

  const handleLowercase = () => {
    setProcessedText(text.toLowerCase());
  };

  const handleReverse = () => {
    setProcessedText(text.split('').reverse().join(''));
  };

  const handleTrim = () => {
    setProcessedText(text.trim());
  };

  // New Features
  const handleItalicize = () => {
    setProcessedText('<em>' + text + '</em>');
  };

  const handleUnderline = () => {
    setProcessedText('<u>' + text + '</u>');
  };

  const handleStrikethrough = () => {
    setProcessedText('<del>' + text + '</del>');
  };

  const handleAlign = (alignment) => {
    setProcessedText('<div style="text-align:' + alignment + ';">' + text + '</div>');
  };

  const handleFontChange = (font) => {
    setProcessedText('<span style="font-family:' + font + ';">' + text + '</span>');
  };

  const handleColorChange = (color) => {
    setProcessedText('<span style="color:' + color + ';">' + text + '</span>');
  };

  const handleHighlight = () => {
    setProcessedText('<mark>' + text + '</mark>');
  };

  const handleSave = () => {
    // Code to save text
    alert('Text saved!');
  };

  const handleUpload = () => {
    // Code to upload text
    alert('Text uploaded!');
  };

  const handleSpellCheck = () => {
    // Code to perform spell check
    alert('Spell check complete!');
  };

  const handleExpand = () => {
    // Expand text area
  };

  const handleCompress = () => {
    // Compress text area
  };

  const handleHelp = () => {
    // Show help modal
  };

  return (
    <div className="container mt-5 mt-5" >
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
                <button type="button" className="btn btn-primary" onClick={handleSpellCheck} style={{commonStyle,backgroundColor : colors[13]}}>
                    <FontAwesomeIcon icon={faSpellCheck} />
                </button>
                <button type="button" className="btn btn-primary" onClick={handleHelp} style={{commonStyle,backgroundColor : colors[14]}}>
                    <FontAwesomeIcon icon={faQuestionCircle} />
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

            <textarea
                className="form-control"
                rows="8"
                value={text}
                onChange={handleTextChange}
                placeholder="Enter your text here..."
                style={{commonStyle,color : colors[18]}}
            ></textarea>
            <input className='mt-3' accept="text/plain" type="file"  onChange={onFileChange} />
        </div>
        <div className="mb-3 mt-5" style={{commonStyle}}>
            <div class="alert" role="alert" style={{backgroundColor : colors[19]}}>
                Processed Text:
            </div>

            <div id="contentToPrint" style={{ border: '1px solid #ccc', padding: '10px',color: colors[20] ,marginBottom:"90px"}}>
                <p dangerouslySetInnerHTML={{ __html: processedText }}></p>
            </div>
        </div>

        <div>
      
      
    </div>
  
    </div>
);

}

export default Home;
