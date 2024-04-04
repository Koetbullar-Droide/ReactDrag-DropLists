import { useState } from 'react';
import './App.css';

function App() {
  const data1 = [
    { title: 'red', red: 255, green: 0, blue: 0, hex: '#FF0000' },
    { title: 'green', red: 0, green: 255, blue: 0, hex: '#00FF00' },
    { title: 'blue', red: 0, green: 0, blue: 255, hex: '#0000FF' }
  ];
  const data2 = [
    { title: 'purple', red: 128, green: 0, blue: 128, hex: '#800080' },
    { title: 'teal', red: 0, green: 128, blue: 128, hex: '#008080' },
    { title: 'maroon', red: 128, green: 0, blue: 0, hex: '#800000' },
    { title: 'olive', red: 128, green: 128, blue: 0, hex: '#808000' },
    { title: 'navy', red: 0, green: 0, blue: 128, hex: '#000080' }
  ];

  const [list1, setList1] = useState(data1);
  const [list2, setList2] = useState(data2);

  const handleDragStart = (e, item, list) => {
    e.dataTransfer.setData('item', JSON.stringify(item));
    e.dataTransfer.setData('list', list);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, list) => {
    const item = JSON.parse(e.dataTransfer.getData('item'));
    const sourceList = e.dataTransfer.getData('list');

    if (sourceList === 'list1') {
      const updatedList1 = list1.filter((color) => color.title !== item.title);
      setList1(updatedList1);
    } else if (sourceList === 'list2') {
      const updatedList2 = list2.filter((color) => color.title !== item.title);
      setList2(updatedList2);
    }

    list.push(item);
    if (list === list1) {
      setList1([...list]);
    } else if (list === list2) {
      setList2([...list]);
    }
  };

  return (
    <div className="container">
      <h3>Drag and Drop Elements from one List to the othe</h3>
      <div className="row">
        <div className="col">
          <ul
            className="list-group"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, list1)}
          >
            <li className='list-group-item'>List 1</li>
            {list1.map((color, idx) => (
              <li
                key={idx}
                className="list-group-item"
                draggable
                onDragStart={(e) => handleDragStart(e, color, 'list1')}
                style={{ color: color.hex} }
              >
                {color.title + ' (' + color.red + ',' + color.green + ',' + color.blue + ')' + color.hex}
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <ul
            className="list-group"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, list2)}
          >
            <li className='list-group-item'>List 2</li>
            {list2.map((color, idx) => (
              <li
                key={idx}
                className="list-group-item"
                draggable
                onDragStart={(e) => handleDragStart(e, color, 'list2')}
                style={{ color: color.hex} }
              >
                {color.title + ' (' + color.red + ',' + color.green + ',' + color.blue + ')' + color.hex}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
