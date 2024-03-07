import React, { useRef } from 'react';
import './App.css';
import { Fields } from './components/fields';

function useResizable() {
  const elementRef = useRef(null);

  const handleMouseDown = (event) => {
    const element = elementRef.current;
    const initialWidth = element.offsetWidth;
    const initialHeight = element.offsetHeight;
    const startX = event.clientX;
    const startY = event.clientY;

    const handleMouseMove = (event) => {
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;

      element.style.width = initialWidth + deltaX + 'px';
      element.style.height = initialHeight + deltaY + 'px';
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return { elementRef, handleMouseDown };
}

function App() {
  const resizable1 = useResizable();
  const resizable2 = useResizable();
  const resizable3 = useResizable();

  return (
    <div className="App">
      <div className='first_div'>
        <div className="resize" ref={resizable1.elementRef} onMouseDown={resizable1.handleMouseDown}>
          <Fields/>
        </div>

        <div className="resize" ref={resizable2.elementRef} onMouseDown={resizable2.handleMouseDown}>
          <Fields/>
        </div>

      </div>
      <div className='bottomdiv resize' ref={resizable3.elementRef} onMouseDown={resizable3.handleMouseDown}>
        <Fields/>
      </div>
    </div>
  );
}

export default App;
