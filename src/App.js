import React,{useState} from 'react'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import './index.css'


const data = [
  {
    id: "MLA1071",
    level: 0,
    name: "Computación",
    originalName: "Computación",
    
  },
  {
    id: "MLA1072",
    level: 0,
    name: "Laptops y accesorios",
    originalName: "Laptops y accesorios",

    children: [
      {
        id: "MLA1073",
        level: 1,
        name: "Accesorio para laptops",
        originalName: "Accesorio para laptops",
        children: null
      }
    ]
  },
  {
    id: "MLA1074",
    level: 0,
    name: "Electronica, audio y video",
    originalName: "Electronica, audio y video",
    children: [
      {
        id: "MLA1075",
        level: 1,
        name: "Audio",
        originalName: "Audio",
        children: [
          {
            id: "MLA1076",
            level: 2,
            name: "Parlantes",
            originalName: "Parlantes",
            children: [
              {
                id: "MLA1077",
                level: 3,
                name: "Parlantes bluetooth",
                originalName: "Parlantes bluetooth",
                children: null
              },
              {
                id: "MLA1078",
                level: 3,
                name: "Parlantes con LED",
                originalName: "Parlantes con LED",
                children: null
              }
            ]
          }
        ]
      },
      {
        id: "MLA1079",
        level: 1,
        name: "Audio",
        originalName: "Audio",
        children: [
          {
            id: "MLA1080",
            level: 2,
            name: "Parlantes",
            originalName: "Parlantes",
            children: [
              {
                id: "MLA1081",
                level: 3,
                name: "Parlantes bluetooth",
                originalName: "Parlantes bluetooth",
                children: null
              },
              {
                id: "MLA1082",
                level: 3,
                name: "Parlantes con LED",
                originalName: "Parlantes con LED",
                children: null
              }
            ]
          }
        ]
      },
    ]
  }
]
console.log('data',data)

const hasLevel =(data)=>{
  if(data.level === 0){
  return (
    data.className="disabled",
    data.tagClassName="disabled"
  )
}
  else return;
}

const Normalizar = (dataArray) => {
  if(!dataArray) return [];
  
  return dataArray.map((data)=> ({className:`checkbox-item ${hasLevel(data)}`,
  tagClassName:`checkbox-item ${hasLevel(data)}` ,
  label:data.name,
  value:data.id,
  level:data.level,
  originalName:data.originalName,
  children: Normalizar(data.children)})
  
   
    )
}


const categoriasNormalizadas = Normalizar(data)
console.log('normalizadas',categoriasNormalizadas)
    



function App() {

  const [datax,setDatax] = useState(categoriasNormalizadas)
  

  const deseleccionarTodo = () => {
    
    datax[0].checked = false
    setDatax(datax)
    
  }

  const seleccionarTodo = () => {
    
    datax[0].checked = true
    setDatax(datax)
    
  }

 


  return (
    <div >
      <DropdownTreeSelect data={categoriasNormalizadas} texts={{ placeholder: 'Seleccione sus categorias' , inlineSearchPlaceholder:"Busca tu categoria"}} showDropdown="initial"  showPartiallySelected={true} inlineSearchInput={true}   disablePoppingOnBackspace={false} />
      <button onClick={seleccionarTodo}>Seleccionar todo</button>
      <button onClick={deseleccionarTodo}>Vaciar seleccion</button>
       
    </div>
  );
}

export default App;
