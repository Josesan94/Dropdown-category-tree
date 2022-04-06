import React, {useRef, useState} from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';
import './styles/main.css';
import './index.css';

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
          {
            id: 'MLA1084',
            level: 2,
            name: 'Parlantes 2',
            originalName: 'Parlantes 2',
            children: [
              {
                id: 'MLA1087',
                level: 3,
                name: 'Parlantes bluetooth 2',
                originalName: 'Parlantes bluetooth 2',
                children: null,
              },
              {
                id: 'MLA1086',
                level: 3,
                name: 'Parlantes con LED',
                originalName: 'Parlantes con LED',
                children: null,
              },
            ]
          },
          {
            id: 'MLA1099',
            level: 1,
            name: 'Webcams',
            originalName: 'Webcams',
            children: null
          },
        ],
        
      },
      {
        id: 'MLA1079',
        level: 1,
        name: 'Audio',
        originalName: 'Audio',
        disabled:true,
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

//TraverseTree recibe una funcion que querramos aplicar a todo nodo de un arbol, entonces recorremos el arbol, aplicando dicha funcion a cada nodo. 
//ejecutamos fn con el nodo y despues recorremos los children aplicandole la funcion recursivamente.
const traverseTree = (fn) => (node) => {
  fn(node);
  node.children?.forEach(traverseTree(fn));
};
const traverseTree2 = (fn) => (node) => {
  fn(node);
  node.cildren?.forEach(traverseTree(fn))
}

// const treeFind = (fn) => (node) =>
// fn(node) ? node : node.children?.find(treeFind(fn));

// const selectedCategories = selectedNodes.flatMap((selectedNode) => {
//   if (selectedNode.level !== 0) return [];
//   if (!selectedNode._children) return [];

//   return selectedNode._children.map((childId) => {
//     const findNode = (traversedNode) => traversedNode.id === childId;
//     return datax.find((tree) => treeFind(findNode)(tree));
//   });
// });

const Normalizar = (dataArray) => {
  if (!dataArray) return [];
  return dataArray.map((data) => {
    const isFirstLevelNode = data.level === 0;
    const isExpandedNode = data.level !== 0;
    const isDisabledCategory = data.disabled === true;

    return {
      className: `node-custom-style ${isFirstLevelNode && 'first-level-node'}`,
      tagClassName: 'tag-custom-style',
      label: data.name,
      value: data.id,
      level: data.level,
      expanded: isExpandedNode,
      disabled: isFirstLevelNode || isDisabledCategory,
      originalName: data.originalName,
      children: Normalizar(data.children),
      id: data.id,
    };
  });
};

const categoriasNormalizadas = Normalizar(arregloCategorias);

function App() {
  const [datax, setDatax] = useState(categoriasNormalizadas);
  const isAllSelected = useRef(false);
  const isAllDeselected = useRef(false);
  const [selectedNodes, setSelectedNodes] = useState([]);

  // const deseleccionarTodo = () => {
  //   if (isAllDeselected.current) return;
  //   setDatax(deselectAllNodes(datax));
  //   isAllDeselected.current = true;
  //   isAllSelected.current = false;
  // };

  // const recorrerArbol = (arbol, propiedad, valor) => {
  //   if (!arbol) return;
  //   arbol.map((nodo) => {
  //     //hago lo que tengo que hacer con los nodos
  //     return {
  //       ...nodo,
  //       [propiedad]: valor,
  //       children: recorrerArbol(nodo.children),
  //     };
  //   });
  // };

  // const selectAllNodes = (arr) => {
  //   if (!arr) return [];
  //   return arr.map((v) => ({
  //     ...v,
  //     children: selectAllNodes(v.children),
  //     checked: true,
  //   }));
  // };

  // const deselectAllNodes = (arr) => {
  //   if (!arr) return [];
  //   return arr.map((node) => ({
  //     ...node,
  //     children: deselectAllNodes(node.children),
  //     checked: false,
  //   }));
  // };

  // const seleccionarTodo = () => {
  //   if (isAllSelected.current) return;
  //   setDatax(selectAllNodes(datax));
  //   isAllSelected.current = true;
  //   isAllDeselected.current = false;
  // };

  

  const onNodeChange = React.useCallback((current, selectedNodes) => {
    setSelectedNodes(selectedNodes);
  }, []);



 
  

  const selectedCategories = selectedNodes.flatMap((selectedNode) => {
     if (selectedNode.level !== 0) return selectedNode;
    //if(selectedNode.disabled === true) return selectedNode;
    if(selectedNode.level === 1) return selectedNode;
    if (!selectedNode._children && selectedNode.level === 1  ) return [];
    
    //para todo nodo de nivel 0 que tenga hijos, lo que nos interesa son sus hijos, y no el. Por ello, como tenemos acceso a los hijos, pero que contienen solo el id, por tanto, tenemos que buscar
    // el hijo completo o el hijo real que contiene datax y que esta asociado a estas id.

    //recorremos un arbol de datax buscando un nodo que tenga la id de cada uno de los hijos del nodo de nivel 0 y retornamos dicho nodo en lugar de su id.
    // Ademas, gracias a flatMap, nos queda todo en una lista sin anidarse.

    return selectedNode._children.map((childId) => { 
      let node;
      //lo que hace finNOde es ejecutarse con cada nodo del arbol, y si dicho nodo coincide por ID con el nodo que buscamos almacenamos el nodo en la variable node(en este caso)
      const findNode = (traversedNode) => {
        if (traversedNode.id === childId) node = traversedNode;
      };
      //Lo que hacemos aqui con traversetree, es ejecutar una funcion para cada nodo del arbol, que almacene el nodo que coincida por id en una variable que despues podamos
      //retornar el nodo asociado a esa id.
      datax.forEach((tree) => {
        traverseTree(findNode)(tree);
      });
      return node;
    });
  });

  const UnselectDisabledCats = selectedCategories.flatMap((selectedCat) => {
    
    return selectedCat._children?.map((childs) => {
      let DisabledCat;
      const findDisNode = (traversedNode) => {
        if (traversedNode.disabled === childs.disabled === true) DisabledCat = traversedNode;
      };
      datax.forEach((tree) => {
        traverseTree2(findDisNode)(tree)
      })
      return DisabledCat;
    });
  })



console.log({selectedCategories})
  

  return (
    <div>
      <h1>categorias:{selectedCategories.length}</h1>

      {/* 
      <button onClick={seleccionarTodo}>Seleccionar todo</button>
      <button onClick={deseleccionarTodo}>Vaciar seleccion</button>
      <button onClick={() => console.log(selectedNodes)}>Mostrar nodos</button>
      */}

      <TreeSelect
        data={datax}
        className="mdl-demo" //le coloco este nombre para que me tome todos los cambios que le añado a otros selectores
        onChange={onNodeChange} //cada vez que seleccionamos un nodo, guardamos los nodos que hayan sido seleccionados. Gracias a que TreeSelect esta memorizado, no se perderan los cambios de estado internos del componente cada vez que se hace un re-render de nuestro componente.
        showDropdown="always"
        keepTreeOnSearch
        showPartiallySelected
      />

      <ul>
        {selectedCategories.map((selectedCategory) => (
          <li key={selectedCategory.value}>{selectedCategory.label}</li>
        ))}
      </ul>
    </div>
  );
}

const TreeSelect = React.memo((props) => <DropdownTreeSelect {...props} />); 
// React toma nuestro componente que envolvemos con React.memo, lo renderiza y lo almacena en memoria.
//Ahora, antes del siguiente render de nuestro componente memorizado, React evaluará si las propiedades han cambiado, si existe un cambio, lo volverá a renderizar y grabar en memoria, de lo contrario, utilizará el que esta en la memoria.

export default App;

