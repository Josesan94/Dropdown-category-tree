import React, {useCallback, useEffect, useRef, useState} from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import './styles/main.css';
import './index.css';
import isEqual from 'lodash/isEqual';
import ArbolCategorias from './components/ArbolCategorias';

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
    const isExpandedNode = data.level !== 0;

    return {
      className: `node-custom-style ${isFirstLevelNode && 'first-level-node'}`,
      tagClassName: 'tag-custom-style',
      label: data.name,
      value: data.id,
      level: data.level,
      expanded: isExpandedNode,
      disabled: isFirstLevelNode,
      originalName: data.originalName,
      children: Normalizar(data.children),
    };
  });
};

const categoriasNormalizadas = Normalizar(arregloCategorias);

function App() {
  const [counter, setCounter] = useState(0);
  const [datax, setDatax] = useState(categoriasNormalizadas);
  const isAllSelected = useRef(false);
  const isAllDeselected = useRef(false);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const deseleccionarTodo = () => {
    if (isAllDeselected.current) return;
    setDatax(deselectAllNodes(datax));
    isAllDeselected.current = true;
    isAllSelected.current = false;
  };

  const recorrerArbol = (arbol, propiedad, valor) => {
    if (!arbol) return;
    arbol.map(nodo => {
      //hago lo que tengo que hacer con los nodos
      return {...nodo, [propiedad]: valor, children: recorrerArbol(nodo.children)};
    });
  };

  const selectAllNodes = arr => {
    if (!arr) return [];
    return arr.map(v => ({...v, children: selectAllNodes(v.children), checked: true}));
  };

  const deselectAllNodes = arr => {
    if (!arr) return [];
    return arr.map(node => ({...node, children: deselectAllNodes(node.children), checked: false}));
  };

  const seleccionarTodo = () => {
    if (isAllSelected.current) return;
    setDatax(selectAllNodes(datax));
    isAllSelected.current = true;
    isAllDeselected.current = false;
  };
  console.log('Render');

  useEffect(() => {
    if (!isEqual(datax, categoriasNormalizadas)) {
      setDatax({categoriasNormalizadas: datax});
    }
    return !isEqual(datax, categoriasNormalizadas);
  }, [datax]);

  const onNodeChange = useCallback((current, selected) => {
    setCounter(prev => prev + 1);
    //  aqui deberia tratar de hacer una funcion que al cambiar el estado del
    // checkbox padre, checkboxes de los hijos se pinten pero en gris.
    // se podria determinar con los aria-level que ya me dan los niveles
  }, []);

  // function assignBreadCrumbs(tree, bread) {
  //   if (Array.isArray(tree)) {
  //     tree.forEach(e => assignBreadCrumbs(e, bread))
  //   } else if (typeof tree === 'object') {
  //     tree.bread = `${bread ? `${bread} > `: ''}${tree.label}`
  //     if (tree.children) assignBreadCrumbs(tree.children, tree.bread)
  //   }
  // }

  return (
    <div>
      <h1>categorias:{counter}</h1>
      <ArbolCategorias data={datax} onNodeChange={onNodeChange} />
      <button onClick={seleccionarTodo}>Seleccionar todo</button>
      <button onClick={deseleccionarTodo}>Vaciar seleccion</button>
      <button onClick={() => console.log(selectedNodes)}>Mostrar nodos</button>
    </div>
  );
}

export default App;
