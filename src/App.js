import React, {useRef, useState} from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import './styles/main.css';
import './index.css'

const arregloCategorias = [
  {
    id: 'MLA1071',
    level: 0,
    name: 'Computación',
    originalName: 'Computación',
    children: null,
  },
  {
    id: 'MLA1072',
    level: 0,
    name: 'Laptops y accesorios',
    originalName: 'Laptops y accesorios',
    children: [
      {
        id: 'MLA1073',
        level: 1,
        name: 'Accesorio para laptops',
        originalName: 'Accesorio para laptops',
        children: null,
      },
    ],
  },
  {
    id: 'MLA1074',
    level: 0,
    name: 'Electronica, audio y video',
    originalName: 'Electronica, audio y video',
    children: [
      {
        id: 'MLA1075',
        level: 1,
        name: 'Audio',
        originalName: 'Audio',
        children: [
          {
            id: 'MLA1076',
            level: 2,
            name: 'Parlantes',
            originalName: 'Parlantes',
            children: [
              {
                id: 'MLA1077',
                level: 3,
                name: 'Parlantes bluetooth',
                originalName: 'Parlantes bluetooth',
                children: null,
              },
              {
                id: 'MLA1078',
                level: 3,
                name: 'Parlantes con LED',
                originalName: 'Parlantes con LED',
                children: null,
              },
            ],
          },
        ],
      },
      {
        id: 'MLA1079',
        level: 1,
        name: 'Audio',
        originalName: 'Audio',
        children: [
          {
            id: 'MLA1080',
            level: 2,
            name: 'Parlantes',
            originalName: 'Parlantes',
            children: [
              {
                id: 'MLA1081',
                level: 3,
                name: 'Parlantes bluetooth',
                originalName: 'Parlantes bluetooth',
                children: null,
              },
              {
                id: 'MLA1082',
                level: 3,
                name: 'Parlantes con LED',
                originalName: 'Parlantes con LED',
                children: null,
              },
            ],
          },
        ],
      },

    ],
  },
];

const Normalizar = dataArray => {
  if (!dataArray) return [];
  return dataArray.map(data => {
    const isFirstLevelNode = data.level === 0;
    const hasChildren = data.children !== null;

    return {
      className: `node-custom-style ${isFirstLevelNode && 'first-level-node'}`,
      tagClassName: 'tag-custom-style',
      label: data.name,
      value: data.id,
      level: data.level,
      disabled: isFirstLevelNode,
      originalName: data.originalName,
      children: Normalizar(data.children,),
    };
  });
};

const categoriasNormalizadas = Normalizar(arregloCategorias);


function App() {
  const [datax, setDatax] = useState(categoriasNormalizadas);
  const isAllSelected = useRef(false);
  const isAllDeselected = useRef(false);

  const deseleccionarTodo = () => {
    if (isAllDeselected.current) return;
    setDatax(deselectAllNodes(datax));
    isAllDeselected.current = true;
    isAllSelected.current = false;
  };

  const selectAllNodes = arr => {
    if (!arr) return [];
    return arr.map(v => ({...v, children: selectAllNodes(v.children), checked: true}));
  };

  const deselectAllNodes = arr => {
    if(!arr) return [];
    return arr.map(node=> ({...node, children:deselectAllNodes(node.children),checked:false}))
  }

  const seleccionarTodo = () => {
    if (isAllSelected.current) return;
    setDatax(selectAllNodes(datax));
    isAllSelected.current = true;
    isAllDeselected.current = false;
  };


  const onNodeChange = (current, selected,arr) => {
    console.log('current',current)
    console.log('selected',selected)
    if(!arr) return [];
    arr.map((node)=>{
      return ({
        ...node,

      })
    })
    
    
  }

  function onAction(node, action) {
    if(node.checked === true){
      return action ;
    }
  }

  

  
  return (
    <div>
      <DropdownTreeSelect
        data={datax}
        showPartiallySelected={true}
        className="mdl-demo"
        onChange={onNodeChange}
        onAction={onAction}
      />
      <button onClick={seleccionarTodo}>Seleccionar todo</button>
      <button onClick={deseleccionarTodo}>Vaciar seleccion</button>
    </div>
  );
}

export default App;
