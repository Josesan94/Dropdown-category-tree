
//Debo crear algun tipo de funcion que pueda analizar que al seleccionar un padre
// lo cuente en el contador, y ademas me pinte los hijos con checked, pero en color gris
export function adaptData(data, selectedValues) {
  return data.map(node => {
    if (selectedValues.includes(node.label)) {
      return {
        ...node,
        children: node.children ? adaptData(node.children, selectedValues) : [],
        checked: true
      };
    }
    return {
      ...node,
      checked: false,
      children: node.children ? adaptData(node.children, selectedValues) : []
    };
  });
}